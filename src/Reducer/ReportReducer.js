import {REPORTS} from '../Redux/Action'
const initialState = {
    termsAndConReport : [],
	cvReport : [],
	markSheetReport : [],
	myDetailsReport : [],
	techTestMechReport : []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case REPORTS.viewTermsAndConReport:
			return {
				...state,
                termsAndConReport:action.termsAndConReport,
            }
			case REPORTS.viewCvReport:
			return {
				...state,
                cvReport:action.cvReport,
            }
			case REPORTS.viewMarksheetReport:
			return {
				...state,
                markSheetReport:action.markSheetReport,
            }
			case REPORTS.viewMyDetailsReport:
				return {
					...state,
					myDetailsReport:action.myDetailsReport,
				}
				case REPORTS.viewTechTestMechReport:
					return {
						...state,
						techTestMechReport:action.techTestMechReport,
					}
		default:
			break
	}
	return state
}