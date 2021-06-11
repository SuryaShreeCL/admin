import axios from "axios"
import { PGA } from "../Redux/Action"
import { URL } from "./URL"



export const getPgaScores = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/pgaTestResults")
        .then(result=>{
            dispatch({type : PGA.getScoreDetails, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getCareerInterest = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/areaOfInterest/"+id)
        .then(result=>{
            dispatch({type : PGA.getCareerInterest, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postPgaAcademicData = (id,data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/students/"+id+"/save/pgaacademicdetails",data)
        .then(result=>{
            dispatch({type : PGA.postAcademicData, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPgaAcademicData = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/getpgaAcademicdata")
        .then(result=>{
            dispatch({type : PGA.getPgaAcademicData, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getChoosenTrackById = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+id+"/citquestion")
        .then(result=>{
            dispatch({type : PGA.getChoosenTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postGenralDetails = (id,data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/save/pgageneraldetails", data)
        .then(result=>{
            dispatch({type : PGA.postGenralDetails, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAllEnrollmentPerid = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/enrollment/period")
        .then(result=>{
            dispatch({type : PGA.getAllEnrollmentPeriod, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getQuarterPlanByType = (id,type) =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/quarter/plan?grade="+type)
        .then(result=>{
            dispatch({type : PGA.getQuarterPlanByType, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


export const getAllStarterPack = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/quarterPlan/careerTrack")
        .then(result=>{
            dispatch({type : PGA.getAllStarterPack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPackageByStudentId = (id) =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/product")
        .then(result=>{
            dispatch({type : PGA.getPackageByStudentId, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getQuarterPlan = (id) =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/"+id+"/quarter/plan/comment")
        .then(result=>{
            dispatch({type : PGA.getQuarterPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getppgaques = () => {
    return dispatch=>{
        axios.get(URL+"/api/v1/ppgaQuestions" )
        .then(result=>{
            dispatch({type : PGA.getppgaques, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getcvques = () => {
    return dispatch=>{
        axios.get(URL+"/api/v1/cvFactors" )
        .then(result=>{
            dispatch({type : PGA.getcvques, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const postcvandppga = (id,data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/save/cvandppga",data)
        .then(result=>{
            dispatch({type : PGA.postcvandppga, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getcvandppga = (id) => {
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/cvandppga/"+id )
        .then(result=>{
            dispatch({type : PGA.getcvandppga, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAllQuarterPlan = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/quarterplancourse")
        .then(result=>{
            dispatch({type : PGA.getAllQuarterPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postCommentsAndPoints = (data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/create/quarter/plan/comment",data)
        .then(result=>{
            dispatch({type : PGA.postCommentsAndPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getAdditionalPoints = (id) =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/get/"+id+"/quarter/plan/comments/additionalpoints")
        .then(result=>{
            dispatch({type : PGA.getAdditionalPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const postAdditionalPoints = (id,data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarter/plan/comments/additionalpoints",data)
        .then(result=>{
            dispatch({type : PGA.postAditionalPoints, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getPbChoosenTrack = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/chosenTrack")
        .then(result=>{
            dispatch({type : PGA.getPbChoosenTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const getStudentGrade = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/grade")
        .then(result=>{
            dispatch({type : PGA.getStudentGrade, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }  
}

export const getAllSpecialization=()=>{
    return dispatch=>{
        axios.get(URL+"/api/v1/students/specialization/getAll")
        .then(result=>{
            dispatch({type : PGA.getAllSpecialization, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


export const postPgaPlanCareerTrack = (id,data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarterPlan/careerTrack",data)
        .then(result=>{
            dispatch({type : PGA.postPgaPlanCareerTrack, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const postPGaQuarter = (id,data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/students/"+id+"/quarter/plan/update",data)
        .then(result=>{
            dispatch({type : PGA.postQuarterPgaPlan, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const getallcourse = () =>{
    return dispatch=>{
        axios.get(URL+"/api/v1/get/allcourses")
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
        axios.post(URL+"/api/v1/create/enrolledcourse",data)
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
    return dispatch=>{
        axios.get(URL+"/api/v1/get/enrolled/course/"+id)
        .then(result=>{
            dispatch({type : PGA.getenroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export const unenroll = (data) =>{
    return dispatch=>{
        axios.post(URL+"/api/v1/create/unenrolledcourse",data)
        .then(result=>{
            dispatch({type : PGA.unenroll, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}


