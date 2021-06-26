import {STUDENT} from '../Redux/Action'
import {URL,AUTH_URL} from './URL'
import axios from 'axios'

export const getStudents=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/get/all/students", {
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:STUDENT.getStudent,StudentList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }    
}

export const getStudentPaginate=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/students/search?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:STUDENT.getStudentPaginate,StudentFilterResult:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getStudentsById=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/students/"+id, {
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:STUDENT.getStudentById,StudentList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }    
}

export const postStudents=(data)=>{
    
    return dispatch => {
        axios.post(URL+"/api/v1/students",data, {
            crossDomain: true
        })
            .then(result => {
                sessionStorage.setItem('studentId',JSON.stringify(result.data.id));
                dispatch({type:STUDENT.postStudent,StudentList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const studentCollegeInformation=(data)=>{
    return  dispatch => {
        axios.put(URL+"/api/v1/students/CollegeInfo",data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:STUDENT.studentCollegeInformation,CollegeInfo:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const postQuestions=(data)=>{
    return dispatch =>{
        axios.put(URL+"/api/v1/students/testExecutions/answers",data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:STUDENT.postQuestion,QustionList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const studentFeedback=(data)=>{
    return dispatch =>{
        axios.post(URL+"/api/v1/feedback",data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:STUDENT.studentFeedback,StudentFeedback:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const startTestExecution=(studentId)=>{
    return dispatch =>{
        axios.post(URL+"/api/v1/students/testExecutions?studentId="+studentId+"&questionSetName=RecEenginePersonalityBasedSurvey", {
            crossDomain: true
        })
            .then(result => {
                sessionStorage.setItem('TestExecutionId',JSON.stringify(result.data.id))
                dispatch({type:STUDENT.startTestExecution,TestExecution:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const careerInterestSurvey=(id)=>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/careerInterestSurvey?testExecutionId="+id, {
            crossDomain: true
        })
            .then(result => {                
                dispatch({type:STUDENT.careerInterestSurvey,CareerInterestSurvey:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getAnswer=(testId,questionId)=>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/testExecutions/answers?testExecutionId="+testId+"&questionId="+questionId,{
            crossDomain: true
        })
            .then(result => {                                                
                dispatch({type:STUDENT.getAnswer,Answer:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getDocumentsByStudentId=(studentId)=>{
    return dispatch =>{
        axios.get(URL+"/api/v1/files/get/"+studentId,{
            crossDomain: true
        })
            .then(result => {                                                
                dispatch({type:STUDENT.viewDocumet,studentDocumentList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const downloadDocumentByStudentId=(fileName)=>{
    return dispatch =>{
        axios.get(URL+"api/v1/files/download/"+fileName,{
            crossDomain: true
        })
            .then(result => {                                                
                dispatch({type:STUDENT.downloadDocument,downloadedDocumentResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteStudentFileById=(id,path)=>{    
    return dispatch =>{
        axios.delete(URL+"/api/v1/files/delete/"+id+"/"+path,{
            crossDomain: true
        })
            .then(result => {                                                
                dispatch({type:STUDENT.deleteDocument,deletedFileResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const editDocumentsByStudentId=(studentId,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.post(URL+"/api/v1/files/upload/"+studentId,data,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {                                                
                dispatch({type:STUDENT.editDocument,editDocumentResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}



export const mernStudentSignUp=(data)=>{    
    // let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch=>{                
        console.log(data)
        axios.post(AUTH_URL+"/api/v1/auth/signup",data,{crossDomain:true,
            // headers : {
            //     "admin" : "yes",
            //     "Authorization" : `Bearer ${accessToken}`
            // }
        })                
        .then(result => {                                                               
            dispatch({type:STUDENT.mernStudentSignUp,signUpResponse:result.data})
        })
        .catch(error=>{
            console.log(error)
            // console.log(error.response.data);
                dispatch({type:STUDENT.catchSignUpError,signUpError:error.response.data})
            
        })
    }
}

export const mernStudentEdit=(id,data)=>{  
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch=>{                
        console.log(data)
        axios.put(AUTH_URL+"/api/v1/auth/students/"+id,data,{crossDomain:true,
        headers : {
            "x-access-token" : accessToken
        }
        })                
        .then(result => {                                                               
            dispatch({type:STUDENT.mernStudentEdit,editStudentResponse:result.data})
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getBlackListedUser=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/students/searchblacklisted?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:STUDENT.getBlackListedUser,blackListedUserDetails:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getWhiteListedUser=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/students/searchwhitelisted?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:STUDENT.getWhiteListedUser,whiteListedUserDetails:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getManualUser=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/students/searchmanualnusers?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:STUDENT.getManualUser,manualUserDetails:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getMernUser=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/students/searchmernusers?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:STUDENT.getMernUser,mernUserDetails:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const viewAllCities = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/cities")
        .then(result=>{
            dispatch({type:STUDENT.viewAllCity,cityList:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAspirationByStudentId = (id) =>{
    return dispatch =>{
        axios.get(URL+"/aspiration/get/"+id)
        .then(result=>{
            dispatch({type:STUDENT.getAspirationById,aspirationDetails:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


export const getTempPersonalData = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/viewPersonalDetails")
        .then(result=>{
            dispatch({type:STUDENT.getTempPersonalData,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const verifyNewPersonalData = (id,data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/student/"+id+"/personalDetails",data)
        .then(result=>{
            dispatch({type:STUDENT.verifyNewPersonalData, payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getUserDataAcademicInfo = (id,type) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/student/educationDetails/"+id+"/type?type=ug")
        .then(result=>{
            dispatch({type:STUDENT.getUserDataAcademicInfo,payload:result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const updateUserData=(data)=>{
    return dispatch =>{
        axios.put(URL+"/api/v1/update/userData/ug",data, {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:STUDENT.updateUserData,QustionList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}