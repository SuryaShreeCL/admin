import {VIDEO} from '../Redux/Action'
const initialState = {
    viewVideoList : [],
    addVideo:[],
    editVideo : [],
    deleteVideo : [],
}

export default (state = initialState, action) => {
	switch (action.type) {
        case VIDEO.viewVideo:
			return {
				...state,
                viewVideoList:action.viewVideoList,
            }
		case VIDEO.addVideo:
			return {
				...state,
                addVideo:action.addVideo,
            }
            case VIDEO.editVideo:
                return {
                    ...state,
                    editVideo : action.editVideo
                }
                case VIDEO.deleteVideo:
                    return {
                        ...state,
                        deleteVideo : action.deleteVideo
                    }
		default:
			break
	}
	return state
}