import React from 'react'
import classes from "./OrderTrack.module.css"
import OrderTrackList from './OrderTrackList'
import Card from "../../UI/Card/Card"
import { useDispatch } from 'react-redux'
import {adminActions} from "../../Store/adminReplySlice"

const OrderTrack = () => {
  const dispatch = useDispatch() ;
  return (
   <div className={classes.container}>
      <Card className={classes["order-list"]}>
          <OrderTrackList /> 
      </Card>
          <button className={classes.button} onClick={() => dispatch(adminActions.removeReply())}>Remove orders</button>
   </div>
  )
}

export default OrderTrack