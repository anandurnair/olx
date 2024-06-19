import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import DropDown from "../../assets/dropdown";
import { AuthContext } from "../../store/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate('/login')
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        {/* <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div> */}
        <div className="placeSearch">
          {/* <Search></Search> */}
          <input type="text" value={'Kerala'} disabled/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? ` Welcome ${user?.displayName}` : <span onClick={()=>navigate('/login')}> LogIn</span>}</span>
          <hr />
        </div>
        {user && <span className="logoutBtn" onClick={signOutUser}>Logout</span>}
        <div className="sellMenu" onClick={()=>user ? navigate('/create') : navigate('/login')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
