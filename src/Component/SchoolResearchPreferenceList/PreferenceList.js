import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfPreferencesAction } from "../../Actions/SchoolResearchAction";
import PreferenceIndex from "./Index";

export default function personalInfo() {
  const dispatch = useDispatch();
  const { getNumberOfPreferences } = useSelector(
    (state) => state.SchoolResearchReducer
  );
  console.log(
    getNumberOfPreferences?.data,
    "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
  );
  useEffect(() => {
    dispatch(
      getNumberOfPreferencesAction(
        "3c3b4bee-aab8-462b-9222-9fe30a576734",
        "c46ccdff-0ce7-4b60-95d7-fc6b8a109646"
      )
    );
  }, []);
  return (
    <div>
      <PreferenceIndex tabList={getNumberOfPreferences?.data} />
    </div>
  );
}
