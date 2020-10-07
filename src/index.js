import React from 'react';
import ReactDOM from 'react-dom';
import "./Asset/CssComponents.css";
import "./Asset/RengineNewVersion.css";
//import Button from '@material-ui/core/Button';
import CarousolSlide from './Component/RengineLite/CarousolSlide'
import Paperbase from './Component/Paperbase'
import RecHome from './Component/RengineLite/RecHome'
import RengineNew from './Component/RengineLite/RengineNew'
import {Provider} from 'react-redux'
import ReduxStore from './Redux/Store'
import { BrowserRouter, Route, Switch, Router,Redirect } from 'react-router-dom'
import RootContainer from './Component/RootContainer';
import { rootPath } from './Component/RoutePaths';
//import RengineV2Route from './Component/RengineVersion2/RengineV2Route';
// import PersonalityTest from './Component/RengineLiteUpgrade/PersonalityTest';

//import Login from './component/Login'
//import Button from '@material-ui/core/Button';

function App() {
  return( 
   <BrowserRouter>
  <Switch>  
    <Route  path={rootPath} component={RootContainer} ></Route>  
    <Redirect exact from='/' to={rootPath}></Redirect>
  </Switch>
   </BrowserRouter>     
  )
}
ReactDOM.render(<Provider store={ReduxStore}><App/> </Provider>, document.getElementById('app'));
