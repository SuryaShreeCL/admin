/**
 * Icanio Technology. All rights reserved.
 **/

import React from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import history from "./History";
import Student from "./Student";
import Student_data from "./StudentData";
import Courses from "./Courses";
import Department from "./Department";
import MLogin from "../Designs/MLogin";
import Curated_Course from "../Designs/CuratedCourse";
import Personal_information from "../Designs/PersonalInformation";
import "../Designs/Asset/Login.css";
import EditCourse from "./EditCourse";
import AddCourse from "./AddCourse";
import QuestionBank from "./QuestionBank";
import RecHome from "./RengineLite/RecHome";
import RootContainer from './RootContainer';
import Login from './Login';
import {
  studentIdPath,
  studentPath,
  coursePath,
  addCoursePath,
  editCoursePath,
  departmentPath,
  loginPath,
  personelInfoPath,
  curatedPath,
  questionBankPath,
  rootPath,
  collegePath,
  universityPath,
} from "./RoutePaths";
import College  from "./College";
import University from "./University";
import TabPanel from "./Course/TabPanel";
import TableComponent from "./TableComponent/Index";

export default function Routes() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Router history={history}>
            {/* <Route restricted={false} exact path="/" component={Login} /> */}
            <Route exact path={rootPath} component={Student} />
            <Route exact path={studentPath} component={Student} />
            <Route exact path={coursePath} component={Courses} />
            <Route
              exact
              path={editCoursePath.concat(':id')}
              component={TabPanel}
            />
            <Route
              exact
              path={addCoursePath}
              component={TabPanel}
            />
            <Route
              exact
              path={departmentPath}
              component={Department}
            />
             <Route
              exact
              path={collegePath}
              component={College}
            />
             <Route
              exact
              path={universityPath}
              component={University}
            />
            <Route
              exact
              path={studentIdPath.concat(':id')}
              component={Student_data}
            />
            <Route exact path={loginPath} component={MLogin} />
            <Route
              exact
              path={personelInfoPath}
              component={Personal_information}
            />
            <Route
              exact
              path={curatedPath}
              component={Curated_Course}
            />
            <Route
              exact
              path={questionBankPath}
              component={QuestionBank}
            />
            <Route
              exact
              path={'/admin/table'}
              component={TableComponent}
            />
            
            
          
            {/* <Route exact path='/Renginelite/Rengine' component={RecHome} /> */}
          </Router>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
