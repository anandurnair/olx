import React, { useEffect } from 'react';
import { useState,useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
function View() {
  const [userDetails,setUserdetails] = useState('')
  const {postDetails} = useContext(PostContext)
  useEffect(()=>{
    const fetchData = async()=>{
      const {userId} = postDetails
      const usersRef = collection(db,"users")
      const q = query(usersRef,where('id','==',userId))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUserdetails(doc.data())
      });
    }
   
    fetchData()
  },[])
  console.log(userDetails)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>Product name : {postDetails.name}</span>
          <p>Category : {postDetails.category}</p>
          <span>Posted at {postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Seller name : {userDetails.userName}</p>
          <p>Phone no : {userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
