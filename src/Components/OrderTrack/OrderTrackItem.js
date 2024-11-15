import React from 'react'
import classes from "./OrderTrackItem.module.css"
import OrderTrackDate from './OrderTrackDate'
// import Button from "../../UI/Button/Button"

const OrderTrackItem = props => {

  let status = true ;
  if (props.reply === "please wait reply, pending ...")
    status = false ;
  return (
    <li className={classes["item-container"]}>
            <div className={classes["item-info-action"]}>
                <OrderTrackDate day={props.day} month={props.month} year={props.year} />
                <div className={classes["item-discription"]}>
                    <p>{props.mealList.join(" , ")}</p>
                    <p>total amount : ${props.totalAmount}</p>
                </div>
                {/* <div className={classes["item-action"]} >
                  <Button  className={classes.button}title= "Remove order"/> 
                </div> */}
            </div>
            <div className={ status && classes.reply}>
                <p>{props.reply}</p>
            </div>
    </li>
  )
}

export default OrderTrackItem