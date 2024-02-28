import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const[input, setInput] = useState({
        username:"",
        email:"",
        password:""
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/auth/register", input);
            console.log(res);
            navigate("/login");
        } catch(err) {
            // console.log(err);
            setErr(err.response.data);
        }
    }

    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input required type='text' onChange={handleChange} name='username' placeholder='username'></input>
                <input required type='email' onChange={handleChange} name='email' placeholder='email'></input>
                <input required type='password' onChange={handleChange} name='password' placeholder='password'></input>
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register
