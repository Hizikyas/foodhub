import meallistSlice from "./meallistSlice"
import UIshowSlice from "./UIshowSlice"
import CartSlice from "./CartSlice"
import  LoginSlice  from "./LoginSlice";
import OrderTrackSlice from "./OrderTrackSlice"
import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminReplySlice"

const store = configureStore(
    {reducer : {
        mealList:meallistSlice , 
        UIshow : UIshowSlice,
        cart : CartSlice , 
        Login : LoginSlice ,
        ordertrack : OrderTrackSlice , 
        admin: adminSlice
    }})

export  default store;

