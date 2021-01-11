import {COLLEGES} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const getColleges=(name)=>{
    return dispatch => {
        axios.get(URL+"/api/v1/colleges/search?name="+name,{
            crossDomain: true
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
    return dispatch => {
        axios.get(URL+"/api/v1/colleges/",{
            crossDomain: true
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
    return dispatch => {
        axios.post(URL+"/api/v1/colleges/create",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COLLEGES.addCollges,addCollege:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateColleges=(id,data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/colleges/update/"+id,data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COLLEGES.updateColleges,updateColleges:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const deleteCollege=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/colleges/delete/"+id,{
            crossDomain: true
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
    return dispatch => {
        axios.get(URL+"/api/v1/university",{
            crossDomain: true
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
    return dispatch => {
        axios.post(URL+"/api/v1/university",data,{
            crossDomain: true
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
    return dispatch => {
        axios.put(URL+"/api/v1/university/"+id,data,{
            crossDomain: true
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
    return dispatch => {
        axios.delete(URL+"/api/v1/university/delete/"+id,{
            crossDomain: true
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
    return dispatch => {
        axios.get(URL+"/api/v1/degrees",{
            crossDomain: true
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

export const getPaginateDegree=(page,size,keyword)=>{
    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/departments/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true
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
    return dispatch => {
        axios.get(URL+"/api/v1/departments",{
            crossDomain: true
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
    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/colleges/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true
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
    if(keyword===null) keyword=''
    return dispatch => {
        axios.get(URL+"/api/v1/university/page/search?page="+page+"&size="+size+"&q="+keyword,{
            crossDomain: true
        })
            .then(result => {                               
                dispatch({type:COLLEGES.getPaginateUniversity,paginateUniversityList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
        
}