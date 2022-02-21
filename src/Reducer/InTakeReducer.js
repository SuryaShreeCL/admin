import { INTAKE } from "../Redux/Action";
const initialState = {
  addedIntake: null,
  updatedIntake: null,
  deletedIntake: null,
  allIntakeList: [],
  paginatedFilteredIntake: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INTAKE.addIntake:
      return {
        ...state,
        addedIntake: action.addedIntake,
      };
    case INTAKE.updateIntake:
      return {
        ...state,
        updatedIntake: action.updatedIntake,
      };
    case INTAKE.getAllIntakes:
      return {
        ...state,
        allIntakeList: action.allIntakeList,
      };
    case INTAKE.deleteIntake:
      return {
        ...state,
        deletedIntake: action.deletedIntake,
      };
    case INTAKE.getPaginateIntake:
      return {
        ...state,
        paginatedFilteredIntake: action.paginatedFilteredIntake,
      };
    default:
      break;
  }
  return state;
};
