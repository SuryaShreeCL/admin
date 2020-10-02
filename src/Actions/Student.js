import {STUDENT} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

// export const getStudents=()=>{
//     return dispatch => {
//         axios.get("http://localhost:8080/api/v1/students", {
//             crossDomain: true
//         })
//             .then(result => {
//                 dispatch({type:STUDENT.getStudent,StudentList:result.data})
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
    
// }



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