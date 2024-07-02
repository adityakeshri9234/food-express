import React from 'react'
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='exploreMenu' id='exploreMenu'>
        <h1>Explore Our Menu</h1>
        <p className='exploreMenu-text'>Choose from a diverse menu featuring a detectable array of dishes crafted with the finest ingredients and culinary expertise.Our mission is to satisfy your cravings and elevste your dining experience ,one delicious meal at a time.</p>
        <div className="exploreMenu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index}className="exploreMenu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
