import React from 'react'
import "./Footer.css";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src='/logo.png' alt=""/>
                <p>
                Delivering delicious moments to your doorstep, one meal at a time.
                </p>
                <div className="footer-social-icons">
                    <a href='https://www.facebook.com/profile.php?id=100009444318383'><img src={assets.facebook_icon} alt="" /></a>
                    <a href='https://x.com/AdityaK46895280'><img src={assets.twitter_icon} alt="" /></a>
                    <Link to="https://www.linkedin.com/in/aditya-keshri-61b7b924a/"><img src={assets.linkedin_icon} alt="" /></Link>
                </div>
            </div>
            <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-102-456-6789</li>
                        <li>contact@foodexpress.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024  &copy; FoodExpress.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
