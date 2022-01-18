import { PGA_REPORT } from "../Redux/Action";
const initialState = {
  spiderGraph: null,
  resumeParseStatus: null,
  colleges: null,
  departments: null,
  universities: null,
  degrees: null,
  professionalCertificates: null,
  academicCertificates: null,
  relevantSkills: null,
  electiveSubjects: null,
  awardHobby: null,
  generateCareerTracksStatus: null,
  careerTrackDetailsStatus: null,
  profileScoreStatus: null,
  resumePdfPath: null,
  resumePdfUrl: null,
  resumeQuestionnaire: null,
  postSpiderGraphStatus: null,
  trackProfileSimilarity: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PGA_REPORT.getSpiderGraph:
      return {
        ...state,
        spiderGraph: action.payload,
      };
    case PGA_REPORT.postParseResume:
      return {
        ...state,
        resumeParseStatus: action.payload,
      };
    case PGA_REPORT.getColleges:
      return {
        ...state,
        colleges: action.payload,
      };
    case PGA_REPORT.getDepartments:
      return {
        ...state,
        departments: action.payload,
      };
    case PGA_REPORT.getUniversity:
      return {
        ...state,
        universities: action.payload,
      };
    case PGA_REPORT.getDegrees:
      return {
        ...state,
        degrees: action.payload,
      };
    case PGA_REPORT.getProfessionalCertificates:
      return {
        ...state,
        professionalCertificates: action.payload,
      };
    case PGA_REPORT.getAcademicCertificates:
      return {
        ...state,
        academicCertificates: action.payload,
      };
    case PGA_REPORT.getRelevantSkills:
      return {
        ...state,
        relevantSkills: action.payload,
      };
    case PGA_REPORT.getElectiveSubjects:
      return {
        ...state,
        electiveSubjects: action.payload,
      };
    case PGA_REPORT.getAwardHobby:
      return {
        ...state,
        awardHobby: action.payload,
      };
    case PGA_REPORT.generateCareerTracks:
      return {
        ...state,
        generateCareerTracksStatus: action.payload,
      };
    case PGA_REPORT.addStudentCareerTrackDetails:
      return {
        ...state,
        careerTrackDetailsStatus: action.payload,
      };
    case PGA_REPORT.profileScoreGenerate:
      return {
        ...state,
        profileScoreStatus: action.payload,
      };
    case PGA_REPORT.getResumePdfPath:
      return {
        ...state,
        resumePdfPath: action.payload,
      };
    case PGA_REPORT.getResumePdfDownloadUrl:
      return {
        ...state,
        resumePdfUrl: action.payload,
      };
    case PGA_REPORT.getResumeQuestionnaire:
      return {
        ...state,
        resumeQuestionnaire: action.payload,
      };
    case PGA_REPORT.postSpiderGraph:
      return {
        ...state,
        postSpiderGraphStatus: action.payload,
      };
    case PGA_REPORT.careerTrackProfileSimilarity:
      return {
        ...state,
        trackProfileSimilarity: action.payload,
      };
    default:
      break;
  }
  return state;
};
