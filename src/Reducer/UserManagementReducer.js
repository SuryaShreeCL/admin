import { USERMANAGEMENT } from "../Redux/Action";
const initialState = {
  getUserDepartment: [],
  getUserDetails: [],
  editAdmin: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERMANAGEMENT.getUserDepartment:
      return {
        ...state,
        getUserDepartment: action.payload,
      };
    case USERMANAGEMENT.getUserDetails:
      return {
        ...state,
        getUserDetails: action.payload,
      };
    case USERMANAGEMENT.editAdmin:
      return {
        ...state,
        editAdmin: action.editAdmin,
      };
    default:
      break;
  }
  return state;
};
