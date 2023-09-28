import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/home.css";

const Home = () => {
  const [stuInfo, setStuInfo] = useState("");
 const navigate =  useNavigate();
  const getData = async () => {
    const res = await axios.get("http://localhost:8000/info");
    setStuInfo(res.data);
  };

  // Delete Record
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/info/${id}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  var i = 1;

  return (
    <div className="main">
      <div className="container">
        <Link to="/add">
          <button className="btn btn-primary my-5">Add</button>
        </Link>
        <div className="row">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stuInfo &&
                  stuInfo.map((info,ind) => {
                    return (
                      <>
                        <tr key={ind}>
                          <td>{i++}</td>
                          <td>{info.Name}</td>
                          <td >{info.email}</td>
                          <td>{info.phone}</td>
                          <td>
                            <button
                              className="btn btn-danger delete"
                              onClick={() => handleDelete(info.id)}
                            >
                              Delete
                            </button>
                            {" "}
                            <button className="btn btn-primary">
                              <Link
                                to={`/update/${info.id}`}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                Update
                              </Link>
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
