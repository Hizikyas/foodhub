import React , { useEffect }  from "react";
import { IoSearchSharp } from "react-icons/io5";

import classes from "./Meal.module.css";
import useInput from "../../Hooks/useInput";
import MealList from "./MealList";

import {searchsideEffect} from "../../Store/sideEffect"
import {favoriteMeal} from "../../Store/sideEffect"
// import {UIactions} from "../../Store/UIshowSlice"

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Nodata from "../../UI/NoData/nodata"

const Meal = () => {
  const { inputHundler, inputBlurHundler, enteredValue, enteredValid } = useInput((value) => value.trim() !== "");
  const dispatch = useDispatch();

  const favMealId = useSelector (state => state.mealList.favMealId) ;
  const showSearch = useSelector( state => state.UIshow.search) ;
  const userFirstName = useSelector( state => state.Login.username)
  const noData = useSelector(state => state.UIshow.noData.status) ;


  let searchvalid = false;  
  if (enteredValid) searchvalid = true;

  const clickHundler = (event) => {
    event.preventDefault();
   dispatch(searchsideEffect(enteredValue)) ;
  }
 
 useEffect (() => {
  dispatch(favoriteMeal(favMealId))
  } , [ favMealId , dispatch]);

  return (
    <div>
      <div className={classes["welcome-title"]}>
         <h2> WELCOME <span>{userFirstName.toUpperCase()}</span> </h2>
      </div>

      <form className={classes["form-container"]}>
        <input
          type="search"
          placeholder="search your meals Eg: chicken"
          onChange={inputHundler}
          onBlur={inputBlurHundler}
          value={enteredValue}
          className={classes["input-box"]}
        />

        <button
          disabled={!searchvalid}
          className={
            searchvalid ? classes["button-action"] : classes["disabled-button"]
          }
          onClick={clickHundler}
        >
          <IoSearchSharp />{" "}
        </button>

      </form>

      { noData ? <Nodata className={classes["not-found"]}/> :    <div>
        {showSearch.status ? (
          <p className={classes["search-result"]}>
            search results for {showSearch.message}
          </p>
         ): <p className={classes["search-result"]}>
         Here are a few of our customers' favorite dishes:
       </p>} 
        <MealList /> 
   </div> }


    </div>
  );
};

export default Meal;
