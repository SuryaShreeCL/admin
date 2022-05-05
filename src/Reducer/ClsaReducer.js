import { CLSA } from '../Redux/Action';

const initialState = {
  createClsaTest: [],
  getClsaDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLSA.createClsaTest:
      return {
        ...state,
        createClsaTest: action.createClsaTest,
      };
    case CLSA.getClsaDetails:
      return {
        ...state,
        getClsaDetails: action.getClsaDetails,
      };
    default:
      break;
  }
  return state;
};
