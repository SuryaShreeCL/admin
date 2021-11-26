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
    <View style={{ ...styles.p_10, ...styles.heading }}>
      <Text style={styles.colorBoxTitle}>{title}</Text>
    </View>
    <View style={{ paddingLeft: 20 }}>
      <Text style={styles.remark}>{descriptionOne}</Text>
    </View>
    {subDescription.map((item, idx) => (
      <View style={styles.list_wrapper} key={idx.toString()}>
        <View style={styles.list_container}>
          <View wrap={true} style={styles.dot_icon_ash}></View>
          <Text wrap={true} style={styles.list_item}>
            {item.name}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

const ApplicationTime = ({ id, title, intake, program }) => (
  <View style={{ lineHeight: "2px" }}>
    <View style={{ ...styles.p_10, ...styles.heading }}>
      <Text style={styles.colorBoxTitle}>{title}</Text>
    </View>
    <View>
      <Text style={styles.remark}>{intake}</Text>

      <Text style={styles.remark}>{program}</Text>
    </View>
  </View>
);

const AllRoundActivities = ({ id, title, subDescription }) => (
  <View>
    <View style={{ ...styles.p_10, ...styles.heading }}>
      <Text style={styles.colorBoxTitle}>{title}</Text>
    </View>

    <View style={styles.list_wrapper}>
      <View style={styles.list_container}>
        <View style={styles.dot_icon_ash}></View>
        <Text style={styles.list_item}>{subDescription}</Text>
      </View>
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
      <Page size={"A4"} style={styles.body}>
        <View style={styles.main_container}>
          <View style={styles.analysis_title_div}>
            <Text style={styles.title}>
              Minutes of the Profile Gap Analysis Session
            </Text>

            <View style={styles.analysis_date_div}>
              <Text style={styles.date}>Date : &nbsp;</Text>
              <Text style={styles.date}>
                {ReportDate ? renderDateTime(ReportDate) : ""}
              </Text>
            </View>
          </View>

          {/* subTitle */}
          <View>
            <Text color="textSecondary" style={styles.subTitle}>
              This report is the brief summary of the profile gap analysis that
              was done based on your current CV and questionnaire
            </Text>
          </View>
          <View>
            <Text style={styles.subTitle1}>
              The following is an assessment of your profile based on the
              various admissions criteria that are typically considered by the
              B-schools
            </Text>
          </View>
          {/* assessment data */}
          <View>
            {assessment &&
              assessment.map((item, idx) => (
                <View style={styles.list_wrapper} key={idx.toString()}>
                  <View style={styles.list_container}>
                    <Text wrap={true} style={styles.highlight_text}>
                      {item.title}
                    </Text>
                    <Text wrap={true} style={styles.list_item}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
          </View>

          {/* content */}
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
                    <View style={{ ...styles.p_10, ...styles.heading }}>
                      <Text style={styles.colorBoxTitle}>{item.title}</Text>
                    </View>

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
            <View style={{ ...styles.p_10, ...styles.heading }}>
              <Text style={styles.colorBoxTitle}>Average GMAT Score</Text>
            </View>
            <View>
              <Image src={MbaReportGraph} />
            </View>
          </View>
          {/* footer description */}
          <View>
            {footerDescription.map((data) => (
              <View style={styles.list_wrapper}>
                <View style={styles.list_container}>
                  <Text style={styles.list_item}>{data.name}</Text>
                  <Text wrap={true} style={styles.list_item}>
                    {data.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    padding: 20,
  },
  main_container: {
    padding: 20,
    borderLeft: "2px solid black",
    borderRight: "2px solid black",
    borderTop: "2px solid black",
    borderBottom: "2px solid black",
  },
  analysis_title_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    marginTop: "5%",
  },
  title: {
    display: "flex",
    fontSize: 18,
    textAlign: "center",
    color: "#488DFF",
    fontWeight: "medium",
    padding: "10px 0px",
    marginBottom: "2%",
  },
  dot_icon_ash: {
    backgroundColor: "#a8a8a8",
    marginRight: "5px",
    // marginLeft: "4px",
    height: "10px",
    width: "10px",
    borderRadius: "5px",
  },
  analysis_date_div: {
    display: "flex",
    flexDirection: "row",
    // position: "relative",
    marginLeft: "50%",
    marginTop: "3px",
  },
  remark: {
    fontSize: 10,
  },
  date: {
    fontSize: "11px",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: "10px",
    textAlign: "center",
    flexWrap: "wrap",
    fontStyle: "italic",
    marginTop: "10px",
    marginBottom: "10px",
  },
  list_item: {
    fontSize: 10,
    paddingLeft: 3,
    marginTop: "5%",
    backgroundColor: "pink",
  },
  highlight_text: {
    color: "#2bb2ea",
    letterSpacing: "0px",
    marginRight: "8px",
    fontSize: "10px",
    opacity: "1",
  },
  list_wrapper: {
    margin: "5px 0px",
  },
  list_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    margin: "5px 0px",
  },
  list_item: {
    fontSize: 10,
    paddingLeft: 5,
  },
  colorBox: {
    width: "100%",
    backgroundColor: "#E6F3DC",
    minHeight: 100,
    borderRadius: 10,
    padding: 10,
  },
  p_10: {
    padding: "5px 0px",
  },
  heading: {
    color: "#488DFF",
    fontSize: 12,
    fontWeight: "semibold",
    marginTop: "5px !important",
    marginBottom: "10px !important",
  },
  assessmentData_div: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "20px",
  },

  list_item: {
    fontSize: 10,
    paddingLeft: 5,
  },
  text: {
    fontSize: "10px",
  },
  subTitle1: {
    fontSize: "10px",
    marginTop: "10px",
  },
  analysisSessionText: {
    color: "#333333",
    letterSpacing: "0px",
    fontSize: "10px",
  },
});

export default MbaReport;
