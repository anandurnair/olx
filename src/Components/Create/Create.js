import React, { Fragment, useContext, useRef, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { auth ,storage,db} from '../../firebase/config';
import { AuthContext } from '../../store/Context';
import { ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const productRef = collection(db,"products")
  const navigate = useNavigate()
  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log('Working 2');
    const date = new Date()
    const storageRef = ref(storage, `/image/${image.name}`);
    uploadBytes(storageRef,image).then((snap)=>{
      getDownloadURL(snap.ref).then((url)=>{
        console.log(url);
        addDoc(productRef,{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        navigate('/')
      })
    })
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <h2 style={{marginBottom:'20px'}}>Enter Product Details</h2>
            <label htmlFor="fname">Product Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  onChange={(e)=>setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="300px" height="200px" src={image? URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input type="file" onChange={(e)=>{
              setImage(e.target.files[0])
            }} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
