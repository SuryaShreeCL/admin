import { COLLEGES } from "../Redux/Action";
const initialState = {
  CollegeList: [],
  allCollegeList:[],
  BranchList: [],
  University: [],
  Degree: [],
  addCollege:[],
  updateColleges:[],
  addUniversity:[],
  updateUniversity:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLEGES.addCollges:
      return {
        ...state,
        addCollge: action.addCollege,
      };
    case COLLEGES.updateColleges:
      return{
        ...state,
        updateColleges:action.updateColleges,
      }
    case COLLEGES.getCollege:
      return {
        ...state,
        CollegeList: action.CollegeList,
      };
     case COLLEGES.getAllColleges:
      return {
        ...state,
        allCollegeList: action.allCollegeList,
      };
    case COLLEGES.getBranches:
      return {
        ...state,
        BranchList: action.BranchList,
      };
    case COLLEGES.getUniversity:
      return {
        ...state,
        University: action.universityList,
    };
    case COLLEGES.addUniversity:
      return {
        ...state,
        addUniversity: action.addUniversityList,
    };
    case COLLEGES.updateUniversity:
      return {
        ...state,
        updateUniversity: action.updateUniversityList,
	  };
	case COLLEGES.getDegrees:
      return {
        ...state,
        Degree: action.degreeList,
      };
    default:
      break;
  }
  return state;
};
