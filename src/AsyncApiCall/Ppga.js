import axios from "axios"
import { URL } from "../Actions/URL"

// Get Student PGA By Grade

export const getStudentPgaByGrade = async (studentId, grade) => {
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga?grade="+grade, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// Get Similar Student Details By grade 

export const getSimilarStudentsByGrade = async (studentId, grade, year) => {
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/similarStudent?grade="+grade+year, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// Submit PGA by grade 

export const submitPga = async (studentId, grade,data) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    try {
        const response = await axios.put(URL+"/api/v1/students/"+studentId+"/school/pga?grade="+grade,data, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// To delete subject details by its id 

export const deleteSubjectDetailsById = async (studentId, subjectDetailId) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.delete(URL+"/api/v1/students/"+studentId+"/pga/subjectDetails/"+subjectDetailId,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// To Get Distinct Subject

export const getDistinctSubjects = async (studentId, grade, query) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/distinctSubject?grade="+grade+query, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// To get the populated dropdown values

export const getFilterListForDropDown = async (studentId) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/academicSummary", {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// To get academic summary details

export const getAcademicSummary = async (studentId, grade, subCategory) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/academicSummary?grade="+grade+"&subjectCategory="+subCategory, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// Create Student Backlog Semester Details

export const createBacklogSemDetails = async (studentId, grade, data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.put(URL+"/api/v1/students/"+studentId+"/pga/academicSummary/backlog?grade="+grade,data, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// Delete Student backlog Semester Details

export const deleteStudentBacklogSem = async (backlogSemId) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.delete(URL+"/api/v1/pga/student/backlog/"+backlogSemId,{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


// ug,pg,diploma filter

// similar student
export const getSimilarStudentsByAcademic = async (studentId, grade, year) => {
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/college/similarStudent?grade="+grade+year, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

// distinct student

export const getDistinctSubjectsByAcademic = async (studentId, grade, query) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    try {
        const response = await axios.get(URL+"/api/v1/students/"+studentId+"/pga/college/distinctSubject?grade="+grade+query, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

