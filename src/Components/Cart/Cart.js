import React from 'react'
import CartList from './CartList'
import classes from "./Cart.module.css"

const Cart = () => {
  return (
    <div className={classes.cart} ><CartList /> </div>
  )
}

export default Cart