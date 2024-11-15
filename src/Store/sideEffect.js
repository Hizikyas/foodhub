import {meallistAction} from "./meallistSlice"
import {UIactions} from "./UIshowSlice"

export const searchsideEffect = (enteredValue) => {
    return dispatch => {

      dispatch(meallistAction.replaceMeal())
      dispatch(meallistAction.deletefavid())
        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${enteredValue}`
          )
            .then((res) => {
              if (!res.ok) 
                throw new Error("Failed to fetch");
              return res.json();
            })

            .then((json) => {
              if (json.meals !== null) {
                dispatch(UIactions.showSearch({message : enteredValue}))
                dispatch(UIactions.hideNoData()); 
                  json.meals.forEach((meal) => dispatch(meallistAction.addmealItem({ 
                      id: meal.idMeal ,
                      name: meal.strMeal ,
                      ingredient : [meal.strIngredient1 ,meal.strIngredient2 , meal.strIngredient3 , meal.strIngredient4 , meal.strIngredient5 , meal.strIngredient6 ].filter(Boolean),
                      instruction :  meal.strInstructions ,
                      img : meal.strMealThumb ,
                      amount : 1 
                    }))
                  );
              } 
              else  {
              
                dispatch(UIactions.hideSearch());
                dispatch(UIactions.showNoData());  
              }
            })
            .catch((error) => {
              dispatch(UIactions.showNotification({status : "error" , message: error.message }))
          
            setTimeout( () => {
              dispatch(UIactions.clearNotification()) 
            } , 3000)}
          );
        };
}

export const favoriteMeal = (favMealId) => {

  return dispatch => {

    favMealId.forEach( (mealId , index) => {   

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then( res => {
      if (!res.ok)
        throw new Error("Failed to Fetch")
      return res.json() ;
    })
    .then ( json => {

      if(json.meals !==  null)
      {

        dispatch(meallistAction.favmealItem({
        id: json.meals[0].idMeal , 
        name:  json.meals[0].strMeal ,
        ingredient : [ json.meals[0].strIngredient1 , json.meals[0].strIngredient2 ,  json.meals[0].strIngredient3 , json.meals[0].strIngredient4 ,  json.meals[0].strIngredient5 , json.meals[0].strIngredient6 ].filter(Boolean) ,
        instruction  : json.meals[0].strInstructions ,
        img : json.meals[0].strMealThumb , 
    })) };
      
    })
    .catch( error => dispatch(UIactions.showNotification({status : "error" , message: error.message }))
  )

    } )
  }
}    

export const searchByIdSideEffect = (id , mealPrice , amount) => {
  return dispatch => {

   dispatch(meallistAction.removeMealDetail()) ;

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => {
      if(!res.ok)
        throw new Error("Failed to Fetch") ;
      return res.json(); 
    })
    .then (data => {
      if(data.meals !== null )
      {
        dispatch(meallistAction.addMealDetailData({
          id: data.meals[0].idMeal ,
          name: data.meals[0].strMeal ,
          instructions: data.meals[0].strInstructions ,
          ingredient:[ data.meals[0].strIngredient1 ,   data.meals[0].strIngredient2 ,   data.meals[0].strIngredient3 , data.meals[0].strIngredient4 , data.meals[0].strIngredient5 ,data.meals[0].strIngredient6 ,data.meals[0].strIngredient7 ,data.meals[0].strIngredient8, data.meals[0].strIngredient9, data.meals[0].strIngredient10, data.meals[0].strIngredient11, data.meals[0].strIngredient12, data.meals[0].strIngredient13, data.meals[0].strIngredient14, data.meals[0].strIngredient15].filter(Boolean) ,
          img : data.meals[0].strMealThumb,
          amount: amount ,
          price:  mealPrice ,
        }))
      }

      else
      {
        dispatch(UIactions.showNoData()) ;
      }
    })
    .catch(error => {dispatch(UIactions.showNotification({status: "error" , message : error.message}))
  })}
}
