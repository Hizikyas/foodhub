import React from 'react'
import classes from "./MealItem.module.css"
import Button from '../../UI/Button/Button'
import { useHistory , useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import {searchByIdSideEffect} from "../../Store/sideEffect"
import {cartActions} from "../../Store/CartSlice" 
import {meallistAction} from "../../Store/meallistSlice"
import { UIactions } from '../../Store/UIshowSlice'

const MealItem = props => {

  const {name , img , price , id , amount , ingredient} = props.meal ;
  const history = useHistory() ;
  const match = useRouteMatch() ;
  const  dispatch = useDispatch() ;


  const viewDetailHundler = () => {

    dispatch(searchByIdSideEffect(id , price , amount))
    history.push(`${match.url}/${id}`)
  
  } ;

  const  addToCartHundler = () => {
    dispatch(UIactions.showCartBoop()) ;
   dispatch(cartActions.addToCart({id , name , img , price , amount }))
  }

  const addAmountHundler = () => {
    dispatch(meallistAction.increaseAmount({id , amount}))
  } ;

  const removeAmountHundler = () => {
    dispatch(meallistAction.decreaseAmount({id}))
  } ;


  return (
    <div className={classes["mealitem-container"]} >
    <div className={classes["img-container"]}>
        <img src ={img} alt= {name} /> 
        <div className={classes.overlay}></div>
        <div className={classes["img-action"]}>
              <Button title="view detail" onClick= {viewDetailHundler}  className={classes["view-action"]}/>
         </div>
        <p>$ {price}</p>
    </div>
    
   <div className={classes.meal}>

      <div className={classes["meal-name-container"]}>
          <p>{name}</p>
      </div>

      <div className={classes["meal-discription-container"]}>
        <p>{ingredient.join(" , ")}</p>
      
      </div>

      <div className={classes["meal-amount"]}>
          <p> $ {price} </p>
      <div className={classes["meal-action"]}>
          <Button className={classes.button} title="-" onClick={removeAmountHundler} /> 
          <p>{amount}</p>
          <Button className={classes.button} title="+" onClick={addAmountHundler} />
      </div>
      </div>

      <div className={classes['cart-action']}>
        <Button title="Add to cart" onClick={addToCartHundler} className={classes["cart-button"]}/> 
      </div>
   </div>

    </div>
  )
}

export default MealItem