import { ASPIRATION } from "../Redux/Action";
const initialState = {
  viewSpecializationList: [],
  addSpecializationList: [],
  updateSpecializationList: [],
  deleteSpecialization : [],
  viewDegreeList: [],
  addDegreeList: [],
  updateDegreeList: [],
  deleteDegree : [],
  viewFeildList : [],
  addFeildList : [],
  updateFeildList : [],
  deleteFeild : [],
  viewCountryList : [],
  addCountryList : [],
  updateCountryList : [],
  deleteCountry : [],
  viewCollegeList : [],
  addCollegeList : [],
  updateCollegeList : [],
  deleteCollege : [],
  viewTermList : [],
  addTermList : [],
  updateTermList : [],
  deleteTerm : [],
  viewCountryForSelectList : [],
  addCityList : [],
  updateCityList : [],
  deleteCity : [],
  viewCityList : [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ASPIRATION.viewSpecialization:
      return {
        ...state,
        viewSpecializationList: action.viewSpecializationList,
      };
    case ASPIRATION.addSpecialization:
      return {
        ...state,
        addSpecializationList: action.addSpecializationList,
      };
    case ASPIRATION.updateSpecialization:
      return {
        ...state,
        updateSpecializationList: action.updateSpecializationList,
      };
      case ASPIRATION.deleteSpecialization:
        return {
          ...state,
          deleteSpecialization: action.deleteSpecialization,
        };
    case ASPIRATION.viewDegree:
      return {
        ...state,
        viewDegreeList: action.viewDegreeList,
      };
    case ASPIRATION.addDegree:
      return {
        ...state,
        addDegreeList: action.addDegreeList,
      };
    case ASPIRATION.updateDegree:
      return {
        ...state,
        updateDegreeList: action.updateDegreeList,
      };
      case ASPIRATION.deleteDegree:
        return {
          ...state,
          deleteDegree: action.deleteDegree,
        };
      case ASPIRATION.viewFeild:
        return {
          ...state,
          viewFeildList: action.viewFeildList,
        };
      case ASPIRATION.addFeild:
        return {
          ...state,
          addFeildList: action.addFeildList,
        };
      case ASPIRATION.updateFeild:
        return {
          ...state,
          updateFeildList: action.updateFeildList,
        };
        case ASPIRATION.deleteFeild:
          return {
            ...state,
            deleteFeild: action.deleteFeild,
          };
        case ASPIRATION.viewCountry:
            return {
              ...state,
              viewCountryList: action.viewCountryList,
            };
          case ASPIRATION.addCountry:
            return {
              ...state,
              addCountryList: action.addCountryList,
            };
          case ASPIRATION.updateCountry:
            return {
              ...state,
              updateCountryList: action.updateCountryList,
            };
            case ASPIRATION.deleteCountry:
          return {
            ...state,
            deleteCountry: action.deleteCountry,
          };
            case ASPIRATION.viewCollege:
                return {
                  ...state,
                  viewCollegeList: action.viewCollegeList,
                };
              case ASPIRATION.addCollege:
                return {
                  ...state,
                  addCollegeList: action.addCollegeList,
                };
              case ASPIRATION.updateCollege:
                return {
                  ...state,
                  updateCollegeList: action.updateCollegeList,
                };
                case ASPIRATION.deleteCollege:
          return {
            ...state,
            deleteCollege: action.deleteCollege,
          };
                case ASPIRATION.viewTerm:
                    return {
                      ...state,
                      viewTermList: action.viewTermList,
                    };
                  case ASPIRATION.addTerm:
                    return {
                      ...state,
                      addTermList: action.addTermList,
                    };
                  case ASPIRATION.updateTerm:
                    return {
                      ...state,
                      updateTermList: action.updateTermList,
                    };
                    case ASPIRATION.deleteTerm:
                      return {
                        ...state,
                        deleteTerm: action.deleteTerm,
                      };
                    case ASPIRATION.viewCountryForSelect:
                      return {
                        ...state,
                        viewCountryForSelectList: action.viewCountryForSelectList,
                      };
                      case ASPIRATION.addCity:
                        return {
                          ...state,
                          addCityList: action.addCityList,
                        };
                      case ASPIRATION.updateCity:
                        return {
                          ...state,
                          updateCityList: action.updateCityList,
                        };
                        case ASPIRATION.viewCity:
                          return {
                            ...state,
                            viewCityList: action.viewCityList,
                          };
                          case ASPIRATION.deleteCity:
                            return {
                              ...state,
                              deleteCity: action.deleteCity,
                            };

    default:
      break;
  }
  return state;
};