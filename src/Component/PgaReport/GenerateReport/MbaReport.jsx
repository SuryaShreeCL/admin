import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
  PDFDownloadLink,
  Link,
} from "@react-pdf/renderer";
import { MONTHS } from "./Variables";
import "../../../Asset/Report.css";
import MbaReportTable from "./MbaReportTable";
import MbaReportGraph from "../../../Asset/Images/MbaReportGraph.png";

const renderDateTime = (date) => {
  console.log(date);
  const year = new Date(date).getFullYear();
  const month = MONTHS[new Date(date).getMonth()];
  const reportDate = new Date(date).getDate();
  const finalDate = reportDate + " " + month + " " + year;
  console.log(finalDate);

  return finalDate;
};

const footerDescription = [
  {
    name: "Source",
    description: "As found on respective B-Schools websites",
  },
  {
    name: "Disclaimer",
    description:
      "The data has been taken from the Class Profiles of respective B-Schools as on March-2021.Refer to the school websites for the latest information",
  },
];

const Strengths = ({ id, title, descriptionOne, subDescription }) => (
  <View>
    <View style={{ display: "flex" }}>
      <Text style={styles.analysisContentTitleStrength}>{title}</Text>
    </View>
    <View>
      <Text color="textSecondary" style={styles.analysisSessionText}>
        {descriptionOne}
      </Text>
    </View>
    {subDescription.map((item) => (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "2px 0px",
        }}
      >
        <View style={styles.dot_icon_ash}></View>
        <Text style={styles.text_strength}>{item.name}</Text>
      </View>
    ))}
  </View>
);

const ApplicationTime = ({ id, title, intake, program }) => (
  <>
    <View>
      <Text style={styles.analysisContentTitle}>{title}</Text>
    </View>
    <View style={styles.analysis_session_content_title}>
      <Text style={styles.analysisSessionText}>{intake}</Text>

      <Text style={styles.analysisSessionText}>{program}</Text>
    </View>
  </>
);

const RenderAssessmentData = ({ assessmentData }) => (
  <View>
    {/* <View style={styles.analysis_session_subTitle_grid}>
      <Text color="textSecondary" style={styles.analysis_session_subTitle}>
        This report is the brief summary of the profile gap analysis that was
        done based on your current CV and questionnaire
      </Text>
    </View>

    <View style={{ marginBottom: "5px" }}>
      <Text>
        This report is the brief summary of the profile gap analysis that was
        done based on your current CV and questionnaire
      </Text>
    </View>

    {assessmentData &&
      assessmentData.map((item) => {
        console.log(assessmentData);
        return (
          <>
            <View style={styles.session_highlight_grid}>
              <Text style={styles.session_highlight}>{item.title} &nbsp;</Text>
              <Text>{item.description}</Text>
            </View>
          </>
        );
      })}
    <View style={styles.divider} /> */}
  </View>
);

const AllRoundActivities = ({ id, title, subDescription }) => (
  <View>
    <View>
      <Text style={styles.analysisContentTitle}>{title}</Text>
    </View>

    <View style={styles.analysis_session_content_title}>
      <View style={styles.dot_icon_ash} />

      <Text style={styles.analysisSessionText}>{subDescription}</Text>
    </View>
  </View>
);

