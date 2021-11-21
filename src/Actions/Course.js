import {COURSES} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'
import { data } from 'jquery'


export const addCourses=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.post(URL+"/api/v1/courses", data ,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COURSES.AddCourse,addCourses:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getCourses=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/courses", {
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COURSES.GetCourses,courseList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getCoursesById=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/courses/"+id, {
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COURSES.GetCourseById,courseList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const updateCourse=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/course",data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COURSES.UpdateCourse,updateCourse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// Selva

export const deleteCourse=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.delete(URL+"/api/v1/courses/"+id,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COURSES.deleteCourse,deleteCourse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getRecommendedCourses=(TestId,studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

   return dispatch =>{
    axios.get(URL+"/api/v1/students/recommendedandsimilar/courses?studentId="+ studentId +"&testExecutionId="+TestId, {
        crossDomain: true,
        headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
    })
        .then(result => {
            dispatch({type:COURSES.GetRecommendedCouses,recommendedCourseList:result.data})
        })
        .catch(error => {
            console.log(error);
        });
   }
}

export const getPopularCourses=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch =>{
     axios.get(URL+"/api/v1/students/courses/popular", {
         crossDomain: true,
         headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetPopularCourses,popularCourseList:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 export const getSimilarCourses=(studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch =>{
     axios.get(URL+"/api/v1/students/courses/branch?studentId="+studentId, {
         crossDomain: true,
         headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetSimilarCourses,similarCourseList:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }
 
 export const getMarkettingRecommended=(studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
     axios.get(URL+'/api/v1/students/'+ studentId +'/RunRecommendationEngine?type=marketing', {
         crossDomain: true,
         headers : {
            "admin" : "yes",
            "Authorization" : `Bearer ${accessToken}`
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetMarkettingRecommended,MarkettingRecommended:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 export const getServiceRecommended=(studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
     axios.get(URL+'/api/v1/students/'+ studentId +'/RunRecommendationEngine?type=service', {
         crossDomain: true,
         headers : {
            "admin" : "yes",
            "Authorization" : `Bearer ${accessToken}`
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetServiceRecommended,ServiceRecommended:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 // Selva

 export const getPaginateCourse=(pageNumber,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/courses/page/search?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:COURSES.getPaginateCourse,courseFilterResult:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const getDomain = (name,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch =>{
     axios.get(URL+"/api/v1/careerTrackApp/domainType?domainType="+name, {
         crossDomain: true,
         headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
     })
         .then(result => {
             callback(result)
             dispatch({type:COURSES.DomainList,payload:result.data})
         })
         .catch(error => {
             callback(error)
             console.log(error);
         });
    }
 }
 export const getAdvanceCourse = ( courseId,callback )=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch =>{
     axios.get(URL+"/api/v1/courseVariant/course/"+courseId, {
         crossDomain: true,
         headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
     })
         .then(result => {
             callback(result)
             dispatch({type:COURSES.AdvanceCourse,payload:result.data})
         })
         .catch(error => {
             console.log(error);
             callback(error)
         });
    }
 }
 export const getProductVarient = ()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch =>{
     axios.get(URL+"/api/v1/product/productVariant", {
         crossDomain: true,
         headers : {
            "Authorization" : `Bearer ${accessToken}`,
            admin : "yes"
        }
     })
         .then(result => {
             dispatch({type:COURSES.ProductVariant,payload:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

// students/{studentId}/RunRecommendationEngine?type=marketing/service