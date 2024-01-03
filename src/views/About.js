import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

function About(props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>

      <section className="main" id="main">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-5 d-flex justify-content-center align-items-center vh-100  text-center">
              <LazyLoadImage
                src={'udin.jpg'}
                className="rounded-circle hero text-center wow fadeInLeft img-thumbnail shadow-lg"
                alt="Main Hero"
                placeholdersrc={'udin.jpg'}
                effect="blur"
                width={400}
                height={400}
              />
            </div>
            <div className="col-lg-6 d-flex align-items-center mt-3">
              <p className="text-light fst-italic heroCaption fs-1 wow fadeInRight">
                "Welcome to my page, Im{" "}
                <span className="text-warning wow fadeInLeft">
                  Backend Developer"
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
