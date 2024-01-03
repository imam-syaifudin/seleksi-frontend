import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    
    let bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);

    try {
      let loginResponse = await axios({
        method: "post",
        url: "http://127.0.0.1:9001/api/users/auth",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      let token = await loginResponse.data.token;
      localStorage.setItem('token',token);

      navigate('/home');

    } catch (error) {
      //   console.log(error.response.data);
      setValidation(error.response.data);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/home');
    }
  },[])

  return (
    <div>
      <Helmet>
        <title>Halaman Login</title>
      </Helmet>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1 className="display-5 text-warning">Welcome To Login Page</h1>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {validation.error ? (
              <div className="alert alert-danger" role="alert">
                {validation.error}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={loginHandler}>
              <div>
                <div className="mb-3">
                  <label className="form-label text-light">Username</label>
                  <input
                    type="text"
                    pattern="([A-z0-9À-ž\s]){4,}"
                    className="form-control"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light">Password</label>
                  <input
                    pattern="([A-z0-9À-ž\s]){6,}"
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-warning" type="submit">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
