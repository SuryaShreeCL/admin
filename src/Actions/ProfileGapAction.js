import {PROFILE_GAP_ANALYSIS} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const getgeneraldetails=(studentId,productId,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/generaldetails",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.getgeneraldetails,payload:result.data})
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}
export const getstatus=(studentId,productId,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/dataverification",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.getstatus,payload:result.data})
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}
export const getcommenthistory=(studentId,productId,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/datachangelog",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.getstatus,payload:result.data})
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}
export const updatestatus=(studentId,productId,data,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/dataverification",data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.updatestatus,payload:result.data})
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}
export const updategeneraldetails=(studentId,productId,data,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/generaldetails",data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {  
                callback(result)   
                dispatch({type:PROFILE_GAP_ANALYSIS.updategeneraldetails,payload:result.data})
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}
// ppgaCallNotes
export const getPpgaCallNotes=(studentId,productId,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/ppgacallnotes",{
            crossDomain: true,
            headers : {
                "Authorization" :` Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.getPpgaCallNotes,payload:result.data})
            })
            .catch(error => {
                // callback(error.message)
                console.log(error);
            });
    }
}

export const getTestResults=(studentId,productId,callback)=>{    
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/testscore",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {     
                callback(result)           
                dispatch({type:PROFILE_GAP_ANALYSIS.getTestResults,payload:result.data})
            })
            .catch(error => {
                // callback(error.message)
                console.log(error);
            });
    }
}