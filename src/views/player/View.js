import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

function View() {
  const { id } = useParams();
  const [player, setPlayer] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [posisi, setPosisi] = useState("");
  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");

  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `http://127.0.0.1:9001/api/players/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setPlayer(response.data);

        setPosisi(player.posisi);
        setNama(player.nama);
        setNomor(player.nomor_punggung);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(true);
        // setValidation(response.response.data.errors);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row text-center justify-content-center">
          <div className="col-lg-4">
            {loading ? (
              <Loading />
            ) : (
              <Card className="shadow-sm">
                <Card.Header as="h5" className="bg-secondary">
                  Data Pemain
                </Card.Header>
                <Card.Body>
                  <Card.Title>Player Name : {player.nama}</Card.Title>
                  <Card.Text>Nomor Punggung : {player.nomor_punggung}</Card.Text>
                  <Card.Text>Posisi : {player.posisi}</Card.Text>
                  <NavLink
                    to="/player"
                    className="btn btn-warning"
                    variant="warning"
                  >
                    Back
                  </NavLink>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
