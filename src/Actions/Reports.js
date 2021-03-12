import {REPORTS} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewTermsAndConReports = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/tnc",{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:REPORTS.viewTermsAndConReport,termsAndConReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const viewCvReport = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/reports/cvratings",{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:REPORTS.viewCvReport,cvReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const viewMarkSheetReport = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/marksheet",{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:REPORTS.viewMarksheetReport,markSheetReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const viewMydetailsReport = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/mydetails",{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:REPORTS.viewMyDetailsReport,myDetailsReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}