/**
 * Icanio Technology. All rights reserved.
 **/

import React from "react";
import { Route, Switch } from "react-router-dom";
import PremiumUsersLanding from "../Component/PremiumUsers/PremiumUserLanding";
import "../Designs/Asset/Login.css";
import Curated_Course from "../Designs/CuratedCourse";
import MLogin from "../Designs/MLogin";
import Personal_information from "../Designs/PersonalInformation";
//LMS
import CourseLanding from "../Lms/Component/CourseLanding/CourseLanding";
import AddNewTopic from "../Lms/Component/CourseMaterials/addNewTopic/Index";
import CourseTaken from "../Lms/Component/Student/Index";
import AddStudyPlans from "../Lms/Component/StudyPlans/AddStudyPlans";
import StudyPlans from "../Lms/Component/StudyPlans/Index";
import AddTest from "../Lms/Component/Test/AddTest/Add";
import BulkUpload from "../Lms/Component/Test/BulkUpload/Index";
import TestLanding from "../Lms/Component/Test/Index";
import SingleUpload from "../Lms/Component/Test/SingleUpload/Index";
import AppVersionChange from "./AppVersion/AppVersionChange";
import AspirationTab from "./Aspiration/AspirationTab";
import Callschedule from "./Callschedule";
import CareerTrackVideo from "./CareerTrack/CareerTrackVideo";
import CareerTrackVideoSet from "./CareerTrack/CareerTrackVideoSet";
import CareerTrack from "./CareerTrack/Index";
import City from "./City";
import College from "./College";
import TabPanel from "./Course/TabPanel";
import Courses from "./Courses";
import Degree from "./Degree";
import Department from "./Department";
import InTake from "./InTake";
import LandingAdmin from "./LandingAdmin";
import Notification from "./Notification";
// import Onboarding from './ObCallSummary/Rating';
import CallSummaryLayout from "./ObCallSummary/CallSummaryLayout";
// import Rating from './ObOnboarding/Onboarding';
// import PersonaInfo, { personalInfo } from './ObOnboarding/personalInfo'
import ClientDetails from "./ObCallSummary/ClientDetails";
import ProductActivation from "./ObCallSummary/productActivation";
import PersonaInfo from "./ObOnboarding/personalInfo";
import ObOperationLanding from "./ObOperations/ObOperationLanding";
import ProductBasedUsers from "./ObOperations/ProductBasedUsers";
import StageBasedLayout from "./ObOperations/StageBasedLayout";
import ProductComboForm from "./Product/ProductComboForm";
import Product from "./Product/ProductLanding";
import ProductStages from "./Product/ProductStages";
import ProductVariantRoot from "./Product/ProductVariantRoot";
import StarterPack from "./ProductBased/StarterPack";
import ProductPunchingLanding from "./ProductPunching/ProductPunchingLanding";
import Choice from "./Question/Choice";
import Question from "./Question/Question";
import QuestionSet from "./Question/QuestionSet";
import QuestionBank from "./QuestionBank";
import ReportRootContainer from "./Report/Index";
import ReportHome from "./ReportHome";
import ClsaLanding from "../Component/Clsa/ClsaLanding";
import {
  addCoursePath,
  appVersion,
  aspirationPath,
  bulk_upload,
  callSchedulePath,
  callSummaryLayoutPath,
  careerTrackPath,
  careerTrackVideoPath,
  careerTrackVideoSetPath,
  choicePath,
  cityPath,
  clientDetailsPath,
  collegePath,
  coursePath,
  createPath,
  curatedPath,
  degreePath,
  departmentPath,
  editCoursePath,
  editPath,
  intakePath,
  landingAdminPath,
  listUsersProdBasedPath,
  lmsTest,
  lms_add_study_plan,
  lms_add_test,
  lms_add_topic,
  lms_course_landing,
  lms_course_taken,
  lms_study_plans,
  lms_copy_question,
  lms_passage,
  loginPath,
  notificationPath,
  obOperationPath,
  personelInfoPath,
  premiumUsersPath,
  productActivationPath,
  productBasedPath,
  productcomboPath,
  productPath,
  productPunchingPath,
  productstructurePath,
  productuserPunchingPath,
  productVariantPath,
  questionBankPath,
  questionSetPath,
  questionsPath,
  reportContentPath,
  reportsPath,
  single_upload,
  stagedTabsPath,
  starterPackPath,
  studentIdPath,
  studentPath,
  testCreate,
  testEdit,
  testimonialsPath,
  testPath,
  universityPath,
  videoPath,
  wallPath,
  webinarPath,
  clsaPath,
  clsaTestCreate,
  clsaTestEdit,
  userManagementPath,
  result,
  placementDrives,
  drivePath,
  thirdYear,
  createWebinarPath,
  editWebinarPath,
} from "./RoutePaths";
import Student from "./Student";
import Student_data from "./StudentData";
import StudentHome from "./StudentHome";
import TableComponent from "./TableComponent/Index";
import AppTestLanding from "./Test/AppTestLanding";
import CreateTest from "./Test/Pages/CreateTest";
import EditTest from "./Test/Pages/EditTest";
import TestimonialDashboard from "./Testimonials/TestimonialDashboard";
import University from "./University";
import Video from "./Video/Video";
import CreatePost from "./Wall/Pages/CreatePost";
import EditPost from "./Wall/Pages/EditPost";
import WallLanding from "./Wall/WallLanding";
import ThirdYearWallLanding from "./ThirdYearWall/ThirdYearWallLanding";
import ThirdYearWebinar from "./ThirdYearWall/Pages/Webinar";
import Webinar from "./Webinar/Webinar";
import ClsaTestPath from "../Component/Clsa/CreateTest";
import UserManagement from "./UserManagement";
import PlacementDrives from "./Wall/PlacementDrives";
import DriveResult from "./Wall/Pages/DriveResult";
import CopyQuestion from "../Lms/Component/Test/CopyQuestion/Index";
import Passage from "../Lms/Component/Passage/Index";
// import PersonaInfo from './Utils/DoccumentCard'
export default function Routes(props) {
  return (
    <Switch>
      {/* <Route restricted={false} exact path="/" component={Login} /> */}
      <Route
        exact
        path={studentPath}
        render={(props) => <StudentHome {...props} />}
      />
      <Route
        exact
        path={coursePath}
        render={(props) => <Courses {...props} />}
      />
      <Route
        exact
        path={studentPath}
        render={(props) => <StudentHome {...props} />}
      />
      <Route
        exact
        path={coursePath}
        render={(props) => <Courses {...props} />}
      />
      <Route
        exact
        path={editCoursePath.concat(":id")}
        render={(props) => <TabPanel {...props} />}
      />
      <Route
        exact
        path={addCoursePath}
        render={(props) => <TabPanel {...props} />}
      />
      <Route
        exact
        path={addCoursePath}
        render={(props) => <TabPanel {...props} />}
      />

      <Route
        exact
        path={collegePath}
        render={(props) => <College {...props} />}
      />
      <Route
        exact
        path={degreePath}
        render={(props) => <Degree {...props} />}
      />
      <Route
        exact
        path={departmentPath}
        render={(props) => <Department {...props} />}
      />
      <Route
        exact
        path={intakePath}
        render={(props) => <InTake {...props} />}
      />
      <Route
        exact
        path={universityPath}
        render={(props) => <University {...props} />}
      />
      <Route
        exact
        path={studentIdPath + "/:id"}
        render={(props) => <Student_data {...props} />}
      />
      <Route exact path={loginPath} render={(props) => <MLogin {...props} />} />
      <Route
        exact
        path={wallPath}
        render={(props) => <WallLanding {...props} />}
      />
      <Route
        exact
        path={thirdYear}
        render={(props) => <ThirdYearWallLanding {...props} />}
      />
      <Route
        exact
        path={placementDrives}
        render={(props) => <PlacementDrives {...props} />}
      />
      <Route
        exact
        path={createPath}
        render={(props) => <CreatePost {...props} />}
      />
      <Route
        exact
        path={editPath}
        render={(props) => <EditPost {...props} />}
      />
      <Route
        exact
        path={createWebinarPath}
        render={(props) => <ThirdYearWebinar {...props} />}
      />
      <Route
        exact
        path={`${editWebinarPath}/:id`}
        render={(props) => <ThirdYearWebinar {...props} />}
      />
      <Route
        exact
        path={premiumUsersPath}
        render={(props) => <PremiumUsersLanding {...props} />}
      />
      <Route
        exact
        path={appVersion}
        render={(props) => <AppVersionChange {...props} />}
      />
      <Route
        exact
        path={testPath}
        render={(props) => <AppTestLanding {...props} />}
      />
      <Route
        exact
        path={testCreate}
        render={(props) => <CreateTest {...props} />}
      />
      <Route
        exact
        path={testEdit}
        render={(props) => <EditTest {...props} />}
      />
      <Route
        exact
        path={personelInfoPath}
        render={(props) => <Personal_information {...props} />}
      />
      <Route
        exact
        path={curatedPath}
        render={(props) => <Curated_Course {...props} />}
      />
      <Route
        exact
        path={questionBankPath}
        render={(props) => <QuestionBank {...props} />}
      />
      <Route
        exact
        path={"/admin/table"}
        render={(props) => <TableComponent {...props} />}
      />
      <Route
        exact
        path={callSchedulePath}
        render={(props) => <Callschedule {...props} />}
      />
      {/* Selva */}
      <Route exact path={cityPath} render={(props) => <City {...props} />} />
      <Route
        exact
        path={aspirationPath}
        render={(props) => <AspirationTab {...props} />}
      />
      <Route
        exact
        path={questionSetPath}
        render={(props) => <QuestionSet {...props} />}
      />
      <Route
        exact
        path={questionsPath.concat(":id")}
        render={(props) => <Question {...props} />}
      />
      <Route
        exact
        path={choicePath.concat(":id")}
        render={(props) => <Choice {...props} />}
      />
      <Route exact path={videoPath} render={(props) => <Video {...props} />} />
      <Route
        exact
        path={productPath}
        render={(props) => <Product {...props} />}
      />
      <Route
        exact
        path={testimonialsPath}
        render={(props) => <TestimonialDashboard {...props} />}
      />
      <Route
        exact
        path={notificationPath}
        render={(props) => <Notification {...props} />}
      />
      <Route
        exact
        path={reportsPath}
        render={(props) => <ReportHome {...props} />}
      />
      <Route
        exact
        path={reportContentPath}
        render={(props) => <ReportRootContainer {...props} />}
      />
      <Route
        exact
        path={webinarPath}
        render={(props) => <Webinar {...props} />}
      />
      <Route
        exact
        path={careerTrackPath}
        render={(props) => <CareerTrack {...props} />}
      />
      <Route
        exact
        path={productBasedPath}
        render={(props) => <PersonaInfo {...props} />}
      />
      <Route
        exact
        path={starterPackPath}
        render={(props) => <StarterPack {...props} />}
      />
      <Route
        exact
        path={productVariantPath}
        render={(props) => <ProductVariantRoot {...props} />}
      />
      <Route
        exact
        path={productVariantPath + "/:id"}
        render={(props) => <ProductVariantRoot {...props} />}
      />
      <Route
        exact
        path={productPunchingPath}
        render={(props) => <Student {...props} />}
      />
      <Route
        exact
        path={productcomboPath}
        render={(props) => <ProductComboForm {...props} />}
      />
      <Route
        exact
        path={productPunchingPath}
        render={(props) => <Student {...props} />}
      />
      <Route
        exact
        path={productcomboPath}
        render={(props) => <ProductComboForm {...props} />}
      />
      <Route
        exact
        path={productuserPunchingPath.concat(":id")}
        render={(props) => <ProductPunchingLanding {...props} />}
      />
      <Route
        exact
        path={productstructurePath.concat(":id")}
        render={(props) => <ProductStages {...props} />}
      />
      <Route
        exact
        path={clientDetailsPath}
        render={(props) => <ClientDetails {...props} />}
      />
      <Route
        exact
        path={clientDetailsPath}
        render={(props) => <ClientDetails {...props} />}
      />
      <Route
        exact
        path={callSummaryLayoutPath.concat(":studentId/product/:productId")}
        render={(props) => <CallSummaryLayout {...props} />}
      />
      <Route
        exact
        path={obOperationPath}
        render={(props) => <ObOperationLanding {...props} />}
      />
      <Route
        exact
        path={obOperationPath}
        render={(props) => <ObOperationLanding {...props} />}
      />
      <Route
        exact
        path={obOperationPath + "/:productId"}
        render={(props) => <ObOperationLanding {...props} />}
      />
      <Route
        exact
        path={listUsersProdBasedPath}
        render={(props) => <ProductBasedUsers {...props} />}
      />
      <Route
        exact
        path={listUsersProdBasedPath + "/:productId"}
        render={(props) => <ProductBasedUsers {...props} />}
      />
      <Route
        exact
        path={stagedTabsPath.concat(":studentId" + "/:productId")}
        render={(props) => <StageBasedLayout {...props} />}
      />
      <Route
        exact
        path={productActivationPath}
        render={(props) => <ProductActivation {...props} />}
      />
      <Route
        exact
        path={productActivationPath + "/:productId"}
        render={(props) => <ProductActivation {...props} />}
      />
      <Route
        exact
        path={landingAdminPath}
        render={(props) => <LandingAdmin {...props} />}
      />

      <Route
        exact
        // path={`${careerTrackPath}/:id${careerTrackVideoSetPath}`}
        path={careerTrackVideoSetPath.concat(":id")}
        render={(props) => <CareerTrackVideoSet {...props} />}
      />
      <Route
        exact
        // path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
        path={careerTrackVideoPath.concat(":id")}
        render={(props) => <CareerTrackVideo {...props} />}
      />

      <Route
        exact
        // path={`${careerTrackPath}${careerTrackVideoSetPath}/:id${careerTrackVideoPath}`}
        path={lms_add_study_plan}
        render={(props) => <AddStudyPlans {...props} />}
      />

      <Route
        exact
        path={clsaPath}
        render={(props) => <ClsaLanding {...props} />}
      />
      <Route
        exact
        path={clsaTestCreate}
        render={(props) => <ClsaTestPath {...props} />}
      />
      <Route
        exact
        path={clsaTestEdit + ":id"}
        render={(props) => <ClsaTestPath {...props} />}
      />
      <Route exact path={userManagementPath} component={UserManagement} />

      {/* LMS */}

      <Route exact path={lms_course_landing} component={CourseLanding} />
      <Route exact path={lms_add_topic} component={AddNewTopic} />
      <Route exact path={lms_study_plans} component={StudyPlans} />
      <Route exact path={lmsTest} component={TestLanding} />
      <Route exact path={lms_course_taken} component={CourseTaken} />
      <Route exact path={lms_add_test} component={AddTest} />
      <Route exact path={lms_copy_question} component={CopyQuestion} />
      <Route exact path={lms_passage} component={Passage} />
      <Route
        exact
        path={bulk_upload + "/:testQuestionSetId/:sectionId?/:courseId?"}
        component={BulkUpload}
      />
      <Route export exact path={single_upload} component={SingleUpload} />
      <Route
        exact
        path={clsaPath}
        render={(props) => <ClsaLanding {...props} />}
      />
      <Route
        exact
        path={clsaTestCreate}
        render={(props) => <ClsaTestPath {...props} />}
      />
      <Route
        exact
        path={clsaTestEdit + ":id"}
        render={(props) => <ClsaTestPath {...props} />}
      />

      <Route
        exact
        path={drivePath + ":id"}
        render={(props) => <DriveResult {...props} />}
      />
    </Switch>
  );
}
