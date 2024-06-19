import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route,Routes } from " ";
import Home from "./Pages/Home";
import Signup  from  './Pages/Signup'
import Login from "./Components/Login/Login";
import { AuthContext } from "./store/Context";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "./firebase/config";
import Create from "./Components/Create/Create";
import Post from "./store/PostContext";
import ViewPost  from './Pages/ViewPost'
function App() {
  const {user,setuser} = useContext(AuthContext)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>setuser(user))
     console.log( user?.displayName)
  })
  return (
    <div className="app">
      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route  path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
      </Post>
      
    </div>
  );
}

export default App;
