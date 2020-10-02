import {CHOICE_ANSWER} from  '../Redux/Action'

const initialState={
    ChoiceAnswer:[],
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case CHOICE_ANSWER.getChoiceAnswer :
            return{
                ...state,
                ChoiceAnswer:action.ChoiceAnswer,
            };                
        default:
            return state;            
    }
    return state;
}