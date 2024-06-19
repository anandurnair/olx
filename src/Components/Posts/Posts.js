import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PostContext } from "../../store/PostContext";

function Posts() {
  const navigate = useNavigate()
  const {setPostDetails}=  useContext(PostContext)
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, "products");
        const querySnapshot = await getDocs(productRef);

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        setProducts(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="postParentDiv">
      {/* <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         
        </div>
      </div> */}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {
            products.map((product)=>{
             return(
              <div className="card" onClick={()=>{
                setPostDetails(product);
                navigate('/view')
              }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}.00</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
             ) 
            })
          }
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
