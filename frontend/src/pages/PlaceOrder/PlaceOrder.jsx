import React, { useContext, useEffect, useState} from "react";
import "./PlaceOrder.css";
import { storeContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PlaceOrder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(storeContext);
    const navigate=useNavigate()
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:"",
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    
    const placeOrder=async (event)=>{
        event.preventDefault();
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo=item;
                itemInfo["quantity"]=cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
       let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,

       }
       let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
       console.log(response)
       if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url);
       }
       else{
        alert("Error")
       }

    }
    useEffect(()=>{
        if(!token){
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    },[token])
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" required/>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" required/>
        </div>

        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required/>

        <div className="multi-fields">
          <input name="city"  onChange={onChangeHandler} value={data.city}  type="text" placeholder="City" required/>
          <input name="state" type="text"  onChange={onChangeHandler} value={data.state}  placeholder="State" required/>
        </div>
        <div className="multi-fields">
          <input name="zipcode"  onChange={onChangeHandler} value={data.zipcode}  type="text" placeholder="Zip Code" required/>
          <input name="country"  onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required/>
        </div>
        <input name="phone"  onChange={onChangeHandler} value={data.phone} type="text" placeholder="phone" required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>&#8377;{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>&#8377;{getTotalCartAmount()===0?0:40}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>&#8377;{getTotalCartAmount()===0?0:getTotalCartAmount()+40}</b>
                </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed To Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;