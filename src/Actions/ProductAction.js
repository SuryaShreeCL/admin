import { PRODUCT } from "../Redux/Action";
import axios from "axios";
import { URL } from "../Actions/URL";
export const viewProduct = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/product/view",{
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.viewProduct, viewProductList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const addProduct = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/product/create", data, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.addProduct, addProduct: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateProduct = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/product/update", data, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.editProduct, editProduct: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteProduct = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/product/" + id, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.deleteProduct, deleteProduct: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addProductToStudent = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/student/product/create", data, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.addProductToStudent, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewProductToStudent = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/student/product/" + id,{
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.viewProductToStudent, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllProductFamily = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/productFamily", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getAllProductFamily, payload: result.data });
        console.log(result);
      })

      .catch((error) => {
        console.log(error);
      });
  };
};

export const getProductByFamilyId = (familyId) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/productFamily/" + familyId, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getProductByFamilyId, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postproductfamily = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/family", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.postproductfamily, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getProductVarient = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/varient", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getProductVarient, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const varientexcel = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/productvarient/excel", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.varientexcel, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postProductVarient = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/varient", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.postProductVarient, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateProductVarient = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/varient", data, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.updateProductVarient,
          updateProductVarient: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllProductImages = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/images", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getAllProductImages, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllProductVideos = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/videos", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getAllProductVideos, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAllProductQuesAns = () => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/questionAnswer", {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getAllProductQuesAns, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateproductfamily = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/family", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.updateproductfamily, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postProductVideos = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")


  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/videos", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.postProductVideos, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postvarientimage = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/images", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.postvarientimage, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateProductVideos = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/videos", data, {
        crossDomain: true,
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.updateProductVideos,
          updateProductVarient: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updatevarientimage = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/images", data, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.updatevarientimage, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const deletefamily = (oldId, newId) => {
  let accessToken = window.sessionStorage.getItem("accessToken")

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/delete/product/family/" + oldId + "/" + newId, {
        headers:{
          "admin" : "yes",
          "Authorization" : `Bearer ${accessToken}`
      }
      })
      .then((result) => {
        dispatch({ type: PRODUCT.deletefamily, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updatefamily = (data) => {

  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/productfamily", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.updatefamily, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postgeneraldetails = (data, callBack) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/varient", data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        // dispatch({ type: PRODUCT.postgeneraldetails, payload: result.data });
        callBack(result)
      })
      .catch((error) => {
        callBack(error.response && error.response.data.message ? error.response.data.message : error.message)
        // console.log(error);
      });
  };
};
export const deleteproductvarient = (oldId, newId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/delete/product/variant/" + oldId + "/" + newId, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.deleteproductvarient, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// export const getvarientByid = (id) => {
//   let accessToken = window.sessionStorage.getItem("accessToken");
//   return (dispatch) => {
//     axios
//       .get(URL + "/api/v1/get/product/varient/" + id, {
//         crossDomain: true,
//         headers: {
//           admin: "yes",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((result) => {
//         dispatch({ type: PRODUCT.getvarientByid, payload: result.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };
// export const getproductbyid = (id) =>{
//     let accessToken = window.sessionStorage.getItem("accessToken")
//     return dispatch =>{
//         axios.get(URL+"/api/v1//get/product/productFamily/"+id,{
//             crossDomain: true,
//             headers : {
//                 "admin" : "yes",
//                 "Authorization" : `Bearer ${accessToken}`
//             }
//         })
//         .then(result=>{
//             dispatch({type:PRODUCT.getfamilybyid,payload:result.data});
//         })
//             .catch(error=>{
//                 console.log(error);
//             })
//         }
//     }

// export const getProductFamily = () => {
//   return (dispatch) => {
//     axios
//       .get(URL + "/api/v1/get/productFamily")
//       .then((result) => {
//         dispatch({ type: PRODUCT.getProductFamily, payload: result.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };

// export const getProductVarientByFamily = () => {
//   return (dispatch) => {
//     axios
//       .get(URL + "/api/v1/get/product/productFamily/1")
//       .then((result) => {
//         dispatch({
//           type: PRODUCT.getProductVarientByFamily,
//           payload: result.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };
// export const updatefamily = (data) =>{
//     let accessToken = window.sessionStorage.getItem("accessToken")
//     return dispatch =>{
//         axios.put(URL+"/api/v1/update/productfamily",data ,{
//             crossDomain: true,
//             headers : {
//                 "admin" : "yes",
//                 "Authorization" : `Bearer ${accessToken}`
//             }
//         })
//         .then(result=>{
//             dispatch({type:PRODUCT.updatefamily,payload:result.data});
//         })
//             .catch(error=>{
//                 console.log(error);
//             })
//         }
//     }
// export const postgeneraldetails = (data) =>{
//     return dispatch =>{
//         axios.post(URL+"/api/v1/create/product/varient",data)
//         .then(result=>{
//             dispatch({type:PRODUCT.postgeneraldetails,payload:result.data});
//         })
//         .catch(error=>{
//             console.log(error);
//         })
//     }
// }
// export const deleteproductvarient = (oldId,newId) =>{
//     return dispatch =>{
//         axios.delete(URL+"/api/v1/delete/product/variant/"+oldId+"/"+newId)
//         .then(result=>{
//             dispatch({type:PRODUCT.deleteproductvarient,payload:result.data});
//         })
//         .catch(error=>{
//             console.log(error);
//         })
//     }
// }
export const getvarientByid = (id,callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/varient/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getvarientByid, payload: result.data });
        callback(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// export const getproductbyid = (id) =>{
//     let accessToken = window.sessionStorage.getItem("accessToken")
//     return dispatch =>{
//         axios.get(URL+"/api/v1//get/product/productFamily/"+id,{
//             crossDomain: true,
//             headers : {
//                 "admin" : "yes",
//                 "Authorization" : `Bearer ${accessToken}`
//             }
//         })
//         .then(result=>{
//             dispatch({type:PRODUCT.getfamilybyid,payload:result.data});
//         })
//             .catch(error=>{
//                 console.log(error);
//             })
//         }
//     }

export const updategeneraldata = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/varient", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result)
        // dispatch({ type: PRODUCT.updategeneraldata, payload: result.data });
      })
      .catch((error) => {
        callback(error.response && error.response.data.message ? error.response.data.message : error.message)
        // console.log(error);
      });
  };
};
export const addproductcombo = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/product/combo", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.addproductcombo, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getproductcombo = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/combo", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.getproductcombo, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const comboexcel = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/product/combo/excel", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.comboexcel, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const isVariantCreated = (data) => {
  return (dispatch) => {
    dispatch({ type: PRODUCT.isVariantCreated, payload: data });
  };
};
// export const updategeneraldata = (data) =>{
//     let accessToken = window.sessionStorage.getItem("accessToken")  
//     return dispatch =>{
//         axios.put(URL+"/api/v1/update/product/varient",data ,{
//             crossDomain: true,
//             headers : {
//                 "admin" : "yes",
//                 "Authorization" : `Bearer ${accessToken}`
//             }
//         })
//         .then(result=>{
//             dispatch({type:PRODUCT.updategeneraldata,payload:result.data});
//         })
//             .catch(error=>{
//                 console.log(error);
//             })
//         }
//     }
    // export const addproductcombo = (data) =>{
    //     let accessToken = window.sessionStorage.getItem("accessToken")  
    //     return dispatch =>{
    //         axios.post(URL+"/api/v1/create/product/combo",data ,{
    //             crossDomain: true,
    //             headers : {
    //                 "admin" : "yes",
    //                 "Authorization" : `Bearer ${accessToken}`
    //             }
    //         })
    //         .then(result=>{
    //             dispatch({type:PRODUCT.addproductcombo,payload:result.data});
    //         })
    //             .catch(error=>{
    //                 console.log(error);
    //             })
    //         }
    //     }
        // export const getproductcombo = () =>{
        //     let accessToken = window.sessionStorage.getItem("accessToken")  
        //     return dispatch =>{
        //         axios.get(URL+"/api/v1/get/product/combo" ,{
        //             crossDomain: true,
        //         headers : {
        //             "admin" : "yes",
        //             "Authorization" : `Bearer ${accessToken}`
        //         }
        //     })
        //     .then(result=>{
        //         dispatch({type:PRODUCT.getproductcombo,payload:result.data});
        //     })
        //         .catch(error=>{
        //             console.log(error);
        //         })
        //     }
        // }
        // export const isVariantCreated = (data) =>{
        //     return dispatch =>{
        //         dispatch({type:PRODUCT.isVariantCreated,payload: data})
        //     }
        // }
    export const getFaq = () =>{
      let accessToken = window.sessionStorage.getItem("accessToken");

        return dispatch =>{
            axios.get(URL+"/api/v1/get/product/varient", {
              headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(result=>{
                dispatch({type:PRODUCT.getFaq,payload:result.data});
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
    export const updateFaq = (data) =>{
      let accessToken = window.sessionStorage.getItem("accessToken");

        return dispatch =>{
            axios.put(URL+"/api/v1/update/product/question/answer",data, {
              headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(result=>{
                dispatch({type:PRODUCT.updateFaq,payload:result.data});
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
    export const postFaq = (data) =>{
      let accessToken = window.sessionStorage.getItem("accessToken");

        return dispatch =>{
            axios.post(URL+"/api/v1/create/product/question/answer",data, {
              headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(result=>{
                dispatch({type:PRODUCT.postFaq,payload:result.data});
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
    export const publishvarient = (data) =>{
      let accessToken = window.sessionStorage.getItem("accessToken");

      return dispatch =>{
          axios.post(URL+"/api/v1/check/productVariant/status",data, {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(result=>{
              dispatch({type:PRODUCT.publishvarient,payload:result.data});
          })
          .catch(error=>{
              console.log(error);
          })
      }
  }


export const updateProductOnelinerAndDesc = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/description", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.updateProductOnelinerAndDesc,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateProductTnC = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/product/tnc", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: PRODUCT.updateTnc, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateProductPunching = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/student/product", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.updateProductPunching,
          updateProductPunching: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addProductPunching = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/save/student/product", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.addProductPunching,
          addProductPunching: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getpunchingdata = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/allocate/student/product/"+id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.getpunchingdata,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postpunchingdata = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(URL + "/api/v1/save/student/product",data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.postpunchingdata,
          postpunchingdata: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getproductstructure = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/all/steps", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.getproductstructure,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postproductstructure = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(URL + "/api/v1/create/productVarient/steps",data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.postproductstructure,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const putproductstructure = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/productVarient/steps",data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.putproductstructure,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getproductsteps = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/steps/"+id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: PRODUCT.getproductsteps,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


// export const searchProductActivationList = (keyword) =>{
//   let adminUserId = window.sessionStorage.getItem("adminUserId")
//   return dispatch =>{
//     axios.get(URL+"/api/v1/get/studentProduct/search/"+adminUserId+"?page=0&size=20&q="+keyword)
//     .then((result)=>{
//       dispatch({type: PRODUCT.searchProductActivationList, payload: result.data})
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
// }
export const searchProductActivationList = (productId,data) =>{
  let accessToken = window.sessionStorage.getItem("accessToken");
  let adminUserId = window.sessionStorage.getItem("adminUserId")

  return dispatch =>{
    axios.get(URL+"/api/v1/product/"+productId+"/admin/"+adminUserId+"/notactsearch?page=0&size=200&q="+data, {
      headers: {
        admin: "yes",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((result)=>{
      dispatch({type: PRODUCT.searchProductActivationList, payload: result.data})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}

export const getVariantStepsById = (variantId,callback) =>{
  let accessToken = window.sessionStorage.getItem("accessToken");

  return dispatch =>{
    axios.get(URL+"/api/v1/get/product/varient/steps/"+variantId, {
      headers: {
        admin: "yes",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((result)=>{
      dispatch({type: PRODUCT.getVariantStepsById, payload: result.data})
      callback(result.data);
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}
// export const getactivationlist = (keyword) =>{
//   let adminUserId = window.sessionStorage.getItem("adminUserId")
//   return dispatch =>{
//     axios.get(URL+"/api/v1/product/"++"/admin/"+adminUserId+"/search?page=0&size=20&q=")
//     .then((result)=>{
//       dispatch({type: PRODUCT.getactivationlist, payload: result.data})
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
//   }
// }