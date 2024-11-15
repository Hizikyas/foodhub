import React , {useEffect} from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import classes from "./Navbar.module.css"
import Button from "../../UI/Button/Button"
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { UIactions } from '../../Store/UIshowSlice';
import {LoginActions} from "../../Store/LoginSlice"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Navbar = () => {
const cart = useSelector(state => state.UIshow.cartboop )
const  dispatch = useDispatch() ;
const history = useHistory() ;



useEffect(() => {
  if (cart) {
    const timer = setTimeout(() => {
      dispatch(UIactions.hideCartBoop());
    }, 700); 

    return () => {
      clearTimeout(timer);
    };
  }
}, [cart, dispatch]);


  return (
    <div className={classes.navbar}>
        <div  className={classes.title}> <p>foodhub </p></div>
        <ul className={classes.navlink}>
            <li> <NavLink to="/foodhub/meal"  activeclassName ={classes.active} > Meal </NavLink></li>
            <li> <NavLink to="/foodhub/order track" activeclassName ={classes.active} > Order Track </NavLink></li>
            <li> <NavLink to="/foodhub/contact" activeclassName ={classes.active} > Contact </NavLink></li>
            <li> <NavLink to="/foodhub/cart" activeclassName ={classes.active} ><FaShoppingCart className={cart ? classes.boop : ""} /> </NavLink></li>
            <li><Button title= "Logout" className={classes.button} onClick={ () => {
              dispatch(LoginActions.removeUserName()) ;
              history.push("/food hub") ;
            }}/></li>

        </ul>
    </div>
  )
}

export default Navbar