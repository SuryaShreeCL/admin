import {NOTIFICATION} from '../Redux/Action'
const initialState = {
    viewNotificationList : []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case NOTIFICATION.viewNotification:
			return {
				...state,
                viewNotificationList:action.viewNotificationList,
            }
          
		default:
			break
	}
	return state
}