import { createSlice } from "@reduxjs/toolkit";

const meallistSlice = createSlice({
    name : "mealList" ,
    initialState : {
       favMealId : [52772 , 52777 , 52782 , 52787 , 52792 , 52797 , 52802 , 52887] ,
       searchedMealData : {
                mealList:  [] ,
                totalPrice  : 0 ,
            } ,
        mealDetailData: []
     } ,

    reducers : {
        replaceMeal(state)
        {
            state.searchedMealData.mealList = [] ;
            state.searchedMealData.totalPrice = 0 ;
        } ,

        deletefavid(state) { 
            state.favMealId = [] ;
        } ,
        addFavId(state) {
            state.favMealId = [52772 , 52777 , 52782 , 52787 , 52792 , 52797 , 52802 , 52887] ;
        } ,  
        // removeFavMeal (state)
        // {
        //     state.searchedMealData.mealList =  state.searchedMealData.mealList.filter( each =>{ 
        //         const  isFav = state.favMealId.find( favid =>  favid === each.id );
        //        return  each.id !== isFav
        //     });
        // } ,

        removeMealDetail(state) {
         state.mealDetailData = [] ;
        },

        addMealDetailData (state , action)
        {

            const meal = action.payload ;
            const mealItem = state.searchedMealData.mealList.find( each => each.id === meal.id)
            state.mealDetailData.push({
                id: meal.id ,
                name: meal.name ,
                img : meal.img , 
                ingredient : meal.ingredient ,
                instructions : meal.instructions ,
                price: meal.price ,
                amount: mealItem.amount 
            });
        },
 
        increaseMealAmountDetail(state ) {
            if (state.mealDetailData[0].amount  < 10) 
              state.mealDetailData[0].amount =  state.mealDetailData[0].amount + 1 ;
        } ,
        decreaseMealAmountDetail(state ) {
            if (state.mealDetailData[0].amount  > 1) 
              state.mealDetailData[0].amount =  state.mealDetailData[0].amount - 1 ;
        } ,
        increaseAmount (state , action ) {
            const meal = action.payload ;
            const existingItemIndex = state.searchedMealData.mealList.findIndex( each => each.id === meal.id)  ;
             if (existingItemIndex  >= 0)
              {
                if(state.searchedMealData.mealList[existingItemIndex].amount  < 10)
                  state.searchedMealData.mealList[existingItemIndex].amount = state.searchedMealData.mealList[existingItemIndex].amount + 1 ;
              }


        } ,

        decreaseAmount (state , action ) {
            const meal = action.payload ;
            const existingItemIndex = state.searchedMealData.mealList.findIndex( each => each.id === meal.id) ;
             if (existingItemIndex >= 0)
              {
                if (state.searchedMealData.mealList[existingItemIndex].amount  > 1)
                  state.searchedMealData.mealList[existingItemIndex].amount = state.searchedMealData.mealList[existingItemIndex].amount - 1 ;
              }
        } ,

        addmealItem (state , action )
        {
            const mealItem  = action.payload ;
            const randomPrice = (Math.random() * 12).toFixed(2) ;
                state.searchedMealData.mealList.push({
                id : mealItem.id , 
                name: mealItem.name ,
                ingredient : mealItem.ingredient ,
                img: mealItem.img  ,
                price : randomPrice,
                amount: 1 ,
             }) ;
        } ,

        favmealItem (state , action )
        {
            const mealItem  = action.payload ;
            const randomPrice = (mealItem.id % 1000) / 100 ;
                state.searchedMealData.mealList.push({
                id : mealItem.id , 
                name: mealItem.name ,
                ingredient : mealItem.ingredient ,
                img: mealItem.img  ,
                price : randomPrice.toFixed(2) ,
                amount: 1 ,
             }) ;
        }

    }
}) ;
export const meallistAction = meallistSlice.actions; 

export default meallistSlice.reducer;

