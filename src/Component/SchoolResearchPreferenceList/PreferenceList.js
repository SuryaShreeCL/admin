import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfPreferencesAction } from "../../Actions/SchoolResearchAction";
import PreferenceIndex from "../SchoolResearchPreferenceList/Index";
export default function PreferenceList(props) {
  const dispatch = useDispatch();
  const [dataIdentification, setDataIdentification] = useState(false);
  const { getNumberOfPreferences } = useSelector(
    (state) => state.SchoolResearchReducer
  );
  useEffect(() => {
    let studentId = props?.studentId;
    let productId = props?.productId;
    dispatch(getNumberOfPreferencesAction(studentId, productId));
  }, []);
  useEffect(() => {
    if (getNumberOfPreferences) {
      if (getNumberOfPreferences.data?.length > 0) {
        setDataIdentification(true);
      } else {
        setDataIdentification(false);
      }
    }
  }, [getNumberOfPreferences]);
  console.log("rendering element1");
  return (
    <>
      {dataIdentification ? (
        <PreferenceIndex tabList={getNumberOfPreferences.data} props={props} />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>"No Data Found"</Grid>
        </Grid>
      )}
      {/* <div>
        {" "}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>"No Data Found"</Grid>
        </Grid>
      </div> */}
    </>
  );
}

