import { COLLEGES } from "../Redux/Action";
const initialState = {
  CollegeList: [],
  allCollegeList:[],
  BranchList: [],
  University: [],
  Degree: [],
  addCollege:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLEGES.addCollges:
      return {
        ...state,
        addCollge: action.addCollege,
      };
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
