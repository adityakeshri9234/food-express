import { createContext, useEffect, useState } from "react";

export const storeContext=createContext(null)
import axios from "axios"
const StoreContextProvider=(props)=>{
    
    const [cartItems,setCartItems]=useState({});
    const url="https://food-express-v2qn.onrender.com"
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])
    const [searchItems,setSearchItem]=useState([]);
    
    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }

    }
    const getTotalCartAmount=()=>{
        let totalAmount= 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item)
                totalAmount+=itemInfo.price*cartItems[item]
            }
           
        }
        return totalAmount;
    }
    const fetchFoodList= async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
        setSearchItem(food_list);
        
    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }
    const fetchSearchList=async ()=>{
        const response=await axios.get(url+"/api/food/list");
        
        setSearchItem(response.data.data);
    }
    
    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            await fetchSearchList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        setFoodList,
        searchItems,
        setSearchItem,
        
    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}
export default StoreContextProvider;
