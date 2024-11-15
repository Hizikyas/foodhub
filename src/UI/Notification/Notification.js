import classes from "./notification.module.css"
import { useEffect , useState } from "react";

import { BiError } from "react-icons/bi";
import { IoCheckmarkOutline } from "react-icons/io5";

const Notification = props => {
    const  [specialClass, setSpecialClass] = useState("");

     useEffect(() => {

        if(props.status === "success")
            setSpecialClass(classes.success);
    
         if (props.status === "error")
            setSpecialClass(classes.error);

       const time =  setTimeout(() => {
          setSpecialClass(classes.remove);
        }, 3000);

        return () => clearTimeout(time) ;
      }, [props]);

    return <div className={`${specialClass} ${classes.notify}`}> 
     { specialClass.includes("error")  ? <BiError className={classes.icon}/> : <IoCheckmarkOutline className={classes.icon} /> }

       <p>{props.message}</p>
     </div>
}


export default Notification