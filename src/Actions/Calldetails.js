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