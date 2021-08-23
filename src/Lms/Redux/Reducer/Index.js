import { combineReducers } from "redux";
import CourseMaterialReducer from "./CourseMaterialReducer";
import LmsStudentReducer from "./LmsStudentReducer";

export default combineReducers({ CourseMaterialReducer, LmsStudentReducer });
