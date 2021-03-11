import {REPORTS} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewTermsAndConReports = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/tnc")
        .then(result=>{
            dispatch({type:REPORTS.viewTermsAndConReport,termsAndConReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const viewCvReport = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/reports/cvratings")
        .then(result=>{
            dispatch({type:REPORTS.viewCvReport,cvReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const viewMarkSheetReport = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/marksheet")
        .then(result=>{
            dispatch({type:REPORTS.viewMarksheetReport,markSheetReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const viewMydetailsReport = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/report/mydetails")
        .then(result=>{
            dispatch({type:REPORTS.viewMyDetailsReport,myDetailsReport:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}