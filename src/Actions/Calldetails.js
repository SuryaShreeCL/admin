import { CALL_DETAILS } from '../Redux/Action'
import axios from 'axios'
import { URL } from './URL'

export const updateclientdetails = (studentId, productId, data) => {
    return dispatch => {
        axios.put(URL + "/api/v1/student/onboardingcallsummary/" + studentId + "/" + productId, data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.updateclientdetails, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getClientInfo = (studentId,productId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/clientDetails/" + studentId + "/" + productId)
        .then(result=>{
            dispatch({type:CALL_DETAILS.getClientInfo,payload:result.data})
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const updateQuestions = (studentId, productId, data) => {
    return dispatch => {
        axios.put(URL + "/api/v1/student/onboardingcallQuestions/" + studentId + "/" + productId, data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.updateQuestions, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

}

export const updateRating = (studentId, productId, data) => {
    return dispatch => {
        axios.put(URL + "/api/v1/student/onboardingcallRating/" + studentId + "/" + productId, data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.updateRating, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

}

export const updatePersonalInfo = (studentId, data) => {
    return dispatch => {
        axios.put(URL + "/api/v1/student/personalDetails/" + studentId + "/" , data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.updatePersonalInfo, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

}
export const updateworkexp = (studentId, data) => {
    return dispatch => {
        axios.put(URL + "/api/v1/students/"+studentId+"/experience" , data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.updateworkexp, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

}
export const getworkexp = (studentId) => {
    return dispatch => {
        axios.get(URL + "/api/v1/get/student/"+studentId+"/experience" , {
            crossDomain: true
        })
            .then(result => {
                dispatch({ type: CALL_DETAILS.getworkexp, payload: result.data })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getPersonalInfo = (studentId,productId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/clientDetails/" + studentId + "/" + productId,)
        .then(result=>{
            dispatch({type:CALL_DETAILS.getPersonalInfo,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPincodeDetails = (pincode, callback) =>{
    return dispatch =>{
        axios.get("https://api.postalpincode.in/pincode/"+ pincode)
        .then(result=>{
          callback(result.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAspirationDetails = (studentId) =>{
    return dispatch =>{
        axios.get(URL+"api/v1/students/"+studentId+"/testExecutions?questionSetName=RecEenginePersonalityBasedSurvey")
        .then(result=>{
            dispatch({type:CALL_DETAILS.getAspirationDetails,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getgrescore = (studentId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/gre/"+studentId)
        .then(result=>{
            dispatch({type:CALL_DETAILS.getgrescore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getgmatscore = (studentId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/gmat/"+studentId)
        .then(result=>{
            dispatch({type:CALL_DETAILS.getgmatscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const gettoeflscore = (studentId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/tofel/"+studentId)
        .then(result=>{
            dispatch({type:CALL_DETAILS.gettoeflscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getieltsscore = (studentId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+studentId+"/graduate/ielts")
        .then(result=>{
            dispatch({type:CALL_DETAILS.getieltsscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const updategrescore = (greid,data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/gre/"+greid,data)
        .then(result=>{
            dispatch({type:CALL_DETAILS.updategrescore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const updategmatscore = (gmatid,data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/gmat/update/"+gmatid,data)
        .then(result=>{
            dispatch({type:CALL_DETAILS.updategmatscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const updatetoeflscore = (toeflid,data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/tofel/"+toeflid,data)
        .then(result=>{
            dispatch({type:CALL_DETAILS.updatetoeflscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const updateieltsscore = (ieltsid,data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/students/"+ieltsid+"/graduate/ielts",data)
        .then(result=>{
            dispatch({type:CALL_DETAILS.updateieltsscore,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const downloadGAT = (studentId,filename) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/files/download/"+studentId+"/"+filename)
        .then(result=>{
            dispatch({type:CALL_DETAILS.downloadGAT,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const fileuploadGAT = (studentId,examtype,examid,data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/files/fileUpload/"+studentId+"/"+examtype+"/"+examid,data)
        .then(result=>{
            dispatch({type:CALL_DETAILS.fileuploadGAT,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const completecall = (studentId,productId) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/student/onboardingcallsummary/status/"+studentId+"/"+productId)
        .then(result=>{
            dispatch({type:CALL_DETAILS.completecall,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}