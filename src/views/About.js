import React from 'react';
import { Helmet } from 'react-helmet';

function About(props) {
    return (
      <div>
        <Helmet>
          <title>Halaman About</title>
        </Helmet>

        <section className="main" style={{ marginTop: '120px'}} id="main">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <img
                  src="https://imam-syaifudin.github.io/udinhero.jpg"
                  className="rounded-circle hero text-center wow fadeInLeft"
                  alt="Main Hero"
                  width={300}
                  height={300}
                />
              </div>
              <div className="col-lg-6 d-flex align-items-center mt-3">
                <p className="text-dark fst-italic heroCaption fs-1 wow fadeInRight">
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