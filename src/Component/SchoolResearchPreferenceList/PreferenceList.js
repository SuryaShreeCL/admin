import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfPreferencesAction } from "../../Actions/SchoolResearchAction";
import PreferenceIndex from "../SchoolResearchPreferenceList/Index";
export default function personalInfo(props) {
  console.log(props?.match?.params?.studentId, "consoling the props");
  const dispatch = useDispatch();
  const { getNumberOfPreferences } = useSelector(
    (state) => state.SchoolResearchReducer
  );
  useEffect(() => {
    if (props?.match?.params) {
      let studentId = props?.match?.params?.studentId;
      let productId = props?.match?.params?.productId;
      dispatch(getNumberOfPreferencesAction(studentId, productId));
    }
  }, [props]);
  console.log(
    getNumberOfPreferences?.data,
    "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
  );
  useEffect(() => {}, []);
  return (
    <div>
      <PreferenceIndex
        tabList={getNumberOfPreferences?.data}
        props={props?.match?.params}
      />
    </div>
  );
}
