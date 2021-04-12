import {MENTORSCHEDULELIST} from '../Redux/Action'
const initialState ={
  viewscheduleList:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
 case MENTORSCHEDULELIST.viewSchedule:
    return {
      ...state,
      viewscheduleList: action.viewscheduleList,
    };
    default:
      break;
  }
  return state;
};
