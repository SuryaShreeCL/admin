import { COURSE_MATERIAL } from "../Action";

const initialState = {
  courses: [],
  subjects: [],
  concepts: [],
  createorUpdateTopicResponse: [],
  topicsDetails: [],
  taskDetails: [],
  createorUpdateTaskResponse: [],
};

const CourseMaterialReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_MATERIAL.viewCourses: {
      return {
        ...state,
        courses: action.payload,
      };
    }

    case COURSE_MATERIAL.viewSubjects: {
      return {
        ...state,
        subjects: action.payload,
      };
    }

    case COURSE_MATERIAL.viewConcepts: {
      return {
        ...state,
        concepts: action.payload,
      };
    }

    case COURSE_MATERIAL.viewTopics: {
      return {
        ...state,
        topics: action.payload,
      };
    }

    case COURSE_MATERIAL.createorUpdateTask: {
      return {
        ...state,
        createorUpdateTaskResponse: action.payload,
      };
    }

    case COURSE_MATERIAL.createorUpdateTopics: {
      return {
        ...state,
        createorUpdateTopicResponse: action.payload,
      };
    }

    case COURSE_MATERIAL.getTopicFullDetails: {
      return {
        ...state,
        topicsDetails: action.payload,
        taskDetails: action.payload.data.tasks,
      };
    }

    default:
      break;
  }
  return state;
};

// const ProfileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case COURSE.getCourseImage: {
//       return {
//         ...state,
//         courseImage: action.payload,
//       };
//     }
//     case COURSE.getCourseData: {
//       return {
//         ...state,
//         courseData: action.payload,
//       };
//     }
//     case COURSE.getInsights: {
//       return {
//         ...state,
//         courseInsights: action.payload,
//       };
//     }
//     case COURSE.getGoals: {
//       return {
//         ...state,
//         goals: action.payload,
//       };
//     }

//     default:
//       break;
//   }
//   return state;
// };

export default CourseMaterialReducer;
