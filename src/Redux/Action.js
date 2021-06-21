export const COURSES = {
  GetCourses: 'GetCourses',
  AddCourse: 'AddCourse',
  GetCourseById: 'GetCourseById',
  UpdateCourse: 'UpdateCourse',
  GetRecommendedCouses: 'GetRecommendedCourses',
  GetPopularCourses: 'GetPopularCourses',
  GetSimilarCourses: 'GetSimilarCourses',
  GetMarkettingRecommended: 'GetMarkettingRecommended',
  GetServiceRecommended: 'GetServiceRecommended',

  // Selva
  deleteCourse: 'deleteCourse',
  getPaginateCourse: 'getPaginateCourse',
};

export const QUESTIONS = {
  getQuestions: 'getQuestions',
};

export const COLLEGES = {
  getCollege: 'getCollege',
  getAllColleges: 'getAllColleges',
  addCollges: 'addColleges',
  updateColleges: 'updateColleges',
  deleteCollege: 'deleteCollege',
  getBranches: 'getBranches',
  getUniversity: 'getUniversity',
  addUniversity: 'addUniversity',
  updateUniversity: 'updateUniversity',
  deleteUniversity: 'deleteUniversity',
  getDegrees: 'getDegrees',
  getPaginateDegree: 'getPaginateDegree',
  // Selva
  getPaginateCollege: 'getPaginateCollege',
  getPaginateUniversity: 'getPaginateUniversity',
};

export const STUDENT = {
  getStudent: 'getStudent',
  getStudentById: 'getStudentById',
  postStudent: 'postStudent',
  studentCollegeInformation: 'studentCollegeInformation',
  postQuestion: 'postQuestion',
  studentFeedback: 'studentFeedback',
  startTestExecution: 'startTestExecution',
  careerInterestSurvey: 'careerInterestSurvey',
  getAnswer: 'getAnswer',
  getStudentPaginate: 'getStudentPaginate',
  viewDocumet: 'viewDocumet',
  editDocument : 'editDocument',
  downloadDocument: 'downloadDocument',
  deleteDocument : 'deleteDocument',
  mernStudentSignUp: 'mernStudentSignUp',
  mernStudentEdit: 'mernStudentEdit',
  getBlackListedUser: 'getBlackListedUser',
  getWhiteListedUser: 'getWhiteListedUser',
  getMernUser: 'getMernUser',
  getManualUser: 'getManualUser',
  catchSignUpError: 'catchSignUpError',
  viewAllCity : 'viewAllCity',
  getAspirationById : 'getAspirationById',
  getTempPersonalData : "getTempPersonalData",
  verifyNewPersonalData : "verifyNewPersonalData"
};
export const CHOICE_ANSWER = {
  getChoiceAnswer: 'getChoiceAnswer',
};

export const DEPARTMENT = {
  addDepartment: 'addDepartment',
  updateDepartment: 'updateDepartment',
  deleteDepatment: 'deleteDepartment',
};

// Selva
export const ASPIRATION = {
  getAllSpecialization : 'getAllSpecialization',
  getAllDegree : 'getAllDegree',
  getAllBranch : 'getAllBranch',
  getAllUniversity : 'getAllUniversity',
  getAllTerms : 'getAllTerms',
  viewSpecialization: 'viewSpecialization',
  addSpecialization: 'addSpecialization',
  updateSpecialization: 'updateSpecialization',
  deleteSpecialization: 'deleteSpecialization',
  viewDegree: 'viewDegree',
  addDegree: 'addDegree',
  updateDegree: 'updateDegree',
  deleteDegree: 'deleteDegree',
  viewFeild: 'viewFeild',
  addFeild: 'addFeild',
  updateFeild: 'updateFeild',
  deleteFeild: 'deleteFeild',
  viewCountry: 'viewCountry',
  addCountry: 'addCountry',
  updateCountry: 'updateCountry',
  deleteCountry: 'deleteCountry',
  viewCollege: 'viewCollege',
  addCollege: 'addCollege',
  updateCollege: 'updateCollege',
  deleteCollege: 'deleteCollege',
  viewTerm: 'viewTerm',
  addTerm: 'addTerm',
  updateTerm: 'updateTerm',
  deleteTerm: 'deleteTerm',
  viewCountryForSelect: 'viewCountryForSelect',
  viewCity: 'viewCity',
  addCity: 'addCity',
  updateCity: 'updateCity',
  deleteCity: 'deleteCity',
};

export const QUESTIONSET = {
  viewQuestionSet: 'viewQuestionSet',
  addQuestionSet: 'addQuestionSet',
  editQuestionSet: 'editQuestionSet',
  deleteQuestionSet: 'deleteQuestionSet',
  viewQuestion: 'viewQuestion',
  addQuestion: 'addQuestion',
  editQuestion: 'editQuestion',
  deleteQuestion: 'deleteQuestion',
  viewChoice: 'viewChoice',
  addChoice: 'addChoice',
  editChoice: 'editChoice',
  deleteChoice: 'deleteChoice',
};

export const VIDEO = {
  viewVideo: 'viewVideo',
  addVideo: 'addVideo',
  editVideo: 'editVideo',
  deleteVideo: 'deleteVideo',
};

