import { ADMIN } from "../Redux/Action";
const initialState = {
  adminLoginDetails: [],
  refreshTokenDetails: [],
  studentAccessResponse: [],
  updatePersonalResponse: [],
  studentStatusResponse: [],
  updateVerificationResponse: [],
  updateEducationalonalResponse: [],
  updateAspirationResponse: [],
  contactDataResponse: [],
  updateAccStatusResponse: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN.adminLogin:
      return {
        ...state,
        adminLoginDetails: action.adminLoginDetails,
      };
    case ADMIN.refreshToken:
      return {
        ...state,
        refreshTokenDetails: action.refreshTokenDetails,
      };
    case ADMIN.studentAccess:
      return {
        ...state,
        studentAccessResponse: action.studentAccessResponse,
      };
    case ADMIN.updatePersonalData:
      return {
        ...state,
        updatePersonalResponse: action.updatePersonalResponse,
      };
    case ADMIN.viewStudentStatus:
      return {
        ...state,
        studentStatusResponse: action.studentStatusResponse,
      };
    case ADMIN.updateVerificationStatus:
      return {
        ...state,
        updateVerificationResponse: action.updateVerificationResponse,
      };
    case ADMIN.updateEducationalData:
      return {
        ...state,
        updateEducationalonalResponse: action.updateEducationalonalResponse,
      };
    case ADMIN.updateContactData:
      return {
        ...state,
        contactDataResponse: action.contactDataResponse,
      };
    case ADMIN.updateAccountStatus:
      return {
        ...state,
        updateAccStatusResponse: action.updateAccStatusResponse,
      };
    case ADMIN.updateAspirationData:
      return {
        ...state,
        updateAspirationResponse: action.payload,
      };
    default:
      break;
  }
  return state;
};
