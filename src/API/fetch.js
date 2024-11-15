import { UIactions} from "../Store/UIshowSlice" ;

const FETCH_DOMAIN = "https://foodhub-d74d5-default-rtdb.firebaseio.com" ;

export const SignUpFetch = (userinfo , dispatch) => {
    fetch(`${FETCH_DOMAIN}/users.json`, {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      
      if (!response.ok) throw new Error("Failed to fetch");
      else{
        dispatch(UIactions.showNotification({status: "success" , message:"succesfully signup!!"})) ;
        setTimeout( () => {
          dispatch(UIactions.clearNotification()) ;
        } , 3000)  ;

      }
      return response.json();
    })
    .catch(error => {

      dispatch(UIactions.showNotification({status: "error" , message: error.message })) ;
      setTimeout( () => {
        dispatch(UIactions.clearNotification()) ;
      } , 3000)  ;

    });
  };

  export const LoginFetch = (userinfo , dispatch) => {
    return fetch(`${FETCH_DOMAIN}/users.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        return response.json();
      })
      .then(value => {
        let loginValid = false;
        let userFirstName = "" ;
        let userId = "" ;
        let userPassword = "" ;
  
        for (const key in value) {
          const user = value[key];
          if (user.username === userinfo.username && user.password === userinfo.password) {
            loginValid = true;
            userFirstName = user.firstname ;
            userId = key ;
            userPassword = user.password ;
            break;
          }
        }
  
        return { userInfo: {loginValid: loginValid  ,  userFirstName: userFirstName , userID : userId  , userPassword : userPassword} };

      })
      .catch( () => {
        return { loginValid: false };
      });
  };

  export const CartFetch = (userData , dispatch) => {
    fetch(`${FETCH_DOMAIN}/users/${userData.ID}/cart.json` , {
      method: "PUT" ,
      body: JSON.stringify(userData.cartList
      ) ,
      headers : {
        'Content-Type': 'application/json',
      }      
    })
    .then ( response => {
      if(!response.ok)
        throw new Error("The order was unsuccessful.");
      return response.json() ;
    })
    .catch(error => {

      dispatch(UIactions.showNotification({status: "error" , message: error.message })) ;
      setTimeout( () => {
        dispatch(UIactions.clearNotification()) ;
      } , 3000)  ;
    })

  } ;
  
  export const Adminfetch = (userData , userinfo ,  dispatch) => {
  
    fetch (`${FETCH_DOMAIN}/Admin.json`, {
      method: "POST" ,
      body: JSON.stringify({ userInformation : {...userinfo , orderedList : userData.cartList }, reply : "" }) ,
      headers: {
        'Content-Type': 'application/json',
      }
    }) 
    .then (response => {
      if(!response.ok)
        throw new Error("The adminstarter has not received the order.");
      return response.json() ;
    })
    .catch (error => {
      dispatch(UIactions.showNotification({status: "error" , message: error.message })) ;
      setTimeout(() => {
        dispatch(UIactions.clearNotification()) ;
      } , 3000) ;
    }) ;

  } ;

  export const ReplyFetch = (password , dispatch) => {
    return fetch(`${FETCH_DOMAIN}/Admin.json`)
    .then(response => {
      if(!response.ok)
        throw new Error("The Reply has not received.");
      return response.json() ;
    })
   .then( data => {
    let reply = "" ;
    let orderMealNameList = [] ;
     for ( const key in data)
     {
        const admin = data[key] ;
        const adminPassword = admin.userInformation.password ;
         if (adminPassword === password)
         {
          reply = admin.reply ;
          orderMealNameList = admin.userInformation.orderedList ;
         }
     }

     return {info: {reply : reply , orderMealNameList : orderMealNameList }} ;
   })
       .catch (error => {
      dispatch(UIactions.showNotification({status: "error" , message: error.message })) ;
      setTimeout(() => {
        dispatch(UIactions.clearNotification()) ;
      } , 3000) ;
    }) ;
  } ;

  export const contactMessage =  ( message , dispatch) => {

    fetch(`${FETCH_DOMAIN}/suggetion.json`, 
      {
        method : "POST" ,
        body : JSON.stringify(message) ,
        headers : {
          "Content-Type" : "application/json" ,
        }
      }
    ) 
    .then(res => {
            if(!res.ok)
               throw new Error("The adminstarter has not received the message.");
      return res.json() ;
    } )
    .catch (error => {
      dispatch(UIactions.showNotification({status: "error" , message: error.message })) ;
      setTimeout(() => {
        dispatch(UIactions.clearNotification()) ;
      } , 3000) ;

    })
   }

  
 