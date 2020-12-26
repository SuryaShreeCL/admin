import { QUESTIONSET } from "../Redux/Action";
const initialState = {
	viewQuestionSetList:[],
	addQuestionSet : [],
	updateQuestionSet : [],
	deleteQuestionSet : [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case QUESTIONSET.viewQuestionSet:
			return {
				...state,
                viewQuestionSetList:action.viewQuestionSetList,
            }
			case QUESTIONSET.addQuestionSet:
				return {
					...state,
					addQuestionSet:action.addQuestionSet,
				}
				case QUESTIONSET.updateQuestionSet:
			return {
				...state,
                updateQuestionSet:action.updateQuestionSet,
			}
			case QUESTIONSET.deleteQuestionSet:
			return {
				...state,
                deleteQuestionSet:action.deleteQuestionSet,
            }
		default:
			break
	}
	return state
}