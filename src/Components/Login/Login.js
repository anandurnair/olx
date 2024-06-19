import React, { useState } from 'react';
import { signInWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import { auth,googleProvider } from '../../firebase/config';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] =useState('')
  const [password,setpassword] = useState('')
  const handleLogin =(e)=>{
    e.preventDefault();
    console.log('working')
    console.log(auth.currentUser?.displayName)
      
      signInWithEmailAndPassword(auth,email,password)
      .then(()=>navigate('/'))
      .catch(err => alert(err))
  }
  const signInWithGoogle = async()=>{
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setpassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleLogin}>LogIn</button>
        </form>
        <button onClick={signInWithGoogle}>SignIn Using Google</button>
        <p className='signupBtn' onClick={()=>{
          navigate('/signup')
        }}>Signup</p>
      </div>
    </div>
  );
}

export default Login;
