import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Login from './Login';
import Curated_Course from './CuratedCourse';
import Personal_information from './PersonalInformation';
import Login_Header from './LoginHeader';
import './Asset/Login.css';
import history from './History';
export default function Routes() {
  return (
    <div>
      <Login_Header />
      <div className='body'>
        <BrowserRouter>
          <Switch>
            <Router history={history}>
              <Route exact path='/' component={Login} />
              <Route exact path='/personalInfo' component={Personal_information} />
              <Route exact path='/curatedCourse' component={Curated_Course} />
            </Router>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
