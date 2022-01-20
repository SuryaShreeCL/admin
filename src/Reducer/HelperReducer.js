import { HELPER } from "../Redux/Action";
const initialState = {
  tempState: {},
  academicType: null,
  clickedSem: null,
  popperState: {
    popperAnchorEl: null,
    filterAnchorEl: null,

    filterAnchorEl: null,
  },
  copiedData: "",
  templateData: [],
  addedSchool: null,
  addedCourse: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HELPER.storeItInState:
      return {
        ...state,
        tempState: action.payload,
      };
    case HELPER.setPopperAnchorEl:
      return {
        ...state,
        popperState: {
          popperAnchorEl: action.payload,
        },
      };
    case HELPER.setFilterAnchorEl:
      return {
        ...state,
        popperState: {
          ...state.popperState,
          filterAnchorEl: action.payload,
        },
      };
    case HELPER.getAcademicType:
      return {
        ...state,
        academicType: action.payload,
      };
    case HELPER.isClickedSem:
      return {
        ...state,
        clickedSem: action.payload,
      };

    case HELPER.setFilterAnchorEl:
      return {
        ...state,
        popperState: {
          ...state.popperState,
          filterAnchorEl: action.payload,
        },
      };
    case HELPER.saveCopyData:
      return {
        ...state,
        copiedData: action.payload,
      };
    case HELPER.saveTemplate:
      return {
        ...state,
        templateData: action.payload,
      };
    case HELPER.saveSchool:
      return {
        ...state,
        addedSchool: action.payload,
      };
    case HELPER.saveCourse:
      return {
        ...state,
        addedCourse: action.payload,
      };
    default:
      break;
  }
  return state;
};
