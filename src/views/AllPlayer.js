import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Table } from "react-bootstrap";
const url = "https://jsonplaceholder.typicode.com/users";

function AllPlayer() {
    const [user, setUser] = useState([]);


    const getUser = async () => {
        try {
            let response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
            );
        
            setUser(response.data);

        } catch(e){
            console.log(e.message);
        }
    };

    // const getUser = async () => {
    //     const response = await fetch(url);
    //     const newUser = await response.json();
    //     setUser(newUser)
    // }

    useEffect(() => {
        getUser();
    },[]);

    return (
        <div>
        <Helmet>
            <title>All Players</title>
        </Helmet>
        <div className="container mt-3">
            <div className="row">
            <div className="col-md-12">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            user.map((u,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
                </Table>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AllPlayer;
