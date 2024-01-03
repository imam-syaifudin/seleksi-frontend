import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Table } from "react-bootstrap";
import Loading from "../components/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AllPlayer() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getPlayers = async () => {
    setLoading(true);
    await axios
      .get("http://127.0.0.1:9001/api/players", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlayers(response.data.data);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(true);
        console.log(response);
      });
  };

  const fetchData = async () => {
      setLoading(true);
      await axios
        .get("http://127.0.0.1:9001/api/players", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPlayers(response.data.data);
          setLoading(false);
        })
        .catch((response) => {
          setLoading(true);
          console.log(response);
        });

  }

  const handleSort = async (id) => {

    setLoading(true);
    await axios
      .delete(`http://127.0.0.1:9001/api/players/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getPlayers()
        // navigate('/player')
        setLoading(false);
        Swal.fire({
          title: "Success",
          text: "Berhasil Menghapus players",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((response) => {
        setLoading(true);
        console.log(response);
      });

  }

  useEffect(() => {
    if ( !token ){
      navigate('/login');
    }
    getPlayers();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Players</title>
      </Helmet>
              {loading ? (
                <Loading/>
              ) : (
      <div className="container mt-5">
        <div className="row text-center">
          <NavLink  to="/player/add" className="btn btn-success">Add Players</NavLink>
          <div className="col-md-12 mt-5">
            <div className="table-responsive">
                <Table variant="dark" bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Posisi</th>
                      <th>Nama</th>
                      <th>Nomor Punggung</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => {
                      return (
                        <tr key={index} className="table-secondary">
                          <td style={{ verticalAlign: "middle" }}>
                            {index + 1}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {player.posisi}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {player.nama}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {player.nomor_punggung}
                          </td>
                          <td>
                            <NavLink to={`/player/view/${player.id}`} className="btn btn-primary m-1">
                              View
                            </NavLink >
                            <NavLink to={`/player/edit/${player.id}`} className="btn btn-warning m-1">
                              Edit
                            </NavLink>
                            <button onClick={() => handleSort(player.id)} className="btn btn-danger m-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
            </div>
          </div>
        </div>
      </div>
              )}
    </div>
  );
}

export default AllPlayer;
