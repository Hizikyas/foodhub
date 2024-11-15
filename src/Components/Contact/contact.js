import React , {useRef} from 'react';
import classes from "./contact.module.css"
import {contactMessage} from "../../API/fetch"
import { useDispatch } from 'react-redux';
import {UIactions} from "../../Store/UIshowSlice"
const Contact = () => {
    const dispatch = useDispatch() ;

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const messageInputRef = useRef(null);

    const submitHundler = (event) => {
        event.preventDefault();
     let info = {
        name : nameInputRef.current.value  ,
        email: emailInputRef.current.value ,
        message: messageInputRef.current.value 
     }
     contactMessage(info , dispatch) ;
     info = null ;
     dispatch(UIactions.showNotification({status: "success" , message: "Thank you for sharing your thoughts and suggestions" })) ;
     setTimeout(() => {
       dispatch(UIactions.clearNotification()) ;
     } , 3000) ;
    };

    return (
        <div className={classes.contact}>
            <h1 className={classes.h1}>Contact Us</h1>
            <p className={classes.p}>If you have any questions or need assistance, feel free to reach out to us!</p>
            <div className={classes.info}>
                <div className={classes["info-item"]}>
                    <h3>Email:</h3>
                    <p>foodhub@gmail.com</p>
                </div>
                <div className={classes["info-item"]}>
                    <h3>Phone:</h3>
                    <p>+251-963-7890</p>
                </div>
                <div className={classes["info-item"]}>
                    <h3>Address:</h3>
                    <p>690 Foodhub Street, Bahirdar</p>
                </div>
            </div>
            <form className={classes.form}>
                <input type="text" placeholder="Your Name" className={classes.input} ref={nameInputRef}  />
                <input type="email" placeholder="Your Email" className={classes.input} ref={emailInputRef} />
                <textarea placeholder="Your Message" className={classes.textarea} ref={messageInputRef} ></textarea>
                <button type="submit" className={classes.button} onClick={submitHundler}>Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
