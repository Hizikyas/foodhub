 import { createSlice } from "@reduxjs/toolkit";

 export const LoginSlice = createSlice({
    name: "Login" ,
    initialState: {
        username: "" , 
        userId : "" ,
        userPassword : ""  ,
        LoginValidity : false
    } ,
    reducers: {
        addUserName(state , action ) {
         state.username = action.payload.firstname ;
         state.userId = action.payload.userId ;
         state.userPassword = action.payload.userPassWord ;
         state.LoginValidity = action.payload.Login ;
        } ,
        removeUserName (state) 
        {
            state.username = "" ;
            state.userId = "" ;
            state.userPassword = "" ;
            state.LoginValidity = false ;
        }
    }
 }) ;

 export const LoginActions = LoginSlice.actions ;
 export default LoginSlice.reducer ;