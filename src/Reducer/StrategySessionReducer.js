import { STRATEGY_SESSION } from "../Redux/Action";
const initialState = {
  putProgramPreference: [],
  getProgramPreference: [],
};
const STRATEGY_SESSION = (state, action) => {
  switch (action.type) {
    case STRATEGY_SESSION.putProgramPreference:
      return {
        ...state,
        isLoading: true,
      };
    case STRATEGY_SESSION.getProgramPreference:
      return {
        ...state,
        ProgramPreference: action.ProgramPreference,
      };
  }
};
