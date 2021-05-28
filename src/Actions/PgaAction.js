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
export const getPgaCvAndPpga = (id) =>{
    return dispatch =>{
        // axios.get(URL+"/api/v1/students/get/cvandppga/"+id)
        axios.get(URL+"/api/v1/ppgaQuestions")

        .then(result=>{
            dispatch({type : PGA.getPgaCvAndPpga, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getppgaques = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/students/get/cvandppga/"+id)
        .then(result=>{
            dispatch({type : PGA.getppgaques, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
// export const postPgaCvAndPpga = (id,data) =>{
//     return dispatch=>{
//         axios.post(URL+"api/v1/students/"+id+"/save/cvandppga", data)
//         .then(result=>{
//             dispatch({type : PGA.postPgaCvAndPpga, payload : result.data})
//         })
//         .catch(error=>{
//             console.log(error)
//         })
//     }
// }

