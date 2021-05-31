import { PRODUCT } from "../Redux/Action";
const initialState = {
  viewProductList: [],
  addProduct: [],
  editProduct: [],
  deleteProduct: [],
  addProductToStudentResponse: [],
  studentProductList: [],
  productFamilyList: [],
  productVariantList : [],
  getProductVarient : [],
  postProductVarient : [],
  updateProductVarient : [],
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
          productFamilyList: action.payload,
        };
        case PRODUCT.getProductByFamilyId:
          return {
            ...state,
            productVariantList: action.payload,
          };
          case PRODUCT.getProductVarient:
          return {
            ...state,
            getProductVarient: action.payload,
          };
          case PRODUCT.postProductVarient:
          return {
            ...state,
            postProductVarient : action.payload,
          };
          case PRODUCT.updateProductVarient:
            return {
              ...state,
              updateProductVarient : action.payload,
            };
    default:
      break;
  }
  return state;
};
