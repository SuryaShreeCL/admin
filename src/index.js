import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./Asset/CssComponents.css";
import "./Asset/RengineNewVersion.css";
import history from "./Component/History";
import Login from "./Component/Login";
import RootContainer from "./Component/RootContainer";
import { rootLoginPath, rootPath } from "./Component/RoutePaths";
import ReduxStore from "./Redux/Store";

function App(props) {
  React.useEffect(() => {
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
  }, []);
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path={rootLoginPath} component={Login}></Route>
        <Route path={rootPath} component={RootContainer}></Route>
        <Redirect from="/" to={rootLoginPath}></Redirect>
        {/* <PrivateRoute path={rootPath} component={RootContainer} /> */}
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store={ReduxStore}>
    <App />
  </Provider>,
  document.getElementById("app")
);
