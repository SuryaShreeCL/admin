import {QUESTIONS} from '../Redux/Action'
const initialState = {
    QuestionList:[],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case QUESTIONS.getQuestions:
			return {
				...state,
                QuestionList:action.QuestionList,
			}
		default:
			break
	}
	return state
}