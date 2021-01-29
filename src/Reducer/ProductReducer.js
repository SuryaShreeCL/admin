import {PRODUCT} from '../Redux/Action'
const initialState = {
    viewProductList : [],
    addProduct:[],
    editProduct : [],
    deleteProduct : [],
    addProductToStudent : [],
    viewProductToStudentList : [],
}

export default (state = initialState, action) => {
	switch (action.type) {
        case PRODUCT.viewProduct:
			return {
				...state,
                viewProductList:action.viewProductList,
            }
		case PRODUCT.addProduct:
			return {
				...state,
                addProduct:action.addProduct,
            }
            case PRODUCT.editProduct:
                return {
                    ...state,
                    editProduct : action.editProduct
                }
                case PRODUCT.deleteProduct:
                    return {
                        ...state,
                        deleteProduct : action.deleteProduct
                    }
                    case PRODUCT.addProductToStudent:
                        return {
                            ...state,
                            addProductToStudent : action.addProductToStudent
                        }
                        case PRODUCT.viewProductToStudent:
                            return {
                                ...state,
                                viewProductToStudentList : action.viewProductToStudentList
                            }
		default:
			break
	}
	return state
}