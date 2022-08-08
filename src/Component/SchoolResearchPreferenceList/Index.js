import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  getPreferenceListBasedOnPreferenceIDAction,
  getStageCall,
  getStageCompleteCall,
} from "../../Actions/SchoolResearchAction";
import {
  PreferenceDetails,
  Wrapper,
} from "../../Asset/StyledComponents/Styles";
import BottomContainer from "../../CommonComponents/BottomComponent";
import RightContainer from "../../CommonComponents/RightContainer";
import CustomizedSnackBars from "../CustomizedSnackBars";
import { StyledButton } from "../Utils/controls/Styles";
import CustomTabs from "./CustomTabs";
import PreferenceTabTable from "./PreferenceTable";
export default function PreferenceIndex(props) {
  console.log("rendering element 2");
  const [tabList, setTabList] = useState([]);
  const [tabId, setTabId] = useState("");
  const [tableData, setTabData] = useState([]);
  const [currentTab, setCurrentTab] = useState(tabId);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cardData, setCardData] = useState({});
  const {
    getPreferenceListBasedOnPreferenceID,
    getStageComplete,
    getStageCalls,
  } = useSelector((state) => state.SchoolResearchReducer);
  const matches = useMediaQuery("(max-width:1500px)");
  const shareRecommendations = () => {
    dispatch(
      getStageCompleteCall(props?.props?.studentId, props?.props?.productId)
    );
  };
  const handleChange = (event, newExpanded) => {
    setCurrentTab(newExpanded);
  };
  const [snackbar, setSnackbar] = useState({
    snackMsg: "",
    snackOpen: false,
    snackVariant: "",
  });
  const handleSnackClose = () => {
    setSnackbar({
      ...snackbar,
      snackOpen: false,
      snackMsg: "",
      snackVariant: "",
    });
  };
  useEffect(() => {
    if (tabList?.length > 0) {
      let tabId = tabList?.[0]?.id;
      setTabId(tabId);
      setCurrentTab(tabId);
    }
  }, [tabList]);
  useEffect(() => {
    if (props) {
      setTabList(props?.tabList);
    }
  }, [props]);
  useEffect(() => {
    if (getPreferenceListBasedOnPreferenceID)
      setCardData(getPreferenceListBasedOnPreferenceID?.data);
    setTabData(
      getPreferenceListBasedOnPreferenceID?.data?.prefSchoolDetailModels
    );
  }, [getPreferenceListBasedOnPreferenceID]);
  const [data, setData] = useState(false);
  useEffect(() => {
    if (tableData?.length > 0) {
      setData(true);
    } else {
      setData(false);
    }
  }, [tableData]);
  useEffect(() => {
    if (currentTab !== "") {
      if (props?.props?.studentId) {
        dispatch(
          getPreferenceListBasedOnPreferenceIDAction(
            props?.props?.studentId,
            props?.props?.productId,

            currentTab
          )
        );
        dispatch(
          getStageCall(props?.props?.studentId, props?.props?.productId)
        );
      }
    } else {
    }
  }, [currentTab]);
  useEffect(() => {
    if (getStageCalls) {
      console.log(getStageCalls, "**********************button stage");
      const findingStage = getStageCalls?.data.find(
        (item) => item.stepName === "Choose Preferences"
      );

      const status = findingStage.status;
      console.log(status, "*********************************button disabled");
      if (status === "COMPLETED") {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  }, [getStageCalls]);
  console.log(
    buttonDisabled,
    "**********************************button disabled"
  );
  useEffect(() => {
    if (getStageComplete) {
      if (getStageComplete?.success) {
        setSnackbar({
          ...snackbar,
          snackOpen: true,
          snackMsg: "Recommended Schools Added Successfully",
          snackVariant: "success",
        });
        setButtonDisabled(true);
        setTimeout(() => dispatch(clearData()), 3000);
      } else {
        setSnackbar({
          ...snackbar,
          snackOpen: true,
          snackMsg: "Recommended Schools Adding Failed",
          snackVariant: "error",
        });
      }
    }
  }, [getStageComplete]);
  return (
    <div style={{ height: "800px", position: "relative" }}>
      <Wrapper>
        <RightContainer>
          {tabList && (
            <CustomTabs
              tabList={tabList}
              handleChange={handleChange}
              value={currentTab}
            />
          )}
          <div>
            {cardData && (
              <Grid container>
                <PreferenceDetails>
                  <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: matches ? "80%" : "65%",
                      }}
                    >
                      <Grid item xs={2} sm={2} md={2} xl={2} lg={3}>
                        <div
                          style={{
                            justifyContent: "right",
                            display: "flex",
                            fontSize: "12px",
                            paddingRight: "10px",
                            color: "#666666",
                            textAlign: "right",
                          }}
                        >
                          Degree
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} xl={4} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "12px",
                            color: "black",
                            fontWeight: 550,
                          }}
                        >
                          {cardData?.degreeName}
                        </div>
                      </Grid>
                      <Grid item={2} sm={2} md={2} xl={2} lg={3}>
                        <div
                          style={{
                            justifyContent: "right",
                            display: "flex",
                            fontSize: "12px",
                            paddingRight: "10px",
                            color: "#666666",
                            textAlign: "right",
                          }}
                        >
                          Field of Study
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} xl={4} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "12px",
                            color: "black",
                            fontWeight: 550,
                          }}
                        >
                          {cardData?.fieldOfStudyName}
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <div
                      style={{
                        display: "flex",
                        width: matches ? "80%" : "65%",
                      }}
                    >
                      <Grid item xs={2} sm={2} md={2} xl={2} lg={3}>
                        <div
                          style={{
                            justifyContent: "right",
                            fontSize: "12px",
                            display: "flex",
                            paddingRight: "10px",
                            color: "#666666",
                            textAlign: "right",
                          }}
                        >
                          Area of Specialization
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} xl={4} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "12px",
                            color: "black ",
                            fontWeight: 550,
                          }}
                        >
                          {cardData?.areaOfSpecializationName}
                        </div>
                      </Grid>
                      <Grid item={2} sm={2} md={2} xl={2} lg={3}>
                        <div
                          style={{
                            justifyContent: "right",
                            display: "flex",
                            fontSize: "12px",
                            paddingRight: "10px",
                            color: "#666666",
                            textAlign: "right",
                          }}
                        >
                          Preferred Region
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} xl={3} lg={4}>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "12px",
                            color: "black ",
                            fontWeight: 550,
                          }}
                        >
                          {cardData?.regionName}
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </PreferenceDetails>
              </Grid>
            )}
          </div>
          <div style={{ margin: "20px" }}>
            <div style={{ color: "#488dff" }}>
              <Grid container>
                <Grid item xl={6} align="left">
                  Sample Graduate Schools and Programs
                </Grid>
              </Grid>
            </div>
          </div>
          {data ? (
            <div style={{ margin: "1rem 2rem 1rem 1rem" }}>
              <PreferenceTabTable
                tableData={tableData}
                currentTab={currentTab}
                buttonDisabled={buttonDisabled}
                props={props?.props}
              />
            </div>
          ) : (
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <div style={{ fontSize: "16px" }}>No Data Found</div>
              </Grid>
            </Grid>
          )}

          <div style={{ marginTop: "500px" }}>
            <BottomContainer>
              {" "}
              <div>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    xs={12}
                    md={12}
                    sm={12}
                    align="right"
                    justifyContent={"right"}
                  >
                    <StyledButton
                      disabled={buttonDisabled}
                      variant={"contained"}
                      style={{
                        backgroundColor: "#18AAE7",
                        color: "#FFF",
                        fontSize: "12px",
                      }}
                      onClick={() => shareRecommendations()}
                    >
                      {"Share Recommendations"}
                    </StyledButton>
                  </Grid>
                </Grid>
              </div>
            </BottomContainer>
          </div>
        </RightContainer>
        <CustomizedSnackBars
          open={snackbar.snackOpen}
          severity={snackbar.snackVariant}
          message={snackbar.snackMsg}
          onClose={handleSnackClose}
        />
      </Wrapper>
    </div>
  );
}
