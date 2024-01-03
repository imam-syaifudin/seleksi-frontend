import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

function Edit() {
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

  const onTodoChange = (e) => {
    setPosisi(e);
  }

  const updateUser = async (e) => {
    e.preventDefault();

    const getPosisi = e.target[0].value;
    const getNama = e.target[1].value;
    const getNomor = e.target[2].value;

    let data = {
        posisi: player.posisi,
        nama: player.nama,
        nomor_punggung: player.nomor_punggung
    };

    if (getPosisi !== player.posisi) {
      data["posisi"] = getPosisi;
    } else if (getNama !== player.nama) {
      data["nama"] = getNama;
    } else if (getNomor !== player.nomor_punggung) {
      data["nomor_punggung"] = getNomor;
    } 

    await axios({
      method: "PUT",
      url: `http://127.0.0.1:9001/api/players/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Berhasil update players",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/player");
      })
      .catch((response) => {
        // console.log(response.response.data);
        setValidation(response.response.data.errors);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="container mt-3">
        <div className="col-lg-4">
          <h1 className="text-warning">Edit Player</h1>
          {loading ? (
            <Loading />
          ) : (
            <Form className="mt-3" onSubmit={updateUser} key={player.id}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-light">Posisi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Posisi"
                  defaultValue={player.posisi}
                  //   ={(e) => { onTodoChange(e.target.value) }  }
                  // onChange={(e) => {
                  //   setPosisi(e.target.value);
                  //   console.log(posisi);
                  // }}
                />
                {validation.posisi == undefined ? (
                  <div role="alert"></div>
                ) : (
                  <div className="alert alert-danger mt-3">
                    {validation.posisi}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-light">Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  defaultValue={player.nama}
                  // onChange={(e) => {
                  //   setNama(e.target.value);
                  // }}
                />
                {validation.nama == undefined ? (
                  <div role="alert"></div>
                ) : (
                  <div className="alert alert-danger mt-3">
                    {validation.nama}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-light">Nomor Punggung</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor Punggung"
                  defaultValue={player.nomor_punggung}
                  // onChange={(e) => {
                  //   setNomor(e.target.value);
                  // }}
                />
                {validation.nomor_punggung == undefined ? (
                  <div role="alert"></div>
                ) : (
                  <div className="alert alert-danger mt-3">
                    {validation.nomor_punggung}
                  </div>
                )}
              </Form.Group>
              <Button variant="warning" type="submit" className="mx-1">
                Submit
              </Button>
              <NavLink to="/player" className="btn btn-danger">
                Back to Players
              </NavLink>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Edit;
