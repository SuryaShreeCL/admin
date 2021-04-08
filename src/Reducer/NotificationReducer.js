import { NOTIFICATION } from "../Redux/Action";
const initialState = {
  viewnotificationList:[],
  addnotificationList:[],
  updatenotificationList:[],
  deletenotificationList:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION.viewNotification:
      return {
        ...state,
        viewnotificationList: action.viewnotificationList,
      };      
      case NOTIFICATION.addNotification:
      return {
        ...state,
        addnotificationList: action.addnotificationList,
      };  
      case NOTIFICATION.updateNotification:
      return {
        ...state,
        updatenotificationList: action.updatenotificationList,
      };  
      case NOTIFICATION.deleteNotification:
        return {
          ...state,
          deletenotificationList: action.deletenotificationList,
        };  
   
    default:
      break;
  }
  return state;
};