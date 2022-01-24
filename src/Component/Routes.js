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
import RootContainer from "./RootContainer";
import Login from "./Login";
import AspirationTab from "./Aspiration/AspirationTab";
import {
  studentIdPath,
  studentPath,
  coursePath,
  wallPath,
  addCoursePath,
  testimonialsPath,
  editCoursePath,
  departmentPath,
  loginPath,
  personelInfoPath,
  curatedPath,
  questionBankPath,
  rootPath,
  testPath,
  collegePath,
  createPath,
  universityPath,
  aspirationPath,
  cityPath,
  questionSetPath,
  questionsPath,
  choicePath,
  videoPath,
  editPath,
  productPath,
  webinarPath,
  careerTrackPath,
  premiumUsersPath,
  careerTrackVideoSetPath,
  careerTrackVideoPath,
  documentDetailsPath,
  notificationPath,
  reportsPath,
  testCreate,
  testEdit,
  callSchedulePath,
  productBasedPath,
  starterPackPath,
  productVariantPath,
  productPunchingPath,
  productcomboPath,
  productuserPunchingPath,
  productstructurePath,
  ratingPath,
  OnboardingAcademicInfoPath,
  OnboardingPersonalInfoPath,
  clientDetailsPath,
  ratingPathCallSummary,
  callSummaryLayoutPath,
  OnboardingPath,
  obOperationPath,
  listUsersProdBasedPath,
  stagedTabsPath,
  productActivationPath,
  landingAdminPath,
  lms_course_landing,
  lms_add_topic,
  lms_study_plans,
  lms_add_study_plan,
  lmsTest,
  lms_course_taken,
  lms_add_test,
  bulk_upload,
  single_upload,
  appVersion,
  gmat_preview,
} from "./RoutePaths";
import College from "./College";
import University from "./University";
import TabPanel from "./Course/TabPanel";
import TableComponent from "./TableComponent/Index";
import Aspiration from "../Component/Aspiration";
import City from "./City";
import QuestionSet from "./Question/QuestionSet";
import Question from "./Question/Question";
import Choice from "./Question/Choice";
import Video from "./Video/Video";
import Product from "./Product/ProductLanding";
import TestimonialDashboard from "./Testimonials/TestimonialDashboard";
import Webinar from "./Webinar/Webinar";
import WallLanding from "./Wall/WallLanding";
import CareerTrack from "./CareerTrack/Index";
import CareerTrackVideoSet from "./CareerTrack/CareerTrackVideoSet";
import CareerTrackVideo from "./CareerTrack/CareerTrackVideo";
import StudentDocuments from "./StudentDocuments";
import StudentHome from "./StudentHome";
import Notification from "./Notification";
import Report from "./ReportHome";
import ReportHome from "./ReportHome";
import Callschedule from "./Callschedule";
import ProductBasedRoot from "./ProductBased/ProductBasedRoot";
import ProductVariantRoot from "./Product/ProductVariantRoot";
import StarterPack from "./ProductBased/StarterPack";
import ProductPunching from "./ProductPunching/ProductPunchingLanding";
import ProductComboForm from "./Product/ProductComboForm";
import ProductPunchingLanding from "./ProductPunching/ProductPunchingLanding";
import ProductStages from "./Product/ProductStages";
// import Rating from './ObOnboarding/Onboarding';
// import PersonaInfo, { personalInfo } from './ObOnboarding/personalInfo'
import ClientDetails from "./ObCallSummary/ClientDetails";
// import Onboarding from './ObCallSummary/Rating';
import CallSummaryLayout from "./ObCallSummary/CallSummaryLayout";
import ObOperationLanding from "./ObOperations/ObOperationLanding";
import Onboarding from "./ObOnboarding/Onboarding";
import ProductBasedUsers from "./ObOperations/ProductBasedUsers";
import StageBasedLayout from "./ObOperations/StageBasedLayout";
import ProductActivation from "./ObCallSummary/productActivation";
import CreatePost from "./Wall/Pages/CreatePost";
import EditPost from "./Wall/Pages/EditPost";
import CreateTest from "./Test/Pages/CreateTest";
import EditTest from "./Test/Pages/EditTest";
import PersonaInfo from "./ObOnboarding/personalInfo";
import LandingAdmin from "./LandingAdmin";
import PremiumUsersLanding from "../Component/PremiumUsers/PremiumUserLanding";


