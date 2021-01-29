import {PRODUCT} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewProduct = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/product/view")
        .then(result=>{
            dispatch({type:PRODUCT.viewProduct,viewProductList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addProduct=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/product/create",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: PRODUCT.addProduct,addProduct:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateProduct=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/product/update",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:PRODUCT.editProduct,editProduct:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteProduct=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/product/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:PRODUCT.deleteProduct,deleteProduct:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addProductToStudent=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/product",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: PRODUCT.addProductToStudent,addProductToStudent:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const viewProductToStudent = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/product/get/"+id)
        .then(result=>{
            dispatch({type:PRODUCT.viewProductToStudent,viewProductToStudentList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}