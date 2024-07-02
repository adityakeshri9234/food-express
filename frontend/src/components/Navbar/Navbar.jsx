import React, { useContext, useState } from 'react'
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link ,useNavigate} from 'react-router-dom';
import { storeContext } from '../../context/storeContext';
import SearchBar from '../SearchBar/SearchBar';



const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");
    const {getTotalCartAmount,token,setToken}=useContext(storeContext);
    const navigate=useNavigate();
    const logout= () =>{
        localStorage.removeItem("token");
        setToken("")
        navigate("/")

    }
    
  return (
    <div className='navbar'>
      <Link to="/"><img className="logo" src="/logo.png" alt="assest-logo" /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={(menu=="home")?"active":"" }>Home</Link>
            <a href="#exploreMenu" onClick={()=>setMenu("menu")} className={(menu=="menu")?"active":""}>Menu</a>
            <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={(menu=="mobile-app")?"active":""}>Mobile App</a>
            <a href="#footer" onClick={()=>setMenu("contact-us")} className={(menu=="contact-us")?"active":""}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <SearchBar/>
            <div className="navbar-search-icon">
                <Link to='/cart' onClick={()=>setMenu("cart")} className={(menu=="cart")?"active":"" }><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token? <button onClick={()=>setShowLogin(true)}>Sign In</button>:<div className='navbar-profile'>
                    
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
                    </ul>
                    </div>}
            

        </div>
    </div>
  )
}

export default Navbar