function MbaReport({ content = [], assessment }) {
  console.log(content);
  let ReportDate =
    content.find((item) => item.content.dateTime) &&
    content.find((item) => item.content.dateTime).content.dateTime;
  console.log(ReportDate);

  return (
    <Document>
      <Page style={styles.body}>
        <View>
          <View style={styles.analysis_title_div}>
            <Text style={styles.title}>
              Minutes of the Profile Gap Analysis Session
            </Text>

            <View style={styles.analysis_date_div}>
              <Text>Date : &nbsp;</Text>
              <Text style={styles.date}>
                {ReportDate || <Text>{renderDateTime(ReportDate)}</Text>}
              </Text>
            </View>
          </View>

          <View style={styles.analysis_session_subTitle_grid}>
            <Text color="textSecondary" style={styles.subTitle}>
              This report is the brief summary of the profile gap analysis that
              was done based on your current CV and questionnaire
            </Text>
          </View>
          <View style={{ marginBottom: "5px" }}>
            <Text style={styles.analysis_session_subTitle}>
              The following is an assessment of your profile based on the
              various admissions criteria that are typically considered by the
              B-schools
            </Text>
          </View>

          {assessment &&
            assessment.map((item) => (
              <View style={styles.container}>
                <Text style={styles.highlight_text}>{item.title} &nbsp;</Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}

          {/* //////////// */}
          {content &&
            content.map((item) => (
              <View>
                {item.additionalPoint.length !== 0 && (
                  <Strengths
                    title={item.title}
                    descriptionOne={item.descriptionOne}
                    subDescription={item.additionalPoint}
                  />
                )}

                {item.content.descriptionOne == "" && (
                  <AllRoundActivities
                    title={item.title}
                    subDescription={item.additionalPoint}
                  />
                )}

                {item.content.preferredProgram !== null && (
                  <ApplicationTime
                    title={item.title}
                    intake={item.content.inTake}
                    program={item.content.preferredProgram}
                  />
                )}

                {/* table */}

                {item.table.rows && item.table.rows.length !== 0 && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.analysisContentTitle}>
                      {item.title}
                    </Text>

                    <MbaReportTable data={item.table.rows} />
                  </View>
                )}
              </View>
            ))}

          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text style={styles.analysisContentTitle}>Average GMAT Score</Text>

            <View>
              <Image src={MbaReportGraph} />
            </View>
          </View>
          {footerDescription.map((data) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "13px",
                  marginRight: "10px",
                }}
              >
                {data.name}:{" "}
              </Text>
              <Text style={styles.analysisSessionText}>{data.description}</Text>
            </View>
          ))}
          {/* /////////// */}
        </View>
        {/* -------------- */}
      </Page>
    </Document>
  );
}

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 65,
    paddingHorizontal: 10,
    padding: 10,
  },
  highlight_text: {
    color: "#2bb2ea",
    letterSpacing: "0px",
    fontWeight: "500",
    fontSize: "13px",
    opacity: "1",
    marginRight: "5px",
  },
  text: {
    fontSize: "13px",
    marginLeft: "10px",
  },
  subTitle: {
    marginBottom: "20px",
    fontSize: "14px",
    fontStyle: "italic !important",
    marginTop: "20px",
  },
  text_strength: {
    fontSize: "13px",
    marginLeft: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "2px",
  },
  title: {
    display: "flex",
    fontSize: 20,
    textAlign: "center",
    color: "#488DFF",
    fontWeight: "medium",
    padding: "10px 0px",
    marginBottom: "2%",
  },
  date: {
    fontSize: "16px",
    fontWeight: "600",
  },
  analysis_session_subTitle_grid: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "3%",
  },
  analysis_session_subTitle: {
    marginBottom: "5px",
    fontSize: "14px",
    fontStyle: "italic !important",
  },
  session_highlight: {
    color: "#2bb2ea",
    letterSpacing: "0px",
    fontWeight: "500",
    fontSize: "13px",
    opacity: "1",
  },
  session_highlight_grid: {
    marginLeft: "3%",
    display: "flex",
    flexDirection: "row",
    lineHeight: "40px",
  },
  analysis_title_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    marginTop: "5%",
  },
  analysis_date_div: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    marginLeft: "50%",
    marginTop: "10px",
  },
  divider: {
    width: "100%",
    height: "0.5px",
    backgroundColor: "ash",
  },
  analysisContentTitle: {
    textAlign: "left",
    letterSpacing: "0px",
    color: "#488dff",
    opacity: "1",
    fontWeight: "700",
    fontSize: "13px",
    marginTop: "2%",
    marginBottom: "2%",
  },
  analysisContentTitleStrength: {
    textAlign: "left",
    letterSpacing: "0px",
    color: "#488dff",
    opacity: "1",
    fontWeight: "700",
    fontSize: "14px",
    marginTop: "2%",
  },
  dot_icon_ash: {
    backgroundColor: "#a8a8a8",
    marginRight: "5px",
    // marginLeft: "4px",
    height: "10px",
    width: "10px",
    borderRadius: "5px",
  },
  analysisSessionText: {
    color: "#333333",
    letterSpacing: "0px",
    fontSize: "13px",
  },
  analysis_session_content_title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "yellow",
    marginTop: "1%",
  },
  card: {
    width: "90%",
    height: "81%",
    background: "#ffffff",
    border: "1px solid #e7e7e7",
    padding: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MbaReport;
