
import { HELPER } from '../Redux/Action'

export const storeItInState=(data)=>{
    return dispatch => {
       dispatch({type : HELPER.storeItInState, payload : data})
    }
}