import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

function Profile(props) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserIdent = async () => {
    setLoading(true);
    await axios
      .get("http://127.0.0.1:9001/api/users/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(true);
        console.log(e);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    getUserIdent();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      {loading ? (
        <Loading/>
      ) : (

        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-12 mt-5">
                <img src="https://findicons.com/files/icons/2711/free_icons_for_windows8_metro/512/guest.png" width="200" alt="" />
            </div>
          </div>
          <div className="col-lg-12 text-center">
            <h1 className="text-warning display-1">
              {user.username}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
