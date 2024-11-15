import React from 'react'
import classes from "./CartItem.module.css"
import Button from '../../UI/Button/Button'
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {cartActions} from "../../Store/CartSlice"

const CartItem = props => {
  const {id , img , name , price , amount , totalPrice } = props.cart ;
  const  dispatch = useDispatch()


  const addAmountHundler = () => {
  dispatch(cartActions.addAmount({id: id}))
  } ;

  const removeAmountHundler  = ()  => {
    dispatch(cartActions.removeAmount({id : id}))
  } ;
  return (
    <div  className={classes["cart-item"]}>

        <div  className={classes["cart-item-details"]}>

            <div className={classes['row-1']} >
                <div className={classes["img-meal-info"]}>
                    <div className={classes["img-container"]}>
                        <img src={img} alt={id} />
                    </div>

                    <div className={classes["mealname-price"]}>
                        <p>{name}</p>
                        <p>${price}<span>X {amount}</span></p>
                    </div>
                </div>
    
                <div className={classes["amount-info"]}>
                    <p>Amount</p>
                    <div className={classes["amount-input"]}>
                      <Button title="-" className={classes.button} onClick={removeAmountHundler} />
                      <p>{amount}</p>
                      <Button title="+" className={classes.button}  onClick={addAmountHundler}/>
                    </div>
                  </div>   
            </div>
    
            <div className={classes["row-2"]}>
    
               <div>
                       <p>Total price :</p>
                       <p> ${totalPrice.toFixed(2)}</p>  
               </div>
    
            </div>

         </div>
         <div className={classes["close-icon"]}>
           <IoCloseSharp onClick={() =>   dispatch(cartActions.removeCartItem({id: id}))} />
         </div>

    </div>
  )
}

export default CartItem