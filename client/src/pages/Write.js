import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || '');
  const [title, setTitle] = useState(state?.desc || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title, desc: value, cat, img: file ? imgUrl : ""
      }) : await axios.post(`/posts/`, {
        title, desc: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYY-MM-DD HH:mm:ss")
      })
      navigate("/");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='add'>
      <div className='content'>
        <input placeholder='Ask Doubt' value={title} onChange={e => setTitle(e.target.value)} />
        <h3>Doubt Description</h3>
        <div className='editorContainer'>
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input style={{ display: 'none' }} type='file' name='file' id='file' onChange={e => setFile(e.target.files[0])}></input>
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type='radio' checked={cat === "art"} name='cat' value="art" id='art' onChange={e => setCat(e.target.value)} />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "science"} name='cat' value="science" id='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "technology"} name='cat' value="technology" id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "commerce"} name='cat' value="commerce" id='commerce' onChange={e => setCat(e.target.value)} />
            <label htmlFor='commerce'>Commerce</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "design"} name='cat' value="design" id='design' onChange={e => setCat(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;
