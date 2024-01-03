import React, {  useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Add(props) {
  const [posisi, setPosisi] = useState("");
  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("posisi", posisi);
    bodyFormData.append("nama", nama);
    bodyFormData.append("nomor_punggung", nomor);

    await axios({
      method: "post",
      url: "http://127.0.0.1:9001/api/players",
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        Swal.fire({
            title: "Success",
            text: "Berhasil menambahkan players",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate('/player')
        setLoading(false);
      })
      .catch((response) => {
        setLoading(true);
        setValidation(response.response.data.errors);
      });
  };

  useEffect(() => {
    if (!token) {
        navigate("/login");
      }
  
  });

  return (
    <div>
      <div className="container mt-3">
        <div className="col-lg-4">
          <h1 className="text-warning">Add Player</h1>
          <Form className="mt-3" onSubmit={addUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light">Posisi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Posisi"
                value={posisi}
                onChange={(e) => {
                  setPosisi(e.target.value);
                }}
              />
              {validation.posisi == undefined ? (
                <div role="alert"></div>
            ) : (
                <div className="alert alert-danger mt-3" >{validation.posisi}</div>
            )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
              {validation.nama == undefined ? (
                <div role="alert"></div>
            ) : (
                <div className="alert alert-danger mt-3" >{validation.nama}</div>
            )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Nomor Punggung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nomor Punggung"
                value={nomor}
                onChange={(e) => {
                  setNomor(e.target.value);
                }}
              />
              {validation.nomor_punggung == undefined ? (
                <div role="alert"></div>
            ) : (
                <div className="alert alert-danger mt-3" >{validation.nomor_punggung}</div>
            )}
            </Form.Group>
            <Button variant="warning" type="submit" className="mx-1">
              Submit
            </Button>
            <NavLink to="/player" className="btn btn-danger">
              Back to Players
            </NavLink>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Add;
