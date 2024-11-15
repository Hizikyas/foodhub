import React from 'react'
import CartItem from './CartItem'
import classes from "./cartList.module.css"
import Button from "../../UI/Button/Button"
import { useHistory , useRouteMatch} from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { meallistAction } from '../../Store/meallistSlice'

const CartList = () => {
    const history = useHistory() ;
    const dispatch = useDispatch() ;
    const match = useRouteMatch() ;
    const cart = useSelector( state => state.cart.cartList)
    const totalAmount = useSelector( state => state.cart.totalAmount )
 const closeHundler = () => {
    dispatch(meallistAction.deletefavid())
    history.push("/foodhub/meal");
}; 
  return (
  <div className={classes.cartList}>
 <div className={classes.wrap}>
           <ul className={classes.order}>
           { cart.length > 0 ?  cart.map( each  => <li key={each.id}><CartItem cart={each} /></li> ) : <h1 className={classes.centered}>Cart is empty.</h1>}
          </ul>
          <div className={classes.footer}>
              <div className={classes["total-amount"]}>
                  <p>Total amount</p>
                  <p>${parseFloat(totalAmount).toFixed(2)}</p>
  
             </div>
             <div className={classes["action-button"]}>
                  <Button title="order now" className={classes.button} onClick={() => history.push(`${match.path}/order`)} /> 
                  <Button title="close" className={classes.button}  onClick={closeHundler}/> 
             </div>
          </div>
 </div>
  </div>
  )
}

export default CartList