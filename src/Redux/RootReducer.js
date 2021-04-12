import { combineReducers } from 'redux';
import CourseReducer from '../Reducer/CourseReducer';
import QuestionsReducer from '../Reducer/QuestionsReducer';
import CollegeReducer from '../Reducer/CollegeReducer';
import StudentReducer from '../Reducer/StudentReducer';
import ChoiceAnswerReducer from '../Reducer/ChoiceAnswerReducer';
import DepartmentReducer from '../Reducer/DepartmentReducer';
import AspirationReducer from '../Reducer/AspirationReducer';
import QuestionSetReducer from '../Reducer/QuestionSetReducer';
import VideoReducer from '../Reducer/VideoReducer';
import ProductReducer from '../Reducer/ProductReducer';
import AdminReducer from '../Reducer/AdminReducer';
import CareerTrackReducer from '../Reducer/CareerTrackReducer';
import NotificationReducer from "../Reducer/NotificationReducer";
import ReportReducer from "../Reducer/ReportReducer"
import {
  testimonialCreateReducer,
  testimonialDeleteReducer,
  testimonialUpdateReducer,
  testimonialListReducer,
} from '../Reducer/TestimonialReducer';
import StudentMarkDetailReducer from "../Reducer/MarkReducer";
import ScoreDetailsReducer from "../Reducer/ScoreReducer"
import MentorReducer from '../Reducer/MentorReducer';



export default combineReducers({
  CourseReducer: CourseReducer,
  QuestionsReducer: QuestionsReducer,
  CollegeReducer: CollegeReducer,
  StudentReducer: StudentReducer,
  ChoiceAnswerReducer: ChoiceAnswerReducer,
  DepartmentReducer: DepartmentReducer,
  AspirationReducer: AspirationReducer,
  QuestionSetReducer: QuestionSetReducer,
  VideoReducer: VideoReducer,
  ProductReducer: ProductReducer,
  AdminReducer: AdminReducer,
  ReportReducer : ReportReducer,
  CareerTrackReducer: CareerTrackReducer,
  NotificationReducer : NotificationReducer,
  StudentMarkDetailReducer:StudentMarkDetailReducer,
  ScoreDetailsReducer :ScoreDetailsReducer,
  MentorReducer :MentorReducer,
  testimonialCreateReducer: testimonialCreateReducer,
  testimonialDeleteReducer: testimonialDeleteReducer,
  testimonialUpdateReducer: testimonialUpdateReducer,
  testimonialListReducer: testimonialListReducer,
});
