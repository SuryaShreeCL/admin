import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfPreferencesAction } from "../../Actions/SchoolResearchAction";
import PreferenceIndex from "../SchoolResearchPreferenceList/Index";
export default function PreferenceList(props) {
  const dispatch = useDispatch();
  const { getNumberOfPreferences } = useSelector(
    (state) => state.SchoolResearchReducer
  );
  useEffect(() => {
    if (props?.studentId) {
      let studentId = props?.studentId;
      let productId = props?.productId;
      dispatch(getNumberOfPreferencesAction(studentId, productId));
    }
  }, [props]);

  useEffect(() => {}, []);
  return (
    <div>
      {/* <PreferenceIndex tabList={getNumberOfPreferences?.data} props={props} /> */}
      {getNumberOfPreferences?.data?.length > 0 ? (
        <PreferenceIndex tabList={getNumberOfPreferences?.data} props={props} />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>"No Data Found"</Grid>
        </Grid>
      )}
    </div>
  );
}
