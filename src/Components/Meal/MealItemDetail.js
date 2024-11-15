import classes from "./MealItemDetail.module.css";
import Button from "../../UI/Button/Button";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import {cartActions } from "../../Store/CartSlice"
import { meallistAction } from "../../Store/meallistSlice";
import { UIactions } from "../../Store/UIshowSlice";
import  Loading from "../../UI/Loading/Loading"


const MealItemDetail = () => {
  const { mealdetail } = useParams();
  const  history = useHistory();
  const dispatch = useDispatch() ;

  const meal = useSelector((state) => state.mealList.mealDetailData[0]);

  const addCartHundler = () => {
    dispatch(UIactions.showCartBoop()) ;
    dispatch(cartActions.addToCart({id:meal.id, name:meal.name, img: meal.img  , price:meal.price ,  amount: meal.amount}))
  } ;
  
  if (!meal) {
    return <Loading />
  }
  
  const closeHundler = () =>{

    dispatch(meallistAction.deletefavid());
     history.push("/foodhub/meal")
    }

  return (
    <div className={classes.container}>
      <div className={classes["meal-item-discription-container"]}>
        <h2>{meal.name}</h2>
        <Button title="close"  className={classes["name-icon"]} onClick={closeHundler}/> 
      </div>

      <div className={classes["img-discription-container"]}>
        <div className={classes["img-container"]}>
          <img src={meal.img} alt={mealdetail} className={classes.img} />
        </div>

        <div className={classes["discription-container"]}>
          <div className={classes.upper}>
            <div className={classes.ingridiants}>
              <h3>Ingridiants</h3>
              <p>{meal.ingredient.join(" , ")}</p>
            </div>

            <div className={classes.instructions}>
              <h3>Instructions</h3>
              <p> {meal.instructions} </p>
            </div>
          </div>

          <div className={classes.bottom}>
            <div className={classes["order-section"]}>
              <h2>${meal.price}</h2>
              
              <div className={classes.amount}>
                <p>Amount</p>
                <div className={classes["amount-input"]}>
                  <Button title="-" className={classes.button} onClick={() => dispatch(meallistAction.decreaseMealAmountDetail())}/>
                  <p>{meal.amount}</p>
                  <Button title="+" className={classes.button} onClick={() => dispatch(meallistAction.increaseMealAmountDetail())} />
                </div>
              </div>

            </div>

            <div className={classes["order-button"]}>
              <Button title="Add to Cart" onClick={addCartHundler}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealItemDetail;
