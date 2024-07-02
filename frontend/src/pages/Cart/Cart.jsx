import React, { useContext, useState } from 'react'
import "./Cart.css";
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(storeContext);
  const navigate = useNavigate();
  const [data,setData]=useState({
    promo:"",
  })
  const ChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    alert("Not a valid promocode");
    setData({
        promo:""
    })
    

  }
    return (
    <div>
        
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item,index)=>{
                    if(cartItems[item._id]>0)
                        {
                            return (
                                <div>
                                    <div className="cart-items-title card-items-item">
                                    <img src={url+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>	&#8377;{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price*cartItems[item._id]}</p>
                                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>

                            )
                        }
                })}
            </div>
        </div>
      <div className="cart-bottom">
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
            <button onClick={()=>navigate('/order')}>Proceed To checkout</button>
        </div>
        <div className="cart-promocode">
            <div>
                <p>If you have a promo code, Enter it here</p>
                <form className="cart-promocode-input">
                    <input onChange={ChangeHandler} name='promo' value={data.promo} type="text" placeholder='promo code'/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