//LMS
import CourseLanding from "../Lms/Component/CourseLanding/CourseLanding";
import AddNewTopic from "../Lms/Component/CourseMaterials/addNewTopic/Index";
import StudyPlans from "../Lms/Component/StudyPlans/Index";
import AddStudyPlans from "../Lms/Component/StudyPlans/AddStudyPlans";
import TestLanding from "../Lms/Component/Test/Index";
import CourseTaken from "../Lms/Component/Student/Index";
import AddTest from "../Lms/Component/Test/AddTest/Add";
import BulkUpload from "../Lms/Component/Test/BulkUpload/Index";
import SingleUpload from "../Lms/Component/Test/SingleUpload/Index";
import GmatPreview from "../Lms/Component/Test/SingleUpload/preview/gmat/Index";

import AppTestLanding from "./Test/AppTestLanding";
import AppVersionChange from "./AppVersion/AppVersionChange";
// import PersonaInfo from './Utils/DoccumentCard'
export default function Routes(props) {
  return (
    <Switch>
      {/* <Route restricted={false} exact path="/" component={Login} /> */}
      <Route
        exact
        path={studentPath}
        render={props => <StudentHome {...props} />}
      />
      <Route exact path={coursePath} render={props => <Courses {...props} />} />
      <Route
        exact
        path={editCoursePath.concat(":id")}
        render={props => <TabPanel {...props} />}
      />
      <Route
        exact
        path={addCoursePath}
        render={props => <TabPanel {...props} />}
      />
      <Route
        exact
        path={departmentPath}
        render={props => <Department {...props} />}
      />
      <Route
        exact
        path={collegePath}
        render={props => <College {...props} />}
      />
      <Route
        exact
        path={universityPath}
        render={props => <University {...props} />}
      />
      <Route
        exact
        path={studentIdPath + "/:id"}
        render={props => <Student_data {...props} />}
      />
      <Route exact path={loginPath} render={props => <MLogin {...props} />} />
      <Route
        exact
        path={wallPath}
        render={props => <WallLanding {...props} />}
      />
      <Route
        exact
        path={createPath}
        render={props => <CreatePost {...props} />}
      />
      <Route exact path={editPath} render={props => <EditPost {...props} />} />
      <Route
        exact
        path={premiumUsersPath}
        render={props => <PremiumUsersLanding {...props} />}
      />
      <Route
        exact
        path={appVersion}
        render={props => <AppVersionChange {...props} />}
      />
      <Route
        exact
        path={testPath}
        render={props => <AppTestLanding {...props} />}
      />
      <Route
        exact
        path={testCreate}
        render={props => <CreateTest {...props} />}
      />
      <Route exact path={testEdit} render={props => <EditTest {...props} />} />
      <Route
        exact
        path={personelInfoPath}
        render={props => <Personal_information {...props} />}
      />
      <Route
        exact
        path={curatedPath}
        render={props => <Curated_Course {...props} />}
      />
      <Route
        exact
        path={questionBankPath}
        render={props => <QuestionBank {...props} />}
      />
      <Route
        exact
        path={"/admin/table"}
        render={props => <TableComponent {...props} />}
      />
      <Route
        exact
        path={callSchedulePath}
        render={props => <Callschedule {...props} />}
      />
      {/* Selva */}
      <Route exact path={cityPath} render={props => <City {...props} />} />
      <Route
        exact
        path={aspirationPath}
        render={props => <AspirationTab {...props} />}
      />
      <Route
        exact
        path={questionSetPath}
        render={props => <QuestionSet {...props} />}
      />
      <Route
        exact
        path={questionsPath.concat(":id")}
        render={props => <Question {...props} />}
      />
      <Route
        exact
        path={choicePath.concat(":id")}
        render={props => <Choice {...props} />}
      />
      <Route exact path={videoPath} render={props => <Video {...props} />} />
      <Route
        exact
        path={productPath}
        render={props => <Product {...props} />}
      />
      <Route
        exact
        path={testimonialsPath}
        render={props => <TestimonialDashboard {...props} />}
      />
      <Route
        exact
        path={notificationPath}
        render={props => <Notification {...props} />}
      />
      <Route
        exact
        path={reportsPath}
        render={props => <ReportHome {...props} />}
      />
      <Route
        exact
        path={webinarPath}
        render={props => <Webinar {...props} />}
      />
      <Route
        exact
        path={careerTrackPath}
        render={props => <CareerTrack {...props} />}
      />
      <Route
        exact
        path={productBasedPath}
        render={props => <PersonaInfo {...props} />}
      />
      <Route
        exact
        path={starterPackPath}
        render={props => <StarterPack {...props} />}
      />
      <Route
        exact
        path={productVariantPath}
        render={props => <ProductVariantRoot {...props} />}
      />
      <Route
        exact
        path={productVariantPath + "/:id"}
        render={props => <ProductVariantRoot {...props} />}
      />
      <Route
        exact
        path={productPunchingPath}
        render={props => <Student {...props} />}
      />
      <Route
        exact
        path={productcomboPath}
        render={props => <ProductComboForm {...props} />}
      />
      <Route
        exact
        path={productuserPunchingPath.concat(":id")}
        render={props => <ProductPunchingLanding {...props} />}
      />
      <Route
        exact
        path={productstructurePath.concat(":id")}
        render={props => <ProductStages {...props} />}
      />
      <Route
        exact
        path={clientDetailsPath}
        render={props => <ClientDetails {...props} />}
      />
      <Route
        exact
        path={callSummaryLayoutPath.concat(":studentId/product/:productId")}
        render={props => <CallSummaryLayout {...props} />}
      />
      <Route
        exact
        path={obOperationPath}
        render={props => <ObOperationLanding {...props} />}
      />
      <Route
        exact
        path={obOperationPath + "/:productId"}
        render={props => <ObOperationLanding {...props} />}
      />
      <Route
        exact
        path={listUsersProdBasedPath}
        render={props => <ProductBasedUsers {...props} />}
      />
      <Route
        exact
        path={listUsersProdBasedPath + "/:productId"}
        render={props => <ProductBasedUsers {...props} />}
      />
      <Route
        exact
        path={stagedTabsPath.concat(":studentId" + "/:productId")}
        render={props => <StageBasedLayout {...props} />}
      />
      <Route
        exact
        path={productActivationPath}
        render={props => <ProductActivation {...props} />}
      />
      <Route
        exact
        path={productActivationPath + "/:productId"}
        render={props => <ProductActivation {...props} />}
      />
      <Route
        exact
        path={landingAdminPath}
        render={props => <LandingAdmin {...props} />}
      />

      <Route
        exact
        // path={`${careerTrackPath}/:id${careerTrackVideoSetPath}`}
        path={careerTrackVideoSetPath.concat(":id")}
        render={props => <CareerTrackVideoSet {...props} />}
      />
      <Route
        exact
        // path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
        path={careerTrackVideoPath.concat(":id")}
        render={props => <CareerTrackVideo {...props} />}
      />

      <Route
        exact
        // path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
        path={lms_add_study_plan}
        render={props => <AddStudyPlans {...props} />}
      />

      {/* LMS */}

      <Route exact path={lms_course_landing} component={CourseLanding} />
      <Route exact path={lms_add_topic} component={AddNewTopic} />
      <Route exact path={lms_study_plans} component={StudyPlans} />
      <Route exact path={lmsTest} component={TestLanding} />
      <Route exact path={lms_course_taken} component={CourseTaken} />
      <Route exact path={lms_add_test} component={AddTest} />
      <Route
        exact
        path={bulk_upload + "/:testQuestionSetId/:sectionId?/:courseId?"}
        component={BulkUpload}
      />
      <Route export exact path={single_upload} component={SingleUpload} />
    </Switch>
  );
}
