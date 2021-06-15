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
  notificationPath,
  reportsPath,
  callSchedulePath,
  productBasedPath,
  starterPackPath
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
import Product from './Product/ProductLanding';
import TestimonialDashboard from './Testimonials/TestimonialDashboard';
import Webinar from './Webinar/Webinar';
import CareerTrack from './CareerTrack/Index';
import CareerTrackVideoSet from './CareerTrack/CareerTrackVideoSet';
import CareerTrackVideo from './CareerTrack/CareerTrackVideo';
import StudentDocuments from './StudentDocuments';
import StudentHome from './StudentHome';
import Notification from "./Notification";
import Report from "./ReportHome"
import ReportHome from './ReportHome';
import Callschedule from "./Callschedule"
import ProductBasedRoot from './ProductBased/ProductBasedRoot';
import StarterPack from './ProductBased/StarterPack';
export default function Routes(props) {
  return (
    
        <Switch>
            {/* <Route restricted={false} exact path="/" component={Login} /> */}
            <Route exact path={studentPath} render={(props)=> <StudentHome {...props} />} />
            <Route exact path={coursePath} render={(props)=> <Courses {...props} />} />
            <Route exact path={editCoursePath.concat(':id')} render={(props)=> <TabPanel {...props} />} />
            <Route exact path={addCoursePath} render={(props)=> <TabPanel {...props} />} />
            <Route exact path={departmentPath} render={(props)=> <Department {...props} />} />
            <Route exact path={collegePath} render={(props)=> <College {...props} />} />
            <Route exact path={universityPath} render={(props)=> <University {...props} />} />
            <Route exact path={studentIdPath+'/:id'} render={(props)=> <Student_data {...props} />} />
            <Route exact path={loginPath} render={(props)=> <MLogin {...props} />} />
            <Route exact path={personelInfoPath} render={(props)=> <Personal_information {...props} />} />
            <Route exact path={curatedPath} render={(props)=> <Curated_Course {...props} />} />
            <Route exact path={questionBankPath} render={(props)=> <QuestionBank {...props} />} />
            <Route exact path={'/admin/table'} render={(props)=> <TableComponent {...props} />} />
            <Route exact path={callSchedulePath} render={(props)=> <Callschedule {...props} />} />
            {/* Selva */}
            <Route exact path={cityPath} render={(props)=> <City {...props} />} />
            <Route exact path={aspirationPath} render={(props)=> <AspirationTab {...props} />} />
            <Route exact path={questionSetPath} render={(props)=> <QuestionSet {...props} />} />
            <Route exact path={questionsPath.concat(':id')} render={(props)=> <Question {...props} />} />
            <Route exact path={choicePath.concat(':id')} render={(props)=> <Choice {...props} />} />
            <Route exact path={videoPath} render={(props)=> <Video {...props} />} />
            <Route exact path={productPath} render={(props)=> <Product {...props} />} />
            <Route exact path={testimonialsPath} render={(props)=> <TestimonialDashboard {...props} />} />
            <Route exact path={notificationPath} render={(props)=> <Notification {...props} />} />
            <Route exact path={reportsPath} render={(props)=> <ReportHome {...props} />} />
            <Route exact path={webinarPath} render={(props)=> <Webinar {...props} />} />
            <Route exact path={careerTrackPath} render={(props)=> <CareerTrack {...props} />} />
            <Route exact path={productBasedPath} render={(props)=> <ProductBasedRoot {...props} />} />
            <Route exact path={starterPackPath} render={(props)=> <StarterPack {...props} />} />
            <Route
              exact
              // path={`${careerTrackPath}/:id${careerTrackVideoSetPath}`}
              path={careerTrackVideoSetPath.concat(":id")}
              render={(props)=> <CareerTrackVideoSet {...props} />}
            />
            <Route
              exact
              // path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
              path={careerTrackVideoPath.concat(":id")}
              render={(props)=> <CareerTrackVideo {...props} />}
            />
            <Route exact path={documentDetailsPath} render={(props)=> <StudentDocuments {...props} />} />
        </Switch>
     
  );
}
