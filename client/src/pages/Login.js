import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {

  const[input, setInput] = useState({
    username:"",
    password:""
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);
   
  const handleChange = (e) => {
      setInput(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await login(input);
        navigate("/");
      } catch(err) {
        // console.log(err);
        setErr(err.response.data);
      }
  }

  return (
    <div className='auth'>
        
        <form>
            <h1>Login</h1>
            <input type='text' placeholder='username' name='username' onChange={handleChange}></input>
            <input type='password' placeholder='password' name='password' onChange={handleChange}></input>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login;
