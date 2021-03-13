import { TESTIMONIAL } from '../Redux/Action';

export const testimonialListReducer = (state = { testimonials: [] }, action) => {
  switch (action.type) {
    case TESTIMONIAL.LIST_REQUEST:
      return { loading: true, testimonials: [] };
    case TESTIMONIAL.LIST_SUCCESS:
      return {
        loading: false,
        testimonials: action.payload,
      };
    case TESTIMONIAL.LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testimonialDetailsReducer = (state = { testimonial: [] }, action) => {
  switch (action.type) {
    case TESTIMONIAL.DETAILS_REQUEST:
      return { ...state, loading: true };
    case TESTIMONIAL.DETAILS_SUCCESS:
      return { loading: false, testimonial: action.payload };
    case TESTIMONIAL.DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testimonialDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIAL.DELETE_REQUEST:
      return { loading: true };
    case TESTIMONIAL.DELETE_SUCCESS:
      return { loading: false, success: true };
    case TESTIMONIAL.DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testimonialCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TESTIMONIAL.CREATE_REQUEST:
      return { loading: true };
    case TESTIMONIAL.CREATE_SUCCESS:
      return { loading: false, success: true, testimonial: action.payload };
    case TESTIMONIAL.CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TESTIMONIAL.CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testimonialUpdateReducer = (state = { testimonial: {} }, action) => {
  switch (action.type) {
    case TESTIMONIAL.UPDATE_REQUEST:
      return { loading: true };
    case TESTIMONIAL.UPDATE_SUCCESS:
      return { loading: false, success: true, testimonial: action.payload };
    case TESTIMONIAL.UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TESTIMONIAL.UPDATE_RESET:
      return { testimonial: {} };
    default:
      return state;
  }
};
