import axios from "axios"
import { URL } from "../Actions/URL"

export const getStudentPgaByGrade = async (studentId, grade) => {
    try {
        const response = axios.get(URL+"/api/v1/students/"+studentId+"/pga?grade="+grade)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


export const getSimilarStudentsByYear = async (studentId, grade, year) => {
    try {
        const response = axios.get(URL+"/api/v1/students/"+studentId+"/pga/similarStudent?grade="+grade+"&year="+year)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const submitPga = async (studentId, grade,data) => {
    try {
        const response = axios.put(URL+"/api/v1/students/"+studentId+"/pga?grade="+grade,data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteSubjectDetailsById = async (studentId, subjectDetailId) =>{
    try {
        const response = axios.delete(URL+"/api/v1/students/"+studentId+"/pga/subjectDetails/"+subjectDetailId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}