import React , {Suspense} from 'react'
import Loading from "../UI/Loading/Loading"
import { Route , useRouteMatch , Switch} from 'react-router-dom/cjs/react-router-dom.min'

const Meal = React.lazy(() => import('../Components/Meal/Meal'))
const MealItemDetail = React.lazy(() => import('../Components/Meal/MealItemDetail'))

const MealPage = () => {
  const match =  useRouteMatch() ; 
  return (
    <React.Fragment>
<Suspense fallback={<Loading /> }>
      <Switch>
              <Route path = {`${match.path}`}  exact>  <Meal /> </Route>
              <Route path= {`${match.path}/:mealdetail`}> <MealItemDetail /></Route>
      </Switch>
</Suspense>
    </React.Fragment>
  )
}

export default MealPage