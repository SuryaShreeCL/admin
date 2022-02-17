import { DEGREE } from "../Redux/Action";
const initialState = {
  addedDegree: null,
  updatedDegree: null,
  allDegreeList: [],
  deletedDegree: null,
  paginatedAndFilteredDegree: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEGREE.addDegree:
      return {
        ...state,
        addedDegree: action.addedDegree,
      };
    case DEGREE.updateDegree:
      return {
        ...state,
        updatedDegree: action.updatedDegree,
      };
    case DEGREE.getAllDegrees:
      return {
        ...state,
        allDegreeList: action.allDegreeList,
      };
    case DEGREE.deleteDegree:
      return {
        ...state,
        deletedDegree: action.deletedDegree,
      };
    case DEGREE.getDegreePaginate:
      return {
        ...state,
        paginatedAndFilteredDegree: action.paginatedAndFilteredDegree,
      };
    default:
      break;
  }
  return state;
};
