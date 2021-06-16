import { PGA } from "../Redux/Action";

const initialState = {
  pgaScoreDetails: [],
  careerInterestList: [],
  academicDataPostResponse: [],
  pgaAcademicDetails: [],
  choosenTrackForStudent: [],
  postGeneralDetailsResponse: [],
  enrollmentPeriod: [],
  quarterPlan: [],
  starterPackDetails: [],
  studentPackage: [],
  quarterPlanDetails: [],
  cvandppgaResponse: [],
  getcvandppgaResponse: [],
  getppgaResponse: [],
  getcvResponse: [],
  allQuarterPlan: [],
  postCommentsAndPointsResponse: [],
  additionalPointsDetails: [],
  postAdditionalPointsResponse: [],
  byTypeDetails: [],
  pbChoosenTrackDetails: [],
  studentGradeList: [],
  allSpecialization: [],
  postPGaPlanCareerTrack: [],
  postPgaQuarterResponse : [],
  getallcourse : [],
  newenroll : [],
  getenroll : [],
  unenroll:[],
  allEnrollCourseList : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PGA.getScoreDetails:
      return {
        ...state,
        pgaScoreDetails: action.payload,
      };
    case PGA.getCareerInterest:
      return {
        ...state,
        careerInterestList: action.payload,
      };
    case PGA.postAcademicData:
      return {
        ...state,
        academicDataPostResponse: action.payload,
      };
    case PGA.getPgaAcademicData:
      return {
        ...state,
        pgaAcademicDetails: action.payload,
      };
    case PGA.getChoosenTrack:
      return {
        ...state,
        choosenTrackForStudent: action.payload,
      };
    case PGA.postGenralDetails:
      return {
        ...state,
        postGeneralDetailsResponse: action.payload,
      };
    case PGA.getAllEnrollmentPeriod:
      return {
        ...state,
        enrollmentPeriod: action.payload,
      };
    case PGA.getQuarterPlan:
      return {
        ...state,
        quarterPlan: action.payload,
      };
    case PGA.getAllStarterPack:
      return {
        ...state,
        starterPackDetails: action.payload,
      };
    case PGA.getPackageByStudentId:
      return {
        ...state,
        studentPackage: action.payload,
      };
    case PGA.getQuarterPlan:
      return {
        ...state,
        quarterPlanDetails: action.payload,
      };
    case PGA.postcvandppga:
      return {
        ...state,
        cvandppgaResponse: action.payload,
      };
    case PGA.getcvandppga:
      return {
        ...state,
        getcvandppgaResponse: action.payload,
      };
    case PGA.getppgaques:
      return {
        ...state,
        getppgaResponse: action.payload,
      };
    case PGA.getcvques:
      return {
        ...state,
        getcvResponse: action.payload,
      };
    case PGA.getAllQuarterPlan:
      return {
        ...state,
        allQuarterPlan: action.payload,
      };
    case PGA.postCommentsAndPoints:
      return {
        ...state,
        postCommentsAndPointsResponse: action.payload,
      };
    case PGA.getAdditionalPoints:
      return {
        ...state,
        additionalPointsDetails: action.payload,
      };
    case PGA.postAditionalPoints:
      return {
        ...state,
        postAdditionalPointsResponse: action.payload,
      };
    case PGA.getQuarterPlanByType:
      return {
        ...state,
        byTypeDetails: action.payload,
      };
    case PGA.getPbChoosenTrack:
      return {
        ...state,
        pbChoosenTrackDetails: action.payload,
      };
    case PGA.getStudentGrade:
      return {
        ...state,
        studentGradeList: action.payload,
      };
    case PGA.getAllSpecialization:
      return {
        ...state,
        allSpecialization: action.payload,
      };
    case PGA.postPgaPlanCareerTrack:
      return {
        ...state,
        postPGaPlanCareerTrack: action.payload,
      };
      case PGA.postQuarterPgaPlan:
        return {
          ...state,
          postPgaQuarterResponse: action.payload,
        };
        case PGA.getallcourse:
          return {
            ...state,
            getallcourse : action.payload
          }
          case PGA.newenroll:
            return {
              ...state,
              newenroll : action.payload
            }
            case PGA.getenroll:
            return {
              ...state,
              getenroll : action.payload
            }
            case PGA.unenroll:
            return {
              ...state,
              unenroll : action.payload
            }
            case PGA.getAllEnroll:
              return {
                ...state,
                allEnrollCourseList : action.payload
              }


    default:
      return state;
  }
};
