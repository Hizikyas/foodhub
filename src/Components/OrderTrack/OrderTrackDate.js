import React from 'react'
import classes from "./OrderTrackDate.module.css"
const OrderTrackDate = props => {
  const {day , month, year} = props ;
let Month = ""
if(month === 1)
  Month = "Jan"
if(month === 2)
  Month = "Feb"
if(month === 3)
  Month = "Mar"
if(month === 4)
  Month = "Apr"
if(month === 5)
  Month = "May"
if(month === 6)
  Month = "Jun"
if(month === 7)
  Month = "Jul"
if(month === 8)
  Month = "Aug"
if(month === 9)
  Month = "Sep"
if(month === 10)
  Month = "Oct"
if(month === 11)
  Month = "Nov"
if(month === 12)
  Month = "Dec"

  return (
    <div className={classes.ordertrack}>
        <div className={classes["ordertrack__month"]}>{Month}</div>
        <div className={classes["ordertrack__year"]}>{year}</div>
       <div className={classes["ordertrack__date"]}>{day}</div>
    </div>
  )
}

export default OrderTrackDate