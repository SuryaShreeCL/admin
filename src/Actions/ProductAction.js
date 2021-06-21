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
        axios.post(URL+"/api/v1/student/product/create",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: PRODUCT.addProductToStudent,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const viewProductToStudent = (id) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/student/product/"+id)
        .then(result=>{
            dispatch({type:PRODUCT.viewProductToStudent,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getAllProductFamily = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/productFamily")
        .then(result=>{
            // dispatch({type:PRODUCT.getAllProductFamily,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getProductByFamilyId = (familyId) =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/product/productFamily/"+familyId)
        .then(result=>{
            dispatch({type:PRODUCT.getProductByFamilyId,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const postproductfamily = (data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/create/product/family",data)
        .then(result=>{
            dispatch({type:PRODUCT.postproductfamily,payload:result.data});
        })
            .catch(error=>{
                console.log(error);
            })
        }
    }
export const getProductVarient = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/productvarient")
        .then(result=>{
            dispatch({type:PRODUCT.getProductVarient,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const postProductVarient = (data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/create/product/varient",data)
        .then(result=>{
            dispatch({type:PRODUCT.postProductVarient,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const updateProductVarient=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/update/product/varient",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:PRODUCT.updateProductVarient,updateProductVarient:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getAllProductImages = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/product/images")
        .then(result=>{
            dispatch({type:PRODUCT.getAllProductImages,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}


export const getAllProductVideos = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/product/videos")
        .then(result=>{
            dispatch({type:PRODUCT.getAllProductVideos,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const getAllProductQuesAns = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/get/product/questionAnswer")
        .then(result=>{
            dispatch({type:PRODUCT.getAllProductQuesAns,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const updateproductfamily = (data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/update/product/family",data)
        .then(result=>{
            dispatch({type:PRODUCT.updateproductfamily,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const postProductVideos = (data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/create/product/videos",data)
        .then(result=>{
            dispatch({type:PRODUCT.postProductVideos,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const postvarientimage = (data) =>{
    return dispatch =>{
        axios.post(URL+"/api/v1/create/product/images",data)
        .then(result=>{
            dispatch({type:PRODUCT.postvarientimage,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const updateProductVideos=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/update/product/videos",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:PRODUCT.updateProductVideos,updateProductVarient:result.data})
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

export const updatevarientimage = (data) =>{
    return dispatch =>{
        axios.put(URL+"/api/v1/update/product/images",data)
        .then(result=>{
            dispatch({type:PRODUCT.updatevarientimage,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const deletefamily = (oldId,newId) =>{
    return dispatch =>{
        axios.delete(URL+"/api/v1/delete/product/family/"+oldId+"/"+newId)
        .then(result=>{
            dispatch({type:PRODUCT.deletefamily,payload:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

export const updatefamily = (data) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")  
    return dispatch =>{
        axios.put(URL+"/api/v1/update/productfamily",data ,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:PRODUCT.updatefamily,payload:result.data});
        })
            .catch(error=>{
                console.log(error);
            })
        }
    }