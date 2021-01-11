import { QUESTIONSET } from "../Redux/Action";
const initialState = {
	viewQuestionSetList:[],
	addQuestionSet : [],
	updateQuestionSet : [],
	deleteQuestionSet : [],
	viewQuestionList:[],
	addQuestion : [],
	updateQuestion : [],
	deleteQuestion : [],
	viewChoiceList:[],
	addChoice : [],
	updateChoice : [],
	deleteChoice : [],
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
			case QUESTIONSET.viewQuestion:
				return {
					...state,
					viewQuestionList:action.viewQuestionList,
				}
				case QUESTIONSET.addQuestion:
					return {
						...state,
						addQuestion:action.addQuestion,
					}
					case QUESTIONSET.updateQuestion:
				return {
					...state,
					updateQuestion:action.updateQuestion,
				}
				case QUESTIONSET.deleteQuestion:
				return {
					...state,
					deleteQuestion:action.deleteQuestion,
				}
				case QUESTIONSET.viewChoice:
					return {
						...state,
						viewChoiceList:action.viewChoiceList,
					}
					case QUESTIONSET.addChoice:
						return {
							...state,
							addChoice:action.addChoice,
						}
						case QUESTIONSET.updateChoice:
					return {
						...state,
						updateChoice:action.updateChoice,
					}
					case QUESTIONSET.deleteChoice:
					return {
						...state,
						deleteChoice:action.deleteChoice,
					}
		default:
			break
	}
	return state
}