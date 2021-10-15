import { CAREER_ROLE_GRAPH } from "../Redux/Action";
const initialState = {
 getStudentGoals : [],
 updateStudentGoals : [],
 deleteStudentGoals : [],
 getGoalsType:[],
 getCareerDetails : [],
 getGraphDetails : [],
};

export default (state = initialState, action) => {
  switch (action.type) {     
      case CAREER_ROLE_GRAPH.getStudentGoals : 
      return {
          ...state,
          getStudentGoals : action.payload
      }
      case CAREER_ROLE_GRAPH.updateStudentGoals : 
      return {
          ...state,
          updateStudentGoals : action.payload
      }
      case CAREER_ROLE_GRAPH.deleteStudentGoals : 
      return {
          ...state,
          deleteStudentGoals : action.payload
      }
      case CAREER_ROLE_GRAPH.getGoalsType : 
      return {
          ...state,
          getGoalsType : action.payload
      }
      case CAREER_ROLE_GRAPH.getGraphDetails : 
      return {
          ...state,
          getGraphDetails : action.payload
      }
      case CAREER_ROLE_GRAPH.getCareerDetails : 
      return {
          ...state,
          getCareerDetails : action.payload
      }
    default:
      break;
  }
  return state;
};
