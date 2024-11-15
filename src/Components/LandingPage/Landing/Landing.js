import React from 'react'
import Button from "../../../UI/Button/Button"
import classes from "./Landing.module.css"
import Login from "../Login/Login"
import SignUp from "../SignUp/SignUp"

import { FaUtensils, FaRegListAlt } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';

import { Route , Switch , useRouteMatch , useHistory} from 'react-router-dom/cjs/react-router-dom.min';


const Landing = () => {
  const match = useRouteMatch();
  const history = useHistory() ;
  return (

      <section  className={classes.landing}>
       
       <Switch>
              <Route exact path={`${match.path}/login`} > <Login /> </Route>
              <Route exact path={`${match.path}/signup`} ><SignUp/> </Route>
        </Switch>
        
          <nav  className={classes["landing-nav"]}>
              <p>foodhub</p>
              <div className={classes["nav-action"]}>
                  <Button title="Login" onClick={() => history.push(`${match.path}/login`)}/> 
                  <Button title="SignUp" onClick={() => history.push(`${match.path}/signup`)} /> 
              </div>
          </nav>
  
          <header className={classes.hero}>
              <div class={classes["hero-content"]} >
              <h1>Where Meal Planning Meets Simplicity</h1>
              <p>Easily plan meals, track ingredients, and streamline your shopping—all from one app.</p>
              <div className={classes.action}> 
                  <Button title="Get started" className={classes["header-button"] }onClick={() => history.push(`${match.path}/signup`)}  />  
              </div>
              </div>
          </header>
  
         <div className={classes.features}>
        <h2>Key Features</h2>
        <div className={classes["feature-grid"]}>
  
          <div className={classes["feature-item"]}>
            <FaUtensils className={classes["feature-icon"]} />
            <h3>Meal Menu Management</h3>
            <p>Easily manage and update your restaurant's menu offerings.</p>
          </div>
  
          <div className={classes["feature-item"]}>
            <FaRegListAlt className={classes["feature-icon"]} />
            <h3>Order Tracking</h3>
            <p>Track customer orders and their preparation status in real-time.</p>
          </div>
  
          <div className={classes["feature-item"]}>
            <HiOutlineClipboardList className={classes["feature-icon"]}/>
            <h3>Customizable Order Forms</h3>
            <p>Create customized order forms to collect customer preferences and special requests.</p>
          </div>
  
        </div>
         </div>
  
         <footer className={classes.footer}>
            <div className={classes["footer-contact"]}>
              <h3>Contact Us</h3>
              <p>Email: <a href="mailto:hizikyastamiru@gmail.com">foodhub@gmail.com</a></p>
              <p>Phone: <a href="tel:+251963904405">+251-963-904-405</a></p>
            </div>
          </footer>
  
      </section>
  )
}

export default Landing