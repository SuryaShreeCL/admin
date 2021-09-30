import axios from "axios"
import { URL } from "../Actions/URL"

export const getStudentTenth = async (studentId, grade) => {
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

export const submitTenthPga = async (studentId, grade) => {
    try {
        const response = axios.put(URL+"/api/v1/students/"+studentId+"/pga?grade="+grade)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}
