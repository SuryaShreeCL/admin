import { COURSES } from "../Redux/Action";
const initialState = {
  CourseList: [],
  CourseById:[],
  RecommendedCourseList: [],
  PopularCourseList: [],
  SimilarCourseList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    default:
      break;
  }
  return state;
};
