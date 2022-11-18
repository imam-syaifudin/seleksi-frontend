import React from 'react';
import { Helmet } from 'react-helmet'

function Home(props) {
    return (
        <div>
        <Helmet>
            <title>Halaman Home</title>
        </Helmet>
        <div className="container">

                <div className="col-lg-12 d-flex justify-content-center align-items-center vh-100  text-center">
                    <h1 className='text-warning display-1 shadow-sm'>Welcome To My Page</h1>
                </div>
            
        </div>
        </div>
    );
}

export default Home;