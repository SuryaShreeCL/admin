import {MENTORSCHEDULELIST} from '../Redux/Action'
const initialState ={
  viewscheduleList:[],
  getstudentMapping:[],
  getproductdetails:[],
  updateallocatementor:[]
}

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
    default:
      break;
  }
  return state;
};
