/**
 * Icanio Technology. All rights reserved.
 **/

import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './History';
import Student from './Student';
import Student_data from './StudentData';
import Courses from './Courses';
import Department from './Department';
import MLogin from '../Designs/MLogin';
import Curated_Course from '../Designs/CuratedCourse';
import Personal_information from '../Designs/PersonalInformation';
import '../Designs/Asset/Login.css';
import EditCourse from './EditCourse';
import AddCourse from './AddCourse';
import QuestionBank from './QuestionBank';
import RecHome from './RengineLite/RecHome';
import RootContainer from './RootContainer';
import Login from './Login';
import AspirationTab from './Aspiration/AspirationTab';
import {
  studentIdPath,
  studentPath,
  coursePath,
  addCoursePath,
  testimonialsPath,
  editCoursePath,
  departmentPath,
  loginPath,
  personelInfoPath,
  curatedPath,
  questionBankPath,
  rootPath,
  collegePath,
  universityPath,
  aspirationPath,
  cityPath,
  questionSetPath,
  questionsPath,
  choicePath,
  videoPath,
  productPath,
  webinarPath,
  careerTrackPath,
  careerTrackVideoSetPath,
  careerTrackVideoPath,
  documentDetailsPath,
} from './RoutePaths';
import College from './College';
import University from './University';
import TabPanel from './Course/TabPanel';
import TableComponent from './TableComponent/Index';
import Aspiration from '../Component/Aspiration';
import City from './City';
import QuestionSet from './Question/QuestionSet';
import Question from './Question/Question';
import Choice from './Question/Choice';
import Video from './Video/Video';
import Product from './Product/Product';
import TestimonialDashboard from './Testimonials/TestimonialDashboard';
import Webinar from './Webinar/Webinar';
import CareerTrack from './CareerTrack/Index';
import CareerTrackVideoSet from './CareerTrack/CareerTrackVideoSet';
import CareerTrackVideo from './CareerTrack/CareerTrackVideo';
import StudentDocuments from './StudentDocuments';
import StudentHome from './StudentHome';
export default function Routes() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Router history={history}>
            {/* <Route restricted={false} exact path="/" component={Login} /> */}
            <Route exact path={rootPath} component={StudentHome} />
            <Route exact path={studentPath} component={StudentHome} />
            <Route exact path={coursePath} component={Courses} />
            <Route exact path={editCoursePath.concat(':id')} component={TabPanel} />
            <Route exact path={addCoursePath} component={TabPanel} />
            <Route exact path={departmentPath} component={Department} />
            <Route exact path={collegePath} component={College} />
            <Route exact path={universityPath} component={University} />
            <Route exact path={studentIdPath.concat(':id')} component={Student_data} />
            <Route exact path={loginPath} component={MLogin} />
            <Route exact path={personelInfoPath} component={Personal_information} />
            <Route exact path={curatedPath} component={Curated_Course} />
            <Route exact path={questionBankPath} component={QuestionBank} />
            <Route exact path={'/admin/table'} component={TableComponent} />

            {/* Selva */}
            <Route exact path={cityPath} component={City} />
            <Route exact path={aspirationPath} component={AspirationTab} />
            <Route exact path={questionSetPath} component={QuestionSet} />
            <Route exact path={questionsPath.concat(':id')} component={Question} />
            <Route exact path={choicePath.concat(':id')} component={Choice} />
            <Route exact path={videoPath} component={Video} />
            <Route exact path={productPath} component={Product} />
            <Route exact path={testimonialsPath} component={TestimonialDashboard} />
            <Route exact path={webinarPath} component={Webinar} />
            <Route exact path={careerTrackPath} component={CareerTrack} />
            <Route
              exact
              path={`${careerTrackPath}/:id${careerTrackVideoSetPath}`}
              component={CareerTrackVideoSet}
            />
            <Route
              exact
              path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
              component={CareerTrackVideo}
            />
            <Route exact path={documentDetailsPath} component={StudentDocuments} />
            {/* <Route exact path='/Renginelite/Rengine' component={RecHome} /> */}
          </Router>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
