import {CAREER_TRACK} from '../Redux/Action'
const initialState = {
    careerTrackList:[],
    addedCareerTrack : [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CAREER_TRACK.viewCareerTrack:
			return {
				...state,
                careerTrackList:action.careerTrackList,
			}
            case CAREER_TRACK.addCareerTrack:
			return {
				...state,
                addedCareerTrack:action.addedCareerTrack,
			}
		default:
			break
	}
	return state
}