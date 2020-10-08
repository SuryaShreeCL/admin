import React from 'react'
import {Route,Redirect} from 'react-router-dom'

export default function PrivateRoute({component,...rest}) {
    var Component=component;
    return (
      <Route 
      render={props=>{          
          return (props.location.state) ? <Component {...props} /> : <Redirect to={{pathname:'/login'}} />
      }}
      />
    )
}
