import React from 'react'
import ReactDOM from  'react-dom'
import classes from "./Modal.module.css"
import Card from '../Card/Card'

const  Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
} ;

const  Overlay = props => {
    return <Card {...props}/>
}

const Modal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} /> , document.getElementById("modal"))}
      {ReactDOM.createPortal(<Overlay {...props} /> , document.getElementById("overlay"))}
    </React.Fragment>
    
  )
}

export default Modal