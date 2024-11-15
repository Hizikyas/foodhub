import React from 'react'
import MealItem from "./MealItem"
import classes from "./MealList.module.css" ;
import { useSelector } from 'react-redux';



const MealList = () => {
  const mealList = useSelector( state => state.mealList.searchedMealData.mealList)
 
  return (

<div className={classes["meal-list-container"]}>
      {mealList.map( value  => <MealItem key={value.id} meal={value} /> )}
</div>
  )
}

export default MealList


