import axios from 'axios';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
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

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/info',info);
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  return (
   <div className="main">
     <div className='container add'>
      <div className="row my-5 ">
        <div className="col-md-6 my-5 formdata">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="Name"  onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Enter Mobile No." name="phone"  onChange={handleChange} />
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

export default Add