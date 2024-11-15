import React , {useState} from 'react'
import classes from "./SignUp.module.css"
import useInput from '../../../Hooks/useInput'
import Modal from '../../../UI/Modal/Modal'
import Card from '../../../UI/Card/Card'
import { RiEyeCloseFill } from "react-icons/ri";
import {SignUpFetch} from "../../../API/fetch"
import { useDispatch } from 'react-redux'
import { UIactions } from '../../../Store/UIshowSlice'
import { Link , useHistory , Prompt} from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import Loading from '../../../UI/Loading/Loading'

const SignUp = () => {

   const validateValue = (value) => value.trim() !== ""  ;
   const validatePassword = value => value === enteredValue5 ;
   const isLoading = useSelector( state => state.UIshow.loading.status)
   const history = useHistory() ;
   const dispacth = useDispatch() ;

    const [isFocused , setisFocused] = useState(false) ;

    const {  inputHundler:  inputHundler1 , inputBlurHundler:inputBlurHundler1, enteredValue: enteredValue1, enteredValid:enteredValid1, inValid : inValid1, reset: reset1} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler2 , inputBlurHundler:inputBlurHundler2, enteredValue: enteredValue2, enteredValid:enteredValid2, inValid : inValid2, reset: reset2} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler3 , inputBlurHundler:inputBlurHundler3, enteredValue: enteredValue3, enteredValid:enteredValid3, inValid : inValid3, reset: reset3} = useInput(validateValue) ;
    const {  inputHundler:  inputHundler4 , inputBlurHundler:inputBlurHundler4, enteredValue: enteredValue4, enteredValid:enteredValid4, inValid : inValid4, reset: reset4} = useInput((value) => value.includes("@")) ;
    const {  inputHundler:  inputHundler5 , inputBlurHundler:inputBlurHundler5, enteredValue: enteredValue5, enteredValid:enteredValid5, inValid : inValid5, reset: reset5} = useInput((value) => value.length >= 5 ) ;
    const {  inputHundler:  inputHundler6 , inputBlurHundler:inputBlurHundler6, enteredValue: enteredValue6, enteredValid:enteredValid6, inValid : inValid6, reset: reset6} = useInput(validatePassword ) ;


    let formValidity = false ;
       if (enteredValid1 && enteredValid2  && enteredValid3 && enteredValid4 && enteredValid5 && enteredValid6) 
    formValidity = true ;

     let entered = false;
     if(enteredValid1 ||  enteredValid2 || enteredValid3 || enteredValid4 || enteredValid5 )
        entered = true ;

     const submitHundler = (event) => {
        event.preventDefault() ;
        dispacth(UIactions.showLoading())

        const userinfo = { firstname : enteredValue1 , lastname: enteredValue2 ,  username : enteredValue3 , email: enteredValue4 , password : enteredValue5 }
        SignUpFetch(userinfo , dispacth) ;
        dispacth(UIactions.hideLoading()) ;

        reset1() ;
        reset2() ;
        reset3() ;
        reset4() ;
        reset5() ;
        reset6() ;
        setisFocused(false) ;
        history.push("/food hub/login")

     }

  return (
    <Modal onConfirm = {() => history.push("/food hub")}>
 { isLoading ?  <Loading />    : <Card className={classes["form-container"]}>
          <Prompt when ={isFocused &&  entered  } message="Are you sure you want to leave?" /> 

             <form onFocus={() => setisFocused(true) } onSubmit={submitHundler}>
                 <h1>SignUp</h1>

                <div className={classes["caution-container"]}> <p className={classes.caution}>All the input must be filled, to create an account</p></div>

                 <div className={classes["name-container"]}>

                     <div className={classes["input-box"]}>
                         <input type='text' placeholder='First name' onChange={inputHundler1} onBlur={inputBlurHundler1} value={enteredValue1} className={ !inValid1 ?  classes.input: classes["error-inp"] } />
                         { inValid1 && <p className={classes["error-msg"]}>First name must not be empty</p>}
                     </div>
                     <div className={classes["input-box"]}>
                         <input type='text' placeholder='Last name' onChange={inputHundler2} onBlur={inputBlurHundler2} value={enteredValue2} className={ !inValid2 ?  classes.input: classes["error-inp"] } />
                         { inValid2 && <p className={classes["error-msg"]}>last name must not be empty</p>}
                     </div>
                     
                 </div>

                 <div className={classes["input-box"]}>
                     <input type='text' placeholder='Username' onChange={inputHundler3} onBlur={inputBlurHundler3} value={enteredValue3} className={ !inValid3 ?  classes.input : classes["error-inp"] } />
                     { inValid3 && <p className={classes["error-msg"]}>Username must not be empty</p>}
                 </div>

                 <div className={classes["input-box"]}>
                     <input type='email' placeholder='Email' onChange={inputHundler4} onBlur={inputBlurHundler4} value={enteredValue4} className={ !inValid4 ?  classes.input: classes["error-inp"] } />
                     { inValid4 && <p className={classes["error-msg"]}>Email must contain '@' charater</p>}
                 </div>

                 <div className={classes["input-box"]}>
                     <input type='password' placeholder='Password' onChange={inputHundler5} onBlur={inputBlurHundler5} value={enteredValue5} className={ !inValid5 ?  classes.input: classes["error-inp"] } />
                     <RiEyeCloseFill  className={classes.icon}/>
                      { inValid5 && <p className={classes["error-msg"]}>password must contain atleast 5 character</p>}
                 </div>

                 <div className={classes["input-box"]}>
                     <input type='password' placeholder='Confirm Password' onChange={inputHundler6} onBlur={inputBlurHundler6} value={enteredValue6} className={ !inValid6 ?  classes.input: classes["error-inp"] } />
                      { inValid6 && <p className={classes["error-msg"]}>password did not match </p>}
                 </div>
         
                 <div className={classes["login-action"]}>
                   <button disabled={!formValidity} className={formValidity ? classes.button : classes.disabled} >SignUp</button>
                 </div>
         
                 <div className={classes["register-link"]}>
                     <p>Already have an account?<Link to="/food hub/login" >Login</Link></p>
                     
                 </div>
             </form>
    
    </Card>}
</Modal>
  )
}

export default SignUp