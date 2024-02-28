import React, { useContext } from 'react';
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import UserImg from '../img/user-icon.png';

const Navbar = () => {


  const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to="/">
            <img src={Logo}></img>
          </Link>
        </div>
        <div className='links'>
        <Link className='link' to="/?cat=commerce">
            <h6>COMMERCE</h6>
          </Link>
          <Link className='link' to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login">Login</Link>}
          <span className='write'>
            <Link className='link' to="/write">Ask?</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
