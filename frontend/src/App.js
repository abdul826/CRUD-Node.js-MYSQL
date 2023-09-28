import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/Navbar';
import Home from './component/Home';
import Add from './component/Add';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Update from './component/Update';

// css
import './style/home.css';

const App = () => {
  return (
    <>
      <Header />
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App