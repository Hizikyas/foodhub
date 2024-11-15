import React from 'react'
import useInput from '../../Hooks/useInput'
import classes from "./Order.module.css"
import Card from '../../UI/Card/Card'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { IoIosClose } from "react-icons/io";
import { useSelector , useDispatch } from 'react-redux'
import { UIactions } from '../../Store/UIshowSlice'
import {cartActions} from "../../Store/CartSlice"
import {CartFetch} from "../../API/fetch"
import {Adminfetch} from "../../API/fetch"

const Order = () => {
    const validateValue = (value) => value.trim() !== ""  ;
    const history = useHistory() ;
    const dispatch = useDispatch() ;
    const password = useSelector( state => state.Login.userPassword) ;
    const ID = useSelector( state => state.Login.userId) ;
    const cartList = useSelector( state => state.cart) ;

    const {  inputHundler:  inputHundler1 , inputBlurHundler:inputBlurHundler1, enteredValue: enteredValue1, enteredValid:enteredValid1, inValid : inValid1, reset: reset1} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler2 , inputBlurHundler:inputBlurHundler2, enteredValue: enteredValue2, enteredValid:enteredValid2, inValid : inValid2, reset: reset2} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler3 , inputBlurHundler:inputBlurHundler3, enteredValue: enteredValue3, enteredValid:enteredValid3, inValid : inValid3, reset: reset3} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler4 , inputBlurHundler:inputBlurHundler4, enteredValue: enteredValue4, enteredValid:enteredValid4, inValid : inValid4, reset: reset4} = useInput(validateValue) ;
    
    let validatepassword = false ;
     if(enteredValue3 === password)
      validatepassword = true ;

    let formValidity = false ;
    if (enteredValid1 && enteredValid2  && enteredValid3 && enteredValid4) 
      formValidity = true ;

    const userinfo = { FullName : enteredValue1 , Address : enteredValue2 , Zipcode : enteredValue4 , password : enteredValue3 } ;
    

    const confirmHundler = (event) => {

      event.preventDefault() ;
      if (validatepassword)
      {
         dispatch(UIactions.showNotification({status: "success" , message : "Your meal has been successfully ordered"})) ;
         setTimeout( () => {
          dispatch(UIactions.clearNotification()) ;
        }, 3500) ;

        CartFetch({ID , cartList } , dispatch) ;
        Adminfetch(cartList , userinfo ,  dispatch) ;

        dispatch(cartActions.removeFromCart()) ;
        history.push("/foodhub/meal") ;
        reset1() ;
        reset2() ;
        reset3() ;
        reset4() ;

      } 
       else
      {
         dispatch(UIactions.showNotification({status: "error" , message : "The password did not match during sign-up."})) ;
         setTimeout( () => {
          dispatch(UIactions.clearNotification()) ;
        }, 3000) ;
      }
    } ;
      
  return (
  <div className={classes.ordrcontainer}>
    <Card className={classes["form-container"]}>
   <div className={classes.form} >
      <form  >
                   <h1>Personal Details</h1>
  
                   <div className={classes["input-box"]}>
                       <input type='text' placeholder='Full name' onChange={inputHundler1} onBlur={inputBlurHundler1} value={enteredValue1} className={ !inValid1 ?  classes.input : classes["error-inp"] } />
                       { inValid1 && <p className={classes["error-msg"]}>full name required</p>}
                   </div>
  
                   <div className={classes["input-box"]}>
                       <input type='text' placeholder='Address' onChange={inputHundler2} onBlur={inputBlurHundler2} value={enteredValue2} className={ !inValid2 ?  classes.input: classes["error-inp"] } />
                       { inValid2 && <p className={classes["error-msg"]}>Address required</p>}
                   </div>

                   <div className={classes["input-box"]}>
                       <input type='number' placeholder='zip-code' onChange={inputHundler4} onBlur={inputBlurHundler4} value={enteredValue4} className={ !inValid4 ?  classes.input: classes["error-inp"] } />
                       { inValid4 && <p className={classes["error-msg"]}>Zip code required.</p>}
                   </div>
  
                   <div className={classes["input-box"]}>
                       <input type='password' placeholder='Password' onChange={inputHundler3} onBlur={inputBlurHundler3} value={enteredValue3} className={ !inValid3 ?  classes.input: classes["error-inp"] } />
                        { inValid3 && <p className={classes["error-msg"]}>Password required</p>}
                   </div>
           
                   <div className={classes["login-action"]}>
                     <button disabled={!formValidity} className={formValidity ? classes.button : classes.disabled} onClick={confirmHundler} >Confirm</button>
                   </div>
           
      </form>
   </div>
    </Card>
    <div className={classes["close-icon"]}>
    <IoIosClose className={classes.close} onClick = {() => history.push("/foodhub/cart")}/>
    </div>
  </div>
    
  )
}

export default Order