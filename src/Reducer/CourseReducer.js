import { COURSES } from "../Redux/Action";
const initialState = {
  CourseList: [],
  CourseById: [],
  AddCourse: [],
  RecommendedCourseList: [],
  PopularCourseList: [],
  SimilarCourseList: [],
  MarkettingRecommended: [],
  ServiceRecommended: [],
  courseFilterList: [],
  UpdateCourse: [],
  deleteCourse: [],
  DomainList: [],
  SubDomainList: [],
  ProductVariant: [],
  AdvanceCourse: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COURSES.AddCourse:
      return {
        ...state,
        AddCourse: action.AddCourse,
      };
    case COURSES.GetCourses:
      return {
        ...state,
        CourseList: action.courseList,
      };
    case COURSES.GetCourseById:
      return {
        ...state,
        CourseById: action.courseList,
      };
    case COURSES.UpdateCourse:
      return {
        ...state,
        UpdateCourse: action.updateCourse,
      };
    case COURSES.GetRecommendedCouses:
      return {
        ...state,
        RecommendedCourseList: action.recommendedCourseList,
      };
    case COURSES.GetPopularCourses:
      return {
        ...state,
        PopularCourseList: action.popularCourseList,
      };
    case COURSES.GetSimilarCourses:
      return {
        ...state,
        SimilarCourseList: action.similarCourseList,
      };
    case COURSES.GetMarkettingRecommended:
      return {
        ...state,
        MarkettingRecommended: action.MarkettingRecommended,
      };
    case COURSES.GetServiceRecommended:
      return {
        ...state,
        ServiceRecommended: action.ServiceRecommended,
      };
    case COURSES.DomainList:
      return {
        ...state,
        DomainList: action.payload,
      };
    case COURSES.SubDomainList:
      return {
        ...state,
        SubDomainList: action.payload,
      };
    case COURSES.AdvanceCourse:
      return {
        ...state,
        AdvanceCourse: action.payload,
      };
    case COURSES.ProductVariant:
      return {
        ...state,
        ProductVariant: action.payload,
      };

    // Selva
    case COURSES.getPaginateCourse:
      return {
        ...state,
        courseFilterList: action.courseFilterResult,
      };
    case COURSES.deleteCourse:
      return {
        ...state,
        deleteCourse: action.deleteCourse,
      };
    default:
      break;
  }
  return state;
};

