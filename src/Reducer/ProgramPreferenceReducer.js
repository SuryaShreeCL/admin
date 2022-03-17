import { PROGRAM_PREFERENCE } from "../Redux/Action";
const initialState = {
  putProgramPreference: [],
  getProgramPreference: [],
};
const PROGRAM_PREFERENCE = (state, action) => {
  switch (action.type) {
    case PROGRAM_PREFERENCE.putProgramPreference:
      return {
        ...state,
        isLoading: true,
      };
    case PROGRAM_PREFERENCE.getProgramPreference:
      return {
        ...state,
        ProgramPreference: action.ProgramPreference,
      };
  }
};
