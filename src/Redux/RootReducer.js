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
import {
  testimonialCreateReducer,
  testimonialDeleteReducer,
  testimonialUpdateReducer,
  testimonialDetailsReducer,
  testimonialListReducer,
} from '../Reducer/TestimonialReducer';

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
  CareerTrackReducer: CareerTrackReducer,
  testimonialCreateReducer: testimonialCreateReducer,
  testimonialDeleteReducer: testimonialDeleteReducer,
  testimonialUpdateReducer: testimonialUpdateReducer,
  testimonialDetailsReducer: testimonialDetailsReducer,
  testimonialListReducer: testimonialListReducer,
});
