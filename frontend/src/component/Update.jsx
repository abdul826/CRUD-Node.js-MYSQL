import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();

  const [info, setInfo] = useState({
    Name:'',
    email:'',
    phone:''
  });

  const [error,setError] = useState(false)
 

  const handleChange = ((e)=>{
    setInfo((prev)=>({
      ...prev,
      [e.target.name]:[e.target.value]
    }))
  });

  const navigate = useNavigate();

//   get Single record
    const getSingleRecord = async()=>{
    try {
        const res = await axios.get(`http://localhost:8000/info/${id}`);
        //console.log(res.data[0]);
        setInfo(res.data[0])
      } catch (error) {
        console.log(error);
        setError(true);
      }
}

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/info/${id}`, info);
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  useEffect(()=>{
    getSingleRecord();
},[id])

  return (
    <div className="main">
        <div className='container update'>
      <div className="row my-5 ">
        <div className="col-md-6 formdata">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="Name" value={info.Name}   onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={info.email}  onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Enter Mobile No." name="phone"  value={info.phone}  onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    {error && "Something went wrong!"}
      <Link to="/">Go Home</Link>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Update