import React, { Suspense } from 'react'
import { Route , Switch , useRouteMatch} from 'react-router-dom/cjs/react-router-dom.min'
import Loading from "../UI/Loading/Loading"

const Cart = React.lazy( () => import("../Components/Cart/Cart"))
const Order = React.lazy( () => import('../Components/Order/Order'))

const CartPage = () => {
    const match = useRouteMatch() ;
  return (
   <Suspense fallback={ <Loading />  }>
      <Switch>
          <Route path={match.path} exact><Cart/> </Route>
          <Route path={`${match.path}/order`}><Order /> </Route>
      </Switch>
   </Suspense>
  )
}

export default CartPage