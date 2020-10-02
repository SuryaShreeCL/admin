import { COLLEGES } from "../Redux/Action";
const initialState = {
  CollegeList: [],
  BranchList: [],
  University: [],
  Degree: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLEGES.getCollege:
      return {
        ...state,
        CollegeList: action.CollegeList,
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
