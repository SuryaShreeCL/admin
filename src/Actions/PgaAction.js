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

export const postPgaAcademicData = () =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/students/save/pgaacademicdetails")
        .then(result=>{
            dispatch({type : PGA.postAcademicData, payload : result.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}