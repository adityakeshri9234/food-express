import React, { useContext } from 'react'
import "./FoodDisplay.css";
import { storeContext } from '../../context/storeContext';
import FoodItem from '../FoodItem/FoodItem';
const FoodDisplay = ({category}) => {
    const {food_list,searchItems}=useContext(storeContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {searchItems.map((item,index)=>{
            if((category==="All" || category===item.category )){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
        })}
      </div>

    </div>
  )
}

export default FoodDisplay

