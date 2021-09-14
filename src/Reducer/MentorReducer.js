import { MENTORSCHEDULELIST } from "../Redux/Action";
const initialState = {
  viewscheduleList: [],
  getstudentMapping: [],
  getproductdetails: [],
  updateallocatementor: [],
  addmentor: [],
  updatementor: [],
  getmentor: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENTORSCHEDULELIST.viewSchedule:
      return {
        ...state,
        viewscheduleList: action.viewscheduleList,
      };
    case MENTORSCHEDULELIST.getstudentMapping:
      return {
        ...state,
        getstudentMapping: action.payload,
      };
    case MENTORSCHEDULELIST.getproductdetails:
      return {
        ...state,
        getproductdetails: action.payload,
      };
    case MENTORSCHEDULELIST.updateallocatementor:
      return {
        ...state,
        updateallocatementor: action.payload,
      };
    case MENTORSCHEDULELIST.addmentor:
      return {
        ...state,
        addmentor: action.payload,
      };
    case MENTORSCHEDULELIST.updatementor:
      return {
        ...state,
        updatementor: action.payload,
      };
    case MENTORSCHEDULELIST.getmentor:
      return {
        ...state,
        getmentor: action.payload,
      };
    default:
      break;
  }
  return state;
};
