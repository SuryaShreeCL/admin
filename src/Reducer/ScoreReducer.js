import { SCOREDETAILS } from "../Redux/Action";
const initialState = {
  viewScoreDetailsList:[],
 };

export default (state = initialState, action) => {
  switch (action.type) {
    case SCOREDETAILS.viewScoreDetails:
      return {
        ...state,
        viewScoreDetailsList : action.viewScoreDetailsList,
      }; 
     
    default:
      break;
  }
  return state;
};
