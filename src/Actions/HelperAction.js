
import { HELPER } from '../Redux/Action'

export const storeItInState=(data)=>{
    return dispatch => {
       dispatch({type : HELPER.storeItInState, payload : data})
    }
}

export const setPoperAnchorEl = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.setPopperAnchorEl, payload : data})
    }
}

export const setFilterAnchorEl = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.setFilterAnchorEl, payload : data})
    }
}

export const getAcademicType = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.getAcademicType, payload : data})
    }
}
// semester card click function
export const isClickedSem = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.isClickedSem, payload : data})
    }
}
export const saveCopyData = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.saveCopyData, payload : data})
    }
}

export const saveTemplate = (data) =>{
    return dispatch =>{
        dispatch({type : HELPER.saveTemplate, payload : data})
    }
}
