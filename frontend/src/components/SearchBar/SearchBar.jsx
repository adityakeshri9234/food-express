import React, { useContext, useState } from 'react'
import "./SearchBar.css"
import { assets } from '../../assets/assets.js';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
const SearchBar = () => {
    const {url,food_list,searchItems,setSearchItem} =useContext(storeContext);
    const [value,setValue]=useState('')
    
    const onChange=async (event)=>{
        setValue(event.target.value);
        //const response=await axios.get(url+"/api/food/list");
        setSearchItem(food_list);
        
    }
    const onSearch=async(searchTerm)=>{
        setValue(searchTerm)
        const response=await axios.get(url+`/api/search/food?query=${value}`)
        if(response.data.data){
            setSearchItem(response.data.data);
            
        }
    }
  return (
    <div className='search-container'>
        <div className="search-inner">
            <input type="text" value={value} onChange={onChange} placeholder='Type to search'/>

            <img onClick={()=>onSearch(value) }src={assets.search_icon} alt=''/>
        </div>
        <div className="dropdown">
            {food_list.filter(item=>{
                const searchTerm=value.toLowerCase();
                const name=item.name.toLowerCase();
                return searchTerm && name.startsWith(searchTerm) && searchTerm !== name
            }).slice(0,10)
            .map((item,index)=>(
                <div key={index} onClick={()=>onSearch(item.name)}className='dropdown-row'>

                {item.name}
                    <hr />
                </div>
            ))}
        </div>
      
    </div>
  )
}
export default SearchBar
