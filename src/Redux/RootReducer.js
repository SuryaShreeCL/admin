import { combineReducers } from "redux";
import CourseReducer from "../Reducer/CourseReducer";
import QuestionsReducer from "../Reducer/QuestionsReducer";
import CollegeReducer from "../Reducer/CollegeReducer";
import StudentReducer from "../Reducer/StudentReducer";
import ChoiceAnswerReducer from "../Reducer/ChoiceAnswerReducer";
import DepartmentReducer from "../Reducer/DepartmentReducer";
import DegreeReducer from "../Reducer/DegreeReducer";
import InTakeReducer from "../Reducer/InTakeReducer";
import AspirationReducer from "../Reducer/AspirationReducer";
import QuestionSetReducer from "../Reducer/QuestionSetReducer";
import VideoReducer from "../Reducer/VideoReducer";
import ProductReducer from "../Reducer/ProductReducer";
import AdminReducer from "../Reducer/AdminReducer";
import CareerTrackReducer from "../Reducer/CareerTrackReducer";
import NotificationReducer from "../Reducer/NotificationReducer";
import HelperReducer from "../Reducer/HelperReducer";
import ReportReducer from "../Reducer/ReportReducer";
import ProfileGapAnalysisReducer from "../Reducer/ProfileGapAnalysisReducer";
import CRGReducer from "../Reducer/CRGReducer";
import CvReviewReducer from "../Reducer/CvReviewReducer";
import ProfileFitSpiderGraphReducer from "../Reducer/ProfileFitSpiderGraphReducer";
import {
  testimonialCreateReducer,
  testimonialDeleteReducer,
  testimonialUpdateReducer,
  testimonialListReducer,
} from "../Reducer/TestimonialReducer";
import {
  wallPostCreateReducer,
  wallPostDeleteReducer,
  wallPostUpdateReducer,
  wallPostListReducer,
  getWallCategoriesReducer,
  getWallJobListReducer,
  wallWebinarListReducer,
  platformsReducer,
} from "../Reducer/WallReducer";
import StudentMarkDetailReducer from "../Reducer/MarkReducer";
import ScoreDetailsReducer from "../Reducer/ScoreReducer";
import MentorReducer from "../Reducer/MentorReducer";
import PgaReducer from "../Reducer/PgaReducer";
import CallReducer from "../Reducer/CallReducer";
import {
  testCreateReducer,
  testDeleteReducer,
  testUpdateReducer,
  testListReducer,
  testDetailsReducer,
} from "../Reducer/TestReducer";
import {
  getAppVersionReducer,
  updateAppVersionReducer,
} from "../Reducer/AppVersionReducer";

//elev8 Clsa
import ClsaReducer from "../Reducer/ClsaReducer";

// LMS
import CourseMaterialReducer from "../Lms/Redux/Reducer/CourseMaterialReducer";
import TestReducer from "../Lms/Redux/Reducer/TestReducer";
import LmsStudentReducer from "../Lms/Redux/Reducer/LmsStudentReducer";
import PgaReportReducer from "../Reducer/PgaReportReducer";
import StrategySessionReducer from "../Reducer/StrategySessionReducer";
import ProfileMentoringReducer from "../Reducer/ProfileMentoringReducer";
import ApplicationStageReducer from "../Reducer/ApplicationStageReducer";
import { thirdYearWebinarListReducer } from "../Reducer/ThirdWebinarReducer";
import UserManagementReducer from "../Reducer/UserManagementReducer";
import PassageReducer from "../Lms/Redux/Reducer/PassageReducer";

export default combineReducers({
  CourseReducer: CourseReducer,
  QuestionsReducer: QuestionsReducer,
  CollegeReducer: CollegeReducer,
  StudentReducer: StudentReducer,
  ChoiceAnswerReducer: ChoiceAnswerReducer,
  DepartmentReducer: DepartmentReducer,
  DegreeReducer: DegreeReducer,
  InTakeReducer: InTakeReducer,
  AspirationReducer: AspirationReducer,
  QuestionSetReducer: QuestionSetReducer,
  VideoReducer: VideoReducer,
  ProductReducer: ProductReducer,
  AdminReducer: AdminReducer,
  ReportReducer: ReportReducer,
  CareerTrackReducer: CareerTrackReducer,
  NotificationReducer: NotificationReducer,
  StudentMarkDetailReducer: StudentMarkDetailReducer,
  ScoreReducer: ScoreDetailsReducer,
  MentorReducer: MentorReducer,
  CallReducer: CallReducer,
  PgaReducer: PgaReducer,
  ProfileGapAnalysisReducer: ProfileGapAnalysisReducer,
  CRGReducer: CRGReducer,
  PgaReportReducer: PgaReportReducer,
  ProfileFitSpiderGraphReducer: ProfileFitSpiderGraphReducer,
  CvReviewReducer: CvReviewReducer,
  StrategySessionReducer: StrategySessionReducer,
  ProfileMentoringReducer: ProfileMentoringReducer,
  ApplicationStageReducer: ApplicationStageReducer,

  //TESTIMONIAL
  testimonialCreateReducer,
  testimonialDeleteReducer,
  testimonialUpdateReducer,
  testimonialListReducer,
  //APP VERSION
  getAppVersionReducer,
  updateAppVersionReducer,
  //WALL
  wallPostCreateReducer,
  wallPostDeleteReducer,
  wallPostUpdateReducer,
  wallPostListReducer,
  getWallCategoriesReducer,
  getWallJobListReducer,
  wallWebinarListReducer,
  platformsReducer,
  thirdYearWebinarListReducer,
  //TESTS
  testCreateReducer,
  testDeleteReducer,
  testDetailsReducer,
  testUpdateReducer,
  testListReducer,
  HelperReducer: HelperReducer,
  // LMS
  CourseMaterialReducer: CourseMaterialReducer,
  TestReducer: TestReducer,
  LmsStudentReducer: LmsStudentReducer,
  PassageReducer: PassageReducer,

  //elev8 clsa
  ClsaReducer: ClsaReducer,
  UserManagementReducer: UserManagementReducer,
});
