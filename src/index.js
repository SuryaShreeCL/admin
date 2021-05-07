import React from 'react';
import ReactDOM from 'react-dom';
import "./Asset/CssComponents.css";
import "./Asset/RengineNewVersion.css";
import {Provider} from 'react-redux'
import ReduxStore from './Redux/Store'
import {ADMIN} from "./Redux/Action"
import {URL} from "./Actions/URL"
import axios from "axios"
import { BrowserRouter, Route, Switch, Router,Redirect } from 'react-router-dom'
import RootContainer from './Component/RootContainer';
import Login from './Component/Login';
import { rootPath, rootLoginPath, studentPath } from './Component/RoutePaths';
import PrivateRoute from './Component/PrivateRoute';
import { Student } from './Component/Student';
import { connect } from 'react-redux'
import {toRefreshToken} from "./Actions/AdminAction"
import history from "./Component/History";
//import RengineV2Route from './Component/RengineVersion2/RengineV2Route';
// import PersonalityTest from './Component/RengineLiteUpgrade/PersonalityTest';
//import Login from './component/Login'
//import Button from '@material-ui/core/Button';

function App(props) {
  React.useEffect(()=>{
    // try {
    //   setInterval(async () => {
    //     let refreshToken = window.sessionStorage.getItem("refreshToken")
    //     const res = await axios.get(URL+"/api/v1/refresh/token",{
    //       crossDomain: true,
    //   headers : {
    //       "x-refresh-token" : refreshToken,
    //       "admin" : "yes"
    //   }
    //   });
    //     // const blocks = await res.json();

       
    //   }, 5000);
    // } catch(e) {
    //   console.log(e);
    // }
  },[])
  console.log(props)
  console.warn=()=>{}
   console.error=()=>{}
  return( 
   <BrowserRouter history={history} >
  <Switch>    
    <Route  exact path='/' component={Login} ></Route>
    <Route  exact path={rootLoginPath} component={Login} ></Route>
    {/* <Redirect exact from='/' to={rootLoginPath}></Redirect> */}
    <PrivateRoute path={rootPath} component={RootContainer} />
  </Switch>
   </BrowserRouter>     
  )
}

ReactDOM.render(<Provider store={ReduxStore}><App/> </Provider>, document.getElementById('app'));
