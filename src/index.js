import React from 'react';
import ReactDOM from 'react-dom';
import "./Asset/CssComponents.css";
import "./Asset/RengineNewVersion.css";
import {Provider} from 'react-redux'
import ReduxStore from './Redux/Store'
import { BrowserRouter, Route, Switch, Router,Redirect } from 'react-router-dom'
import RootContainer from './Component/RootContainer';
import Login from './Component/Login';
import { rootPath, rootLoginPath } from './Component/RoutePaths';
import PrivateRoute from './Component/PrivateRoute';
//import RengineV2Route from './Component/RengineVersion2/RengineV2Route';
// import PersonalityTest from './Component/RengineLiteUpgrade/PersonalityTest';
//import Login from './component/Login'
//import Button from '@material-ui/core/Button';

function App() {
  return( 
   <BrowserRouter>
  <Switch>  
    {/* <Route  path={rootPath} component={RootContainer} ></Route>  */}
    <Route  exact path='/' component={Login} ></Route>
    <Route  exact path={rootLoginPath} component={Login} ></Route>
    {/* <Redirect exact from='/' to={rootLoginPath}></Redirect> */}
    <PrivateRoute path={rootPath} component={RootContainer} />
  </Switch>
   </BrowserRouter>     
  )
}
ReactDOM.render(<Provider store={ReduxStore}><App/> </Provider>, document.getElementById('app'));
