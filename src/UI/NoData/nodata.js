import classes from "./noData.module.css"

const nodata = props => {
  return (
    <div className={`${classes.centered} ${props.className}`}><h1>NO DATA FOUND!!!</h1></div>
  )
}

export default nodata