import React from 'react'
import classes from "./Login.module.css"
import Modal from '../../../UI/Modal/Modal';
import Card from '../../../UI/Card/Card';
import useInput from "../../../Hooks/useInput"
import Loading from "../../../UI/Loading/Loading"
import {LoginFetch} from "../../../API/fetch"

import { RiEyeCloseFill } from "react-icons/ri";

import { Link , Prompt , useHistory  } from 'react-router-dom/cjs/react-router-dom.min'
import { UIactions } from '../../../Store/UIshowSlice';
import { LoginActions} from "../../../Store/LoginSlice"
import { useDispatch, useSelector} from 'react-redux';



const Login = () => {
    const {  inputHundler:  inputHundler1 , inputBlurHundler:inputBlurHundler1, enteredValue: enteredValue1, enteredValid:enteredValid1, inValid : inValid1, reset: reset1} = useInput((value) => value.trim() !== "" ) ;
    const {  inputHundler:  inputHundler2 , inputBlurHundler:inputBlurHundler2, enteredValue: enteredValue2, enteredValid:enteredValid2, inValid : inValid2, reset: reset2} = useInput((value) => value.trim() !== "" ) ;
    const  [isFocused, setisFocused] = React.useState(false);

    const history = useHistory() ;
    const  dispatch = useDispatch() ;
    const isLoading = useSelector( state => state.UIshow.loading.status)
     
    let formValidity = false ;
      if (enteredValid1 && enteredValid2)
    formValidity = true ;
    
    let enteredvalidity = false ;
      if (enteredValid1 || enteredValid2 )
    formValidity = true ;

      const submitHundler = (event) => {
        event.preventDefault();

       dispatch(UIactions.showLoading()) ;
        LoginFetch({ username: enteredValue1, password: enteredValue2 }, dispatch)
          .then(({ userInfo }) => {
      
            if (userInfo.loginValid) {
              dispatch(UIactions.showNotification({status: "success" , message: "Logged in successfully."})) ;
              setTimeout( () => {
                dispatch(UIactions.clearNotification())
              }, 3000) ;
              dispatch(LoginActions.addUserName({firstname : userInfo.userFirstName , userId : userInfo.userID , userPassWord: userInfo.userPassword , Login : userInfo.loginValid}))
              history.push("/foodhub/meal");
                  
            } else {
              dispatch(UIactions.showNotification({status: "error" , message: "Oops! Login didn’t work."})) ;
              setTimeout( () => {
                dispatch(UIactions.clearNotification())
              }, 3000) ;
            }
          })
          .catch((error) => {
                          dispatch(UIactions.showNotification({status: "error" , message: error.message})) ;
              setTimeout( () => {
                dispatch(UIactions.clearNotification())
              }, 3000) ;
          })
          .finally(() => {
            dispatch(UIactions.hideLoading());
          });

        reset1();
        reset2();
      };
      

  return (
   <Modal onConfirm= {() => history.push("/food hub")}>

{ isLoading ? <Loading className={classes.loading} />   :   <Card className={classes["form-container"]}>

             <Prompt when ={isFocused && enteredvalidity} message="Are you sure you want to leave? Entered data may be lost" /> 

                   <form onFocus={() => setisFocused(true)} onSubmit={submitHundler}>
                    <h1>Login</h1>
                    <div className={classes["input-box"]}>
                        <input type='text' placeholder='Username' onChange={inputHundler1} onBlur={inputBlurHundler1} value={enteredValue1} className={ !inValid1 ?  classes.input: classes["error-inp"] } />
                        { inValid1 && <p className={classes["error-msg"]}>Username must not be empty</p>}
                    </div>
                    <div className={classes["input-box"]}>
                        <input type='password' placeholder='Password' onChange={inputHundler2} onBlur={inputBlurHundler2} value={enteredValue2} className={ !inValid2 ?  classes.input: classes["error-inp"] } />
                        <RiEyeCloseFill  className={classes.icon}/>
                         { inValid2 && <p className={classes["error-msg"]}>password must not be empty</p>}
                    </div>
            
                    <div className={classes["login-action"]}>
                      <button disabled={!formValidity} className={formValidity ? classes.button : classes.disabled} >Login</button>
                    </div>
            
                    <div className={classes["register-link"]}>
                        <p>Don't have an account?<Link to="/food hub/signup">Register</Link></p>
                        
                    </div>
                </form>
       
      
       </Card>}
   </Modal>

  )
}

export default Login