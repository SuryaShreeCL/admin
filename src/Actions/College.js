import {COLLEGES} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const getColleges=(name)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/colleges/search?name="+name,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.getCollege,CollegeList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const getAllColleges=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/colleges",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.getAllColleges,allCollegeList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const addColleges=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.post(URL+"/api/v1/colleges/create",data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.addCollges,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateColleges=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/colleges/update/"+id,data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.updateColleges,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const deleteCollege=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.delete(URL+"/api/v1/colleges/delete/"+id,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.deleteCollege,deleteCollege:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getUniversity=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/university",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                
                dispatch({type:COLLEGES.getUniversity,universityList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const addUniversity=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.post(URL+"/api/v1/university",data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                
                dispatch({type:COLLEGES.addUniversity,addUniversityList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateUniversity=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/university/"+id,data,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                
                dispatch({type:COLLEGES.updateUniversity,updateUniversityList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const deleteUniversity=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.delete(URL+"/api/v1/university/delete/"+id,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.deleteUniversity,deleteUniversity:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getDegree=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/degrees/ug",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                console.log(result);
                console.log(result.data);
                dispatch({type:COLLEGES.getDegrees,degreeList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}
export const getPGDegree=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/degrees/pg",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                console.log(result);
                console.log(result.data);
                dispatch({type:COLLEGES.getPGDegrees,getPGDegrees:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}

export const getPaginateDegree=(page,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/departments/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                               
                dispatch({type:COLLEGES.getPaginateDegree,PaginateDegreeList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}



export const getBranches=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/departments/default",{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                dispatch({type:COLLEGES.getBranches,BranchList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

// Selva

export const getPaginateCollege=(page,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/colleges/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                               
                dispatch({type:COLLEGES.getPaginateCollege,paginateCollegeList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}

export const getPaginateUniversity=(page,size,keyword)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/university/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {                               
                dispatch({type:COLLEGES.getPaginateUniversity,paginateUniversityList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}