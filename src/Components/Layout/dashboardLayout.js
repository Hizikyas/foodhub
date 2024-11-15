import React from 'react'
import Navbar from '../Nav-bar/Navbar'
import classes from "./dashboardLayout.module.css"

const DashboardLayout = props => {

  return (
  <React.Fragment> 
          <Navbar  /> 
          <div className={classes["layout-container"]}>{props.children}</div>
    </React.Fragment>
  )
}

export default DashboardLayout