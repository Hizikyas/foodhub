import { createSlice } from "@reduxjs/toolkit";

const OrderTrackSlice = createSlice({
    name : "ordertrack" ,
    initialState : {
        reply: "" ,
        date : {
            day : "" ,
            month : "" ,
            year : "" 
            } ,
        totalAmount : ""  ,
        mealListName: [] 
    } ,
    reducers : {
     addOrderTrack (state, action ) 
     {
         const order = action.payload ;
         state.mealListName = order.orderListName ;
         state.totalAmount = order.orderTotalAmount ;
         state.date.day = order.day ;
         state.date.month = order.month;
         state.date.year = order.year ;
     } ,
     removeOrderTrack (state)
     {
        state.mealListName = [] ;
        state.totalAmount = "" ;
        state.date.day = "" ;
        state.date.month = "";
        state.date.year = "" ;
        state.reply = "" ;
     } ,
     addReply(state , action )
     {
        state.reply = action.payload.Reply ;
     }


    }
})
export const  ordertrackActions = OrderTrackSlice.actions ;
export default OrderTrackSlice.reducer ;