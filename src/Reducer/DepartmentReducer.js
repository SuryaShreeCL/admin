import { DEPARTMENT } from "../Redux/Action";
const initialState = {
  addedDepartment: null,
  updateDepartment: null,
  deleteDepartment: null,
  allDepartmentList: [],
  paginatedAndFilteredDepartment: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEPARTMENT.addDepartment:
      return {
        ...state,
        addedDepartment: action.addedDepartment,
      };
    case DEPARTMENT.updateDepartment:
      return {
        ...state,
        updateDepartment: action.updateDepartment,
      };
    case DEPARTMENT.deleteDepartment:
      return {
        ...state,
        deleteDepartment: action.deleteDepartment,
      };
    case DEPARTMENT.getAllDepartments:
      return {
        ...state,
        allDepartmentList: action.allDepartmentList,
      };
    case DEPARTMENT.getPaginateDepartment:
      return {
        ...state,
        paginatedAndFilteredDepartment: action.paginatedAndFilteredDepartment,
      };
    default:
      break;
  }
  return state;
};
