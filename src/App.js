import Landing from "./Components/LandingPage/Landing/Landing";
import React , {Suspense}from "react";
import {Route, Redirect,  Switch } from "react-router-dom/cjs/react-router-dom.min";

import Notification from "./UI/Notification/Notification";
import { useSelector } from "react-redux";
import Loading from "./UI/Loading/Loading"

// import Order from "./Components/Order/Order"
// import OrderTrack from "./Components/OrderTrack/OrderTrack";
// import CartPage from "./Pages/CartPage"
// import DashboardLayout from "./Components/Layout/dashboardLayout";
// import Contact from "./Components/Contact/contact";
// import MealPage from "./Pages/MealPage";


const Order = React.lazy(() => import("./Components/Order/Order") )
const OrderTrack = React.lazy(() => import("./Components/OrderTrack/OrderTrack") )
const CartPage = React.lazy(() => import("./Pages/CartPage") )
const DashboardLayout = React.lazy(() => import("./Components/Layout/dashboardLayout") )
const Contact = React.lazy(() => import("./Components/Contact/contact") )
const MealPage = React.lazy(() => import("./Pages/MealPage") )

function App() {
 const notify = useSelector(state => state.UIshow.notification) ;
 const authenticated= useSelector(state => state.Login.LoginValidity)

  return (
    <React.Fragment>
    
   <Suspense fallback={ <div> <Loading /> </div> }>
        <Switch>
          <Route path="/" exact> <Redirect to="/food hub" /> </Route>
          <Route path="/food hub"> <Landing /></Route>
      
         { authenticated ? <DashboardLayout>
          <Route path="/foodhub/order">   <Order /> </Route>
          <Route  path="/foodhub/meal"> <MealPage />  </Route>
          <Route path="/foodhub/cart" > <CartPage /></Route>
          <Route path="/foodhub/order track"> <OrderTrack /> </Route>
          <Route path="/foodhub/contact"> <Contact /> </Route>
  
          </DashboardLayout> : <Route> <Redirect to="/food hub"  />  </Route> }
        </Switch>
   </Suspense>
      
      { notify.status &&  <Notification status={notify.status} message={notify.message}/>}

    </React.Fragment>
  );
}

export default App;
