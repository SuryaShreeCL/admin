import { PRODUCT } from "../Redux/Action";
const initialState = {
  viewProductList: [],
  addProduct: [],
  editProduct: [],
  deleteProduct: [],
  addProductToStudentResponse: [],
  studentProductList: [],
  // productFamilyList: [],
  getAllProductFamily: [],
  getProductByFamilyId: [],
  postproductfamily: [],
  getProductVarient: [],
  postProductVarient: [],
  updateProductVarient: [],
  allProductImages: [],
  allProductVideos: [],
  allProductQuesAns: [],
  updateproductfamily: [],
  postProductVideos: [],
  updateProductVideos: [],
  getvarientimage: [],
  postvarientimage: [],
  updatevarientimage: [],
  updatefamily: [],
  deletefamily: [],
  postgeneraldetails: [],
  deleteproductvarient: [],
  getFaq: [],
  updateFaq: [],
  postFaq: [],
  getvarientByid: [],
  // getProductFamily :[],
  // getProductVarientByFamily :[]
  getproductcombo: [],
  addproductcombo: [],
  isVariantCreated: false,
  updateOneLineAndDesResponse: [],
  updateTncResponse: [],
  updateProductPunching: [],
  addProductPunching: [],
  publishvarient: [],
  comboexcel: [],
  varientexcel: [],
  getPunchingData: [],
  getproductstructure: [],
  postproductstructure: [],
  putproductstructure: [],
  getproductsteps: [],
  searchActivationList: [],
  variantStepList: [],
  postPunchingStatus: null,
  productVariant: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.viewProduct:
      return {
        ...state,
        viewProductList: action.viewProductList,
      };
    case PRODUCT.addProduct:
      return {
        ...state,
        addProduct: action.addProduct,
      };
    case PRODUCT.editProduct:
      return {
        ...state,
        editProduct: action.editProduct,
      };
    case PRODUCT.deleteProduct:
      return {
        ...state,
        deleteProduct: action.deleteProduct,
      };
    case PRODUCT.addProductToStudent:
      return {
        ...state,
        addProductToStudentResponse: action.payload,
      };
    case PRODUCT.viewProductToStudent:
      return {
        ...state,
        studentProductList: action.payload,
      };
    case PRODUCT.getAllProductFamily:
      return {
        ...state,
        getAllProductFamily: action.payload,
      };
    case PRODUCT.getProductByFamilyId:
      return {
        ...state,
        getProductByFamilyId: action.payload,
      };
    case PRODUCT.postproductfamily:
      return {
        ...state,
        postproductfamily: action.payload,
      };
    case PRODUCT.getProductVarient:
      return {
        ...state,
        getProductVarient: action.payload,
      };
    case PRODUCT.postProductVarient:
      return {
        ...state,
        postProductVarient: action.payload,
      };
    case PRODUCT.updateProductVarient:
      return {
        ...state,
        updateProductVarient: action.payload,
      };
    case PRODUCT.getAllProductImages:
      return {
        ...state,
        allProductImages: action.payload,
      };
    case PRODUCT.getAllProductVideos:
      return {
        ...state,
        allProductVideos: action.payload,
      };
    case PRODUCT.getAllProductQuesAns:
      return {
        ...state,
        allProductQuesAns: action.payload,
      };
    case PRODUCT.updateproductfamily:
      return {
        ...state,
        updateproductfamily: action.payload,
      };
    case PRODUCT.postProductVideos:
      return {
        ...state,
        postProductVideos: action.payload,
      };
    case PRODUCT.updateProductVideos:
      return {
        ...state,
        updateProductVideos: action.payload,
      };
    case PRODUCT.postvarientimage:
      return {
        ...state,
        postvarientimage: action.payload,
      };
    case PRODUCT.updatevarientimage:
      return {
        ...state,
        updatevarientimage: action.payload,
      };
    case PRODUCT.updatefamily:
      return {
        ...state,
        updatefamily: action.payload,
      };
    case PRODUCT.deletefamily:
      return {
        ...state,
        deletefamily: action.payload,
      };
    case PRODUCT.postgeneraldetails:
      return {
        ...state,
        postgeneraldetails: action.payload,
      };
    case PRODUCT.deleteproductvarient:
      return {
        ...state,
        deleteproductvarient: action.payload,
      };
    case PRODUCT.getFaq:
      return {
        ...state,
        getFaq: action.payload,
      };
    case PRODUCT.updateFaq:
      return {
        ...state,
        updateFaq: action.payload,
      };
    case PRODUCT.postFaq:
      return {
        ...state,
        postFaq: action.payload,
      };
    case PRODUCT.getvarientByid:
      return {
        ...state,
        getvarientByid: action.payload,
      };
    case PRODUCT.updateProductPunching:
      return {
        ...state,
        updateProductPunching: action.payload,
      };

    case PRODUCT.addproductcombo:
      return {
        ...state,
        addproductcombo: action.payload,
      };
    case PRODUCT.getproductcombo:
      return {
        ...state,
        getproductcombo: action.payload,
      };
    case PRODUCT.isVariantCreated:
      return {
        ...state,
        isVariantCreated: action.payload,
      };
    case PRODUCT.updateProductOnelinerAndDesc:
      return {
        ...state,
        updateOneLineAndDesResponse: action.payload,
      };
    case PRODUCT.updateTnc:
      return {
        ...state,
        updateTncResponse: action.payload,
      };
    case PRODUCT.addProductPunching:
      return {
        ...state,
        addProductPunching: action.payload,
      };
    case PRODUCT.publishvarient:
      return {
        ...state,
        publishvarient: action.payload,
      };
    case PRODUCT.comboexcel:
      return {
        ...state,
        comboexcel: action.payload,
      };
    case PRODUCT.varientexcel:
      return {
        ...state,
        varientexcel: action.payload,
      };
    case PRODUCT.getPunchingData:
      return {
        ...state,
        getPunchingData: action.payload,
      };
    case PRODUCT.postPunchingData:
      return {
        ...state,
        postPunchingStatus: action.payload,
      };
    case PRODUCT.getproductstructure:
      return {
        ...state,
        getproductstructure: action.payload,
      };
    case PRODUCT.postproductstructure:
      return {
        ...state,
        postproductstructure: action.payload,
      };
    case PRODUCT.putproductstructure:
      return {
        ...state,
        putproductstructure: action.payload,
      };
    case PRODUCT.getproductsteps:
      return {
        ...state,
        getproductsteps: action.payload,
      };
    case PRODUCT.searchProductActivationList:
      return {
        ...state,
        searchActivationList: action.payload,
      };
    case PRODUCT.getVariantStepsById:
      return {
        ...state,
        variantStepList: action.payload,
      };
    case PRODUCT.getReferProductVariantByProductId:
      return {
        ...state,
        productVariant: action.payload,
      };
    default:
      break;
  }
  return state;
};
