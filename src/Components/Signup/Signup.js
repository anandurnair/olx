import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { auth, db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export default function Signup() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setpassword] = useState(null);
  const firebase = useContext(FirebaseContext);
  const navigate =  useNavigate()
  const userRef =collection(db,"users")

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => updateProfile(res.user,{ displayName: username }))
      .then(() => {
        const user = auth.currentUser;
        if (user) {
          return addDoc(userRef,{
            id: user.uid,
            userName: username,
            phone: phone,
          });
        } else {
          alert("User is not logged In");
        }
      })
      .then(() => alert("User added Successfully  "))
        .then(()=>navigate('/login') )
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            q
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <br />
     {(username && email && phone && password)?  <button onClick={handleSignUp}>Signup</button> :  <button onClick={(e)=>{
      e.preventDefault()
      alert('All fields are required')
     }}>Signup</button>  }    
        </form>
        <p className="loginBtn" onClick={()=>navigate('/login')}>Login</p>
      </div>
    </div>
  );
}
