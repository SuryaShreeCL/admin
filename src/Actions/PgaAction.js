import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid"
import axios from "axios"
import { PGA } from "../Redux/Action"
import { URL } from "./URL"



export const getPgaScores = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/pgaTestResults",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getScoreDetails, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getCareerInterest = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
        axios.get(URL+"/api/v1/students/areaOfInterest/"+id,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getCareerInterest, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postPgaAcademicData = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
       axios.post(URL+"/api/v1/students/"+id+"/save/pgaacademicdetails",data,{
        crossDomain: true,
        headers:{
            "admin" : "yes",
            "Authorization" : `Bearer ${accessToken}`
        }
       })
        .then(result=>{
            dispatch({type : PGA.postAcademicData, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPgaAcademicData = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/getpgaAcademicdata",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getPgaAcademicData, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getChoosenTrackById = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/citquestion",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getChoosenTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postGenralDetails = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/save/pgageneraldetails",data,{
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
           })
        .then(result=>{
            dispatch({type : PGA.postGenralDetails, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAllEnrollmentPerid = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/enrollment/period",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAllEnrollmentPeriod, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getQuarterPlanByType = (id,type) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/quarter/plan?grade="+type,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getQuarterPlanByType, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


export const getAllStarterPack = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/quarterPlan/careerTrack",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAllStarterPack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPackageByStudentId = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/product",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getPackageByStudentId, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getQuarterPlan = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/quarter/plan/comment",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getQuarterPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getppgaques = () => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/ppgaQuestions",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getppgaques, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getcvques = () => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/cvFactors",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getcvques, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const postcvandppga = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/save/cvandppga",data,{
            crossDomain: true,           
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.postcvandppga, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getcvandppga = (id) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/cvandppga/"+id,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getcvandppga, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAllQuarterPlan = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/quarterplancourse",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAllQuarterPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postCommentsAndPoints = (data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/create/quarter/plan/comment",data,{
            crossDomain: true,           
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.postCommentsAndPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAdditionalPoints = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/"+id+"/quarter/plan/comments/additionalpoints",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAdditionalPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const postAdditionalPoints = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarter/plan/comments/additionalpoints",data,{
            crossDomain: true,           
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.postAditionalPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPbChoosenTrack = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/chosenTrack",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getPbChoosenTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const getStudentGrade = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/grade",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getStudentGrade, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const getAllSpecialization=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/students/specialization/getAll",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAllSpecialization, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


export const postPgaPlanCareerTrack = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarterPlan/careerTrack",data,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.postPgaPlanCareerTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postPGaQuarter = (id,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarter/plan/update",data,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.postQuarterPgaPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getallcourse = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        
        axios.get(URL+"/api/v1/get/allcourses",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getallcourse, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const newenroll = (data) =>{
    return dispatch=>{
        let accessToken = window.sessionStorage.getItem("accessToken");
        axios.post(URL+"/api/v1/create/enrolledcourse",data,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.newenroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

// http://localhost:8080/api/v1/get/enrolled/course/6ef44156-fd06-4e22-9e9b-9b122bbccc6a

export const getenroll = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/get/enrolled/course/"+id,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getenroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAllEnroll = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/get/all/enrolled/course",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getAllEnroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getFilteredCourseEnroll = (id) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/get/courses/"+id,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getFilteredCourseForEnroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const clearNewEnroll = () =>{
    return dispatch=>{
        dispatch({type : PGA.clearNewEnroll})
    }
}

export const clearUnEnroll = () =>{
    return dispatch=>{
        dispatch({type : PGA.clearUnEnroll})
    }
}


export const unenroll = (data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/create/unenrolledcourse",data,{
            crossDomain: true,           
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.unenroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const uploadfile = (studentid,productid,name,filename,data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.post(URL+"/api/v1/student/pgaUpload/"+studentid+"/"+productid+"/"+name+"/"+filename,data,{
            crossDomain: true,           
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.uploadfile, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getallfiles = (studentid) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    let product = JSON.parse(window.sessionStorage.getItem("adminLinkedProduct"))
    let productid = product.products[0].id
    console.log(productid)
    return dispatch=>{
        axios.get(URL+"/api/v1/student/pgaReport/"+studentid+"/"+productid,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.getallfiles, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const deletefiles = (studentid,filename) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.delete(URL+"/api/v1/delete/"+studentid+"/"+filename,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.deletefiles, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const viewfiles = (studentid) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    let product = JSON.parse(window.sessionStorage.getItem("adminLinkedProduct"))
    let productid = product.products[0].id
    console.log(productid)
    return dispatch=>{
        axios.get(URL+"/api/v1/student/pgaReport/"+studentid+"/"+productid,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.viewfiles, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const downlaodfiles = (studentid,filename) =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch=>{
        axios.get(URL+"/api/v1/pgaDownload/"+studentid+"/"+filename,{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type : PGA.downlaodfiles, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
