import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import UserImg from '../img/user-icon.png';
import { AuthContext } from '../context/authContext';

const Single = () => {

  const [post, setPost] = useState([]);

  const location = useLocation();

  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2];

  const {currentUser} = useContext(AuthContext);
 
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch(err) {
        console.log(err)
      }
    };

    fetchData();
  }, [postId])

  const handleDelete = async() => {
    try{
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch(err) {
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`}></img>
        <div className='user'>
          <img src={UserImg} style={{width: '25px', height: '25px'}}></img>
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && <div className='edit'>
            <Link to={`/write?edit=1`} state={post}>
              <img src={Edit}></img>
            </Link>
            <img onClick={handleDelete} src={Delete}></img>
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat}/>
      <button className='addBtn'>Add Solution</button>
    </div>
  )
}

export default Single;