export const PRODUCT = {
  viewProduct: 'viewProduct',
  addProduct: 'addProduct',
  editProduct: 'editProduct',
  deleteProduct: 'deleteProduct',
  viewProductToStudent: 'viewProductToStudent',
  addProductToStudent: 'addProductToStudent',
  getAllProductFamily : "getAllProductFamily",
  getProductByFamilyId : "getProductBgetAllProductQuesAnsyFamilyId",
  postproductfamily:"postproductfamily",
  getProductVarient : "getProductVarient",
  postProductVarient : "postProductVarient",
  updateProductVarient : "updateProductVarient",
  getAllProductImages : "getAllProductImages",
  getAllProductVideos : "getAllProductVideos",
  getAllProductQuesAns : "getAllProductQuesAns",
  updateproductfamily : "updateproductfamily",
  postProductVideos : "postProductVideos",
  updateProductVideos : "updateProductVideos",
  postvarientimage : "postvarientimage",
  updatevarientimage : "updatevarientimage",
  updatefamily : "updatefamily",
  deletefamily : "deletefamily",
  postgeneraldetails : "postgeneraldetails",
  deleteproductvarient : "deleteproductvarient"
};

export const ADMIN = {
  adminLogin: 'adminLogin',
  refreshToken: 'refreshToken',
  studentAccess: 'studentAccess',
  updatePersonalData : 'updatePersonalData',
  updateEducationalData : 'updateEducationalData',
  updateContactData : 'updateContactData',
  updateAccountStatus : 'updateAccountStatus',
  giveInternAccess : "giveInternAccess",
  updateAspirationData : 'updateAspirationData',
  viewStudentStatus : 'viewStudentStatus',
  updateVerificationStatus : 'updateVerificationStatus',
  getAllMentor : "getAllMentor",
  alocateMentor : "alocateMentor",
  updateLmsAccess : "updateLmsAccess"
};

export const MENTORSCHEDULELIST={
  viewSchedule : "viewSchedule"
}



export const CAREER_TRACK = {
  addCareerTrack: 'addCareerTrack',
  viewCareerTrack: 'viewCareerTrack',
  updateCareerTrack: 'updateCareerTrack',
  deleteCareerTrack: 'deleteCareerTrack',
};

export const NOTIFICATION = {
	viewNotification : "viewNotification",
	addNotification : "addNotification",
	updateNotification : "updateNotification",
	deleteNotification : "deleteNotification"
}

export const REPORTS = {
	viewTermsAndConReport : "viewTermsAndConReport",
	viewCvReport : "viewCvReport",
	viewMarksheetReport : "viewMarksheetReport",
	viewMyDetailsReport : "viewMyDetailsReport",
  viewTechTestMechReport : "viewTechTestMechReport",
  viewTechTestCseReport:"viewTechTestCseReport",
  viewTestRating : "viewTestRating",
  viewTechTestElectronics : "viewTechTestElectronics",
  viewDiagTestReport : 'viewDiagTestReport',
  viewCareerExpoTest : 'viewCareerExpoTest'
}

export const STUDENTMARKDETAILS={
  viewStudentMarkDetails :"viewStudentMarkDetails",
  viewResetTest :"viewResetTest",
  viewAnswers :"viewAnswers"
}
export const SCOREDETAILS={
  viewScoreDetails :"viewScoreDetails"
}

export const PGA = {
  getScoreDetails : "getScoreDetails",
  getCareerInterest : "getCareerInterest",
  postAcademicData : "postAcademicData",
  getPgaAcademicData : "getPgaAcademicData",
  getChoosenTrack : "getChoosenTrack",
  postGenralDetails : "postGenralDetails",
  getPgaCvAndPpga : "getPgaCvAndPpga",
  postPgaCvAndPpga : "postPgaCvAndPpga",
  getppgaques : "getppgaques",
  postcvandppga :"postcvandppga",
  getcvandppga : "getcvandppga",
  getppgaques : "getppgaques",
  getcvques : "getcvques",
  getAllEnrollmentPeriod : "getAllEnrollmentPeriod",
  getQuarterPlan : "getQuarterPlan",
  getAllStarterPack : "getAllStarterPack",
  getPackageByStudentId : "getPackageByStudentId",
  getAllQuarterPlan : "getAllQuarterPlan",
  postCommentsAndPoints : "postCommentsAndPoints",
  getAdditionalPoints : "getAdditionalPoints",
  postAditionalPoints : "postAditionalPoints",
  getQuarterPlanByType : "getQuarterPlanByType",
  getPbChoosenTrack : "getPbChoosenTrack",
  getStudentGrade : "getStudentGrade",
  getAllSpecialization : "getAllSpecialization",
  postPgaPlanCareerTrack : "postPgaPlanCareerTrack",
  postQuarterPgaPlan : "postQuarterPgaPlan",
  getallcourse : "getallcourse",
  newenroll:"newenroll",
  getenroll : "getenroll",
  unenroll : "unenroll",
  getAllEnroll : "getAllEnroll",
  getFilteredCourseForEnroll : "getFilteredCourseForEnroll",
  clearNewEnroll : "clearNewEnroll",
  clearUnEnroll : "clearUnEnroll"
}



//MOHAMMED
export const TESTIMONIAL = {
  LIST_REQUEST: 'LIST_REQUEST',
  LIST_SUCCESS: 'LIST_SUCCESS',
  LIST_FAIL: 'LIST_FAIL',

  DETAILS_REQUEST: 'DETAILS_REQUEST',
  DETAILS_SUCCESS: 'DETAILS_SUCCESS',
  DETAILS_FAIL: 'DETAILS_FAIL',

  DELETE_REQUEST: 'DELETE_REQUEST',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAIL: 'DELETE_FAIL',

  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAIL: 'CREATE_FAIL',
  CREATE_RESET: 'CREATE_RESET',

  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAIL: 'UPDATE_FAIL',
  UPDATE_RESET: 'UPDATE_RESET',
};
