import { LMS_CONCEPT } from "../Action";

const initialState = {
  conceptList: null,
};

const LmsConceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case LMS_CONCEPT.getConcept: {
      return {
        conceptList: action.payload,
      };
    }
    default:
      return state;
  }
};

export default LmsConceptReducer;
