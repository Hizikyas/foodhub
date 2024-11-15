import { createSlice } from "@reduxjs/toolkit";

const UIshowSlice = createSlice({
    name: "UIshow",
    initialState : {
        notification : 
        {
           status: ""  ,
           message : "" 
        } ,
        noData: {
            status : false ,
        } ,
        search: {
         status: false ,
         message: ""
      } , 
      loading: {
         status: false ,
      } ,
      cartboop: false 
    },
    reducers : {

     showNotification (state , action )
     {
      state.notification.status = action.payload.status ;
      state.notification.message = action.payload.message ;
     }  ,
     clearNotification (state)
     {
        state.notification.status = "" ;
        state.notification.message = ""
     } ,
     showNoData(state)
     {
        state.noData.status = true ;
     } ,
     hideNoData(state)
     {
        state.noData.status = false ;
     } ,

     showSearch (state, action)
     {
      state.search.status = true ;
      state.search.message = action.payload.message ;
     } ,
     hideSearch(state) 
     {
      state.search.status = false ;
     },
     showCartBoop(state) {
      state.cartboop = true;
    },
    hideCartBoop(state) {
      state.cartboop = false;
    },
    showLoading(state) 
    {
      state.loading.status = true ;
    } ,
    hideLoading(state) 
    {
      state.loading.status = false ;
    }

    }
}) ;

export const UIactions = UIshowSlice.actions ;
export default UIshowSlice.reducer ;

