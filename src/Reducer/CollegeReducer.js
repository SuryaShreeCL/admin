import { COLLEGES } from "../Redux/Action";
const initialState = {
  CollegeList: [],
  allCollegeList:[],
  BranchList: [],
  University: [],
  deleteUniversity : [],
  Degree: [],
  addCollegeStatus:[],
  updateCollegeStatus:[],
  deleteCollege : [],
  addUniversity:[],
  updateUniversity:[],
  PaginateDegreeList:[],
  paginateCollegeList : [],
  paginateUniversityList : [],
  getPGDegrees:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLLEGES.addCollges:
      return {
        ...state,
        addCollegeStatus: action.payload,
      };
    case COLLEGES.updateColleges:
      return{
        ...state,
        updateCollegeStatus:action.payload,
      }
      case COLLEGES.deleteCollege:
      return{
        ...state,
        deleteCollege:action.deleteCollege,
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
    case COLLEGES.deleteUniversity:
      return{
        ...state,
        deleteUniversity:action.deleteUniversity,
      }
	case COLLEGES.getDegrees:
      return {
        ...state,
        Degree: action.degreeList,
      };
    case COLLEGES.getPaginateDegree:
      return {
        ...state,
        PaginateDegreeList:action.PaginateDegreeList,
      }
      // Selva
      case COLLEGES.getPaginateCollege:
        return {
          ...state,
          paginateCollegeList:action.paginateCollegeList,
        }
        case COLLEGES.getPaginateUniversity:
        return {
          ...state,
          paginateUniversityList:action.paginateUniversityList,
        }
        case COLLEGES.getPGDegrees:
          return {
            ...state,
            getPGDegrees:action.getPGDegrees,
          }
        
    default:
      break;
  }
  return state;
};
