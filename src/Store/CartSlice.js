import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart" ,
    initialState: {
        cartList: [] ,
        totalAmount: 0
    } ,
    reducers: {
        addToCart (state, action)
        {
            const cartItem = action.payload ; 
            const existingItem = state.cartList.find( each => each.id === cartItem.id) 

            if  (existingItem)
            {
              existingItem.amount = cartItem.amount ;
              existingItem.totalPrice = existingItem.amount * existingItem.price ;
            }
          else
           { state.cartList.push({
                id: cartItem.id ,
                name: cartItem.name ,
                img: cartItem.img ,
                price: cartItem.price ,
                amount: cartItem.amount,
                totalPrice: cartItem.amount * cartItem.price
            }) ;
        }
        state.totalAmount = parseFloat(state.totalAmount) + parseFloat(cartItem.amount) * parseFloat(cartItem.price);
        
        } ,
        removeFromCart(state) {
            state.cartList = [] ;
            state.totalAmount = 0 ;
        } ,
        addAmount(state , action) {
            const id = action.payload.id ;
            const existingcartItem = state.cartList.find( each => each.id === id)
            if (existingcartItem.amount < 10 )
             {
                 existingcartItem.amount = existingcartItem.amount + 1 ;
                 existingcartItem.totalPrice = existingcartItem.amount  * existingcartItem.price ;
                //  state.totalAmount = state.totalAmount +  existingcartItem.price;
                 state.totalAmount = parseFloat(state.totalAmount) + parseFloat(existingcartItem.price);
             }
        } ,
        removeAmount(state , action) {
            const id = action.payload.id ;
            const existingcartItem = state.cartList.find( each => each.id === id) ;

                if (existingcartItem.amount > 1) 
                  {
                    existingcartItem.amount = existingcartItem.amount - 1 ;
                    existingcartItem.totalPrice = existingcartItem.price * existingcartItem.amount ;
                    // state.totalAmount = state.totalAmount -  existingcartItem.price ;
                    state.totalAmount = parseFloat(state.totalAmount) - parseFloat(existingcartItem.price);
                 }
                
            else
            {
                state.cartList = state.cartList.filter( each => each.id !== id)
                // state.totalAmount = state.totalAmount -  existingcartItem.price ;
                state.totalAmount = parseFloat(state.totalAmount) - parseFloat(existingcartItem.price);
            }
        } ,

        removeCartItem (state , action )
        {
        const cart = action.payload ;
        const existingItem = state.cartList.find( each => each.id === cart.id)
   
        if(existingItem)
            state.totalAmount = parseFloat(state.totalAmount) - parseFloat(existingItem.totalPrice);

          state.cartList = state.cartList.filter( each  => each.id !== cart.id)
        }
    }
}) ;

export const cartActions = CartSlice.actions ;
export default CartSlice.reducer ;