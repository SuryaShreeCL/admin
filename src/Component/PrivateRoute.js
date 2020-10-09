import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { rootLoginPath } from './RoutePaths';

export default function PrivateRoute({component,...rest}) {
    var Component=component;
    return (
      <Route 
      render={props=>{          
          return (window.sessionStorage.getItem('token')==='true') ? <Component {...props} /> : <Redirect to={{pathname:rootLoginPath}} />
      }}
      />
    )
}
