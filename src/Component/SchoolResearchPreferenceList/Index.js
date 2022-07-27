import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNumberOfPreferences,
  getPreferenceListBasedOnPreferenceIDAction,
  getStageCompleteCall,
} from "../../Actions/SchoolResearchAction";
import {
  PreferenceDetails,
  Wrapper,
} from "../../Asset/StyledComponents/Styles";
import RightContainer from "../../CommonComponents/RightContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { preferenceTableDummyData, tabList } from "../../Utils/Data";
import CustomTabs from "./CustomTabs";
import PreferenceTabTable from "./PreferenceTable";
import { StyledButton } from "../Utils/controls/Styles";
import BottomContainer from "../../CommonComponents/BottomComponent";
export default function PreferenceIndex(props) {
  console.log(props, "we have to get the props here");
  const [tabList, setTabList] = useState([]);
  const [tabId, setTabId] = useState("");
  const [tableData, setTabData] = useState([]);
  const matches = useMediaQuery("(max-width:1500px)");
  useEffect(() => {
    if (tabList?.length > 0) {
      let tabId = tabList[0]?.id;
      setTabId(tabId);
      setCurrentTab(tabId);
    }
  }, [tabList]);
  useEffect(() => {
    if (props !== undefined) {
      setTabList(props.tabList);
    }
  }, [props]);
  const [currentTab, setCurrentTab] = useState(tabId);
  const handleChange = (event, newExpanded) => {
    setCurrentTab(newExpanded);
  };
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({});
  const {
    getPreferenceListBasedOnPreferenceID,
    getStageComplete,
  } = useSelector((state) => state.SchoolResearchReducer);
  useEffect(() => {
    if (getPreferenceListBasedOnPreferenceID)
      setCardData(getPreferenceListBasedOnPreferenceID?.data);
    setTabData(
      getPreferenceListBasedOnPreferenceID?.data?.prefSchoolDetailModels
    );
  }, [getPreferenceListBasedOnPreferenceID]);
  console.log(tableData, "KIDJ***");
  const [snackbar, setSnackbar] = useState({
    snackMsg: "",
    snackOpen: false,
    snackVariant: "",
  });

  useEffect(() => {
    if (currentTab !== "") {
      if (props?.studentId !== null) {
        dispatch(
          getPreferenceListBasedOnPreferenceIDAction(
            props?.studentId,
            props?.productId,

            currentTab
          )
        );
      }
    }
  }, [currentTab]);
  const shareRecommendations = () => {
    dispatch(
      getStageCompleteCall(props?.props?.studentId, props?.props?.productId)
    );
    console.log("share recommendations");
  };
  console.log(getStageComplete, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  useEffect(() => {
    if (getStageComplete) {
      if (getStageComplete?.success) {
        setSnackbar({
          ...snackbar,
          snackOpen: true,
          snackMsg: "Stage Complete Successfully",
          snackVariant: "success",
        });
      } else {
        setSnackbar({
          ...snackbar,
          snackOpen: true,
          snackMsg: "Stage Completion Failed",
          snackVariant: "error",
        });
      }
    }
  }, [getStageComplete]);
  return (
    <div style={{ height: "800px", position: "relative" }}>
      <Wrapper>
        <RightContainer style={{ position: "20px", height: "100px" }}>
          <div
            style={{
              background: "white",
              position: "sticky",
              top: "0px",
              zIndex: 2,
              display: "flex",
            }}
          ></div>

          <CustomTabs
            tabList={tabList?.data}
            handleChange={handleChange}
            value={currentTab}
          />
          <div>
            <Grid container>
              <PreferenceDetails>
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                      marginBottom: "20px",
                      width: matches ? "80%" : "65%",
                      // backgroundColor: "red",
                    }}
                  >
                    {/* <div>
                      <span className="MasterHeading">Master</span>
                      <span className="DegreeHeading">Degree</span>
                    </div> */}
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
                    <Grid item xs={3} sm={3} md={3} xl={3} lg={3}>
                      <div
                        style={{
                          display: "flex",
                          fontSize: "12px",
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
          </div>
          <div style={{ margin: "20px" }}>
            <div style={{ margin: "20", color: "#488dff" }}>
              <Grid container>
                <Grid item xl={6} align="left">
                  Sample Graduate Schools and Programs
                </Grid>
              </Grid>
            </div>
          </div>
          {tableData?.length > 0 ? (
            <div style={{ margin: "1rem 2rem 1rem 1rem" }}>
              <PreferenceTabTable
                tableData={tableData}
                currentTab={currentTab}
              />
            </div>
          ) : (
            "No Data Found"
          )}
          <div style={{ marginTop: "500px" }}>
            <BottomContainer
              children={
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
              }
            />
          </div>
          {/* <StyledButton
              variant={"contained"}
              // style={
              //   customTheme["palette"][
              //     disabledUploadButton ? "disabled" : "contained"
              //   ]
              // }
              // onClick={handleUploadClick}
              // disabled={disabledUploadButton}
            >
              {"Upload"}
            </StyledButton> */}
          {/* </BottomContainer> */}
        </RightContainer>
      </Wrapper>
    </div>
  );
}
