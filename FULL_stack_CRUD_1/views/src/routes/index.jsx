import React from 'react'
import {Routes,Route} from "react-router-dom"
import Register from "../page/register"
import Login from "../page/login"
import Home from '../page/home'
import Notes from '../page/notes/notes'

const Routing = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/notes" element={<Notes />}></Route>


        </Routes>
    </div>
  )
}

export default Routing