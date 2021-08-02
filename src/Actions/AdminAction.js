import {ADMIN} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const adminLogin=(data)=>{
    // let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch => {
        axios
          .put(URL + '/api/v1/students/validateAdmin', data, {
            crossDomain: true,
            // headers : {
            //     "admin" : "yes",
            //     "Authorization" : `Bearer ${accessToken}`
            // }
          })
          .then((result) => {
            console.log(result);
            dispatch({ type: ADMIN.adminLogin, adminLoginDetails: result.data });
            axios
              .get(URL + `/api/v1/adminusers/${result.data.AdminUsers}`, {
                crossDomain: true,
              })
              .then((res) => {
                window.sessionStorage.setItem('department', res.data.department);
              });
          })
          .catch((error) => {
            // dispatch({type:ADMIN.adminLogin,adminLoginDetails:error.response.data})
            console.log(error);
          });
    }
    
}

export const toRefreshToken=(data)=>{
    let refreshToken = window.sessionStorage.getItem("refreshToken")
    return dispatch => {
        axios.get(URL+"/api/v1/refresh/token",{
            crossDomain: true,
        headers : {
            "x-refresh-token" : refreshToken,
            "admin" : "yes"
        }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.refreshToken,refreshTokenDetails:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const postStudentAccess=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/students/unifiedAccess",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.studentAccess,studentAccessResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateStudentPersonal=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch => {
        axios.put(URL+"/api/v1/student/"+id+"/personalDetails",data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updatePersonalData,updatePersonalResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateStudentEducation=(id,data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/student/"+id+"/educationaldetails",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateEducationalData,updateEducationalonalResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateStudentContact=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch => {
        axios.put(URL+"/api/v1/student/"+id+"/contactDetails",data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateContactData,contactDataResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateAccountStatus=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch => {
        axios.put(URL+"/api/v1/student/"+id+"/accountstatus",data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateAccountStatus,updateAccStatusResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateInternAccess = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch =>{
        axios.put(URL+"/api/v1/students/olduser/"+id+"/"+data,{},{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.giveInternAccess,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

export const updateLmsAccess = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch =>{
        axios.put(URL+"/api/v1/student/"+id+"/accountstatus",data,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateLmsAccess,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}


export const updateAspirationData=(id,data)=>{
    return dispatch => {
        axios.put(URL+"/aspiration/update/"+id,data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateAspirationData,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}



export const viewStudentStatus=(id)=>{
    return dispatch => {
        axios.get(URL+"/api/v1/studentVerification/view/"+id,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.viewStudentStatus,studentStatusResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}


export const updateVerificationStatus=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")  

    return dispatch => {
        axios.put(URL+"/api/v1/studentVerification/update",data,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            },
            crossDomain: true
        })
            .then(result => {
                callback(result)
                dispatch({type:ADMIN.updateVerificationStatus,updateVerificationResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const getAllMentors = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/mentors")
        .then(result=>{
            dispatch({type : ADMIN.getAllMentor, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 

export const allocateMentor = (mentorId,studentId) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/student/mentor/"+studentId+"/"+mentorId)
        .then(result=>{
            dispatch({type : ADMIN.alocateMentor, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

// For Getting List of users based on admin user Id

export const getAwaitingUsersByAdminId = () =>{
  let adminUserId = window.sessionStorage.getItem("adminUserId")
  let product = JSON.parse(window.sessionStorage.getItem("adminLinkedProduct")) 
  let productid = product.products[0].id
  console.log(productid)
    return dispatch =>{
        axios.get(URL+"/api/v1/product/"+productid+"/admin/"+adminUserId+"/search?page=0&size=20&q=")
        .then(result=>{
            dispatch({type : ADMIN.getAwaitingUsersByAdminId, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 

// TO Activate Student Product

export const activateStudentProduct = (data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    let id = window.sessionStorage.getItem("adminUserId")
    return dispatch =>{
        axios.put(URL+"/api/v1/product/activate/"+id,data,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            },
        })
        .then(result=>{
            dispatch({type : ADMIN.activateStudentProduct, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

// To get admin linked product

export const getAdminLinkedProduct = () =>{
    let id = window.sessionStorage.getItem("adminUserId")
    return dispatch =>{
        axios.get(URL+"/api/v1/adminusers/"+id)
        .then(result=>{
            window.sessionStorage.setItem("adminDetails", JSON.stringify(result.data))
            dispatch({type : ADMIN.getAdminLinkedProduct, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 

export const checkTokenStatus = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/token/status",{
            headers : {
                jwt : accessToken
            }
        })
        .then(result=>{
            dispatch({type : ADMIN.checkTokenStatus, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 

// To get students by stagess

export const getStudentByStages = (stageName) =>{
    let id = window.sessionStorage.getItem("adminUserId")
    return dispatch =>{
        axios.get(URL+"/api/v1/onBoarding/stage/"+id+"?stage="+stageName)
        .then(result=>{
            dispatch({type : ADMIN.getStudentsByStages, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 

// To get all admin users


export const getAllAdminUsers = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/adminUsers")
        .then(result=>{
            dispatch({type : ADMIN.getAllAdminUsers, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
} 
