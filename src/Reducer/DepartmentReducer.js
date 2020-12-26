import {DEPARTMENT} from '../Redux/Action'
const initialState = {
    addDepartment:[],
    updateDepartment : [],
    deleteDepartment : [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case DEPARTMENT.addDepartment:
			return {
				...state,
                addDepartment:action.addDepartment,
            }
            case DEPARTMENT.updateDepartment:
                return {
                    ...state,
                    updateDepartment : action.updateDepartment
                }
                case DEPARTMENT.deleteDepartment:
                    return {
                        ...state,
                        deleteDepartment : action.deleteDepartment
                    }
		default:
			break
	}
	return state
}