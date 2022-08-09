// import React from "react";

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
import MbaReportTable from "./MbaReportTable";
import MbaReportGraph from "../../../Asset/Images/MbaReportGraph.png";
import { data } from "jquery";

const footerDescription = [
  {
    name: "Source:",
    description: "As found on respective B-Schools websites",
  },
  {
    name: "Disclaimer:",
    description:
      "The data has been taken from the Class Profiles of respective B-Schools as on March-2021.Refer to the school websites for the latest information",
  },
];

const MyDocument = ({
  preferredProgram = "",
  title = "",
  inTake = "",
  description = "",
  isGreenCardVisible = false,
  isSecondaryPassageVisible = false,
  isTableVisible = false,
  descriptionOne = "",
  descriptionTwo = "",
  tableHeading = "",
  row = [],
  subDescription = "",
  list = [],
  tableHelper = [],
  rowDataLength = 4,
  additionalPoint = [],
  allRoundActivities,
  strength,
  spiderGraphUrl,
}) => (
  <View>
    {/* ------ */}
    {isSecondaryPassageVisible ? (
      <View style={styles.p_15}>
        <Text style={{ ...styles.heading, ...styles.p_10 }}>{title}</Text>
        <Text style={{ ...styles.small, ...styles.p_10 }}>{inTake}</Text>
        <Text style={{ ...styles.small, ...styles.p_15 }}>
          {preferredProgram}
        </Text>
      </View>
    ) : null}

    {/* Table Component */}

    <View style={{ margin: "5px 0px" }}>
      {isTableVisible && (
        <>
          <Text style={{ ...styles.heading, ...styles.p_10 }}>{title}</Text>
          <MbaReportTable
            tableHeading={title}
            rowDataLength={rowDataLength}
            data={row}
            subDescription={subDescription}
            tableHelper={tableHelper}
          />
        </>
      )}
    </View>
    {/* List Component */}
    {isEmpty(strength) && (
      <View>
        <View style={{ ...styles.p_10, ...styles.heading }}>
          <Text style={styles.colorBoxTitle}>{title}</Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.remark}>{descriptionOne}</Text>
        </View>
        {strength.map((item, idx) => (
          <View style={styles.list_wrapper} key={idx.toString()}>
            <View style={styles.list_container}>
              <View style={styles.dot_icon_ash}></View>
              <Text style={styles.list_item}>{item.name}</Text>
            </View>
          </View>
        ))}
      </View>
    )}

    {isEmpty(spiderGraphUrl) && (
      <View style={styles.spider_graph_card} wrap={false}>
        <View style={styles.spider_graph_image_view}>
          <Image
            source={{
              uri: spiderGraphUrl,
            }}
            style={styles.sipder_graph_image}
          />
        </View>
      </View>
    )}
  </View>
);

function isEmpty(data) {
  return data && data.length !== 0;
}

const renderDateTime = (date) => {
  console.log(date);
  const year = new Date(date).getFullYear();
  const month = MONTHS[new Date(date).getMonth()];
  const reportDate = new Date(date).getDate();
  const finalDate = reportDate + " " + month + " " + year;
  console.log(finalDate);

  return finalDate;
};

function MbaReport({ content = [], assessment = [] }) {
  let ReportDate =
    content.find((item) => item.content.dateTime) &&
    content.find((item) => item.content.dateTime).content.dateTime;
  console.log(ReportDate);
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.main_container}>
          <View style={styles.analysis_title_div}>
            <Text style={styles.title}>
              Minutes of the Profile Gap Analysis Session
            </Text>

            <View style={styles.analysis_date_div}>
              <Text style={styles.date}>Date : &nbsp;</Text>
              <Text style={styles.date}>
                {ReportDate ? renderDateTime(ReportDate) : ""}
                {/* {ReportDate || <Text>{renderDateTime(ReportDate)}</Text>} */}
              </Text>
            </View>
          </View>

          <View>
            <Text wrap={true} style={styles.subTitle}>
              This report is the brief summary of the profile gap analysis that
              was done based on your current CV and questionnaire
            </Text>
          </View>

          <View>
            <Text wrap={true} style={styles.list_item}>
              The following is an assessment of your profile based on the
              various admissions criteria that are typically considered by the
              B-schools
            </Text>
          </View>

          {assessment &&
            assessment.map((item, idx) => (
              <View style={styles.list_wrapper} key={idx.toString()}>
                <View>
                  <Text style={styles.highlight_text}>{item.title}</Text>
                </View>
                <View style={styles.list_container}>
                  {/* <Text style={styles.highlight_text}>{item.title}</Text>
                  <Text wrap={true} style={styles.list_item}>
                    {item.description}
                  </Text> */}
                  <Text style={styles.list_item}>{item.description}</Text>
                </View>
              </View>
            ))}
          {content.map((item, idx) => {
            const {
              content,
              table,
              tableSubDescription,
              subDescription,
              descriptionOne,
              descriptionTwo,
              csfs,
              additionalPoint,
              spiderGraphUrl,
            } = item;
            return (
              <MyDocument
                preferredProgram={content.preferredProgram}
                title={item.title}
                inTake={content.inTake}
                description={content.description}
                isSecondaryPassageVisible={
                  isEmpty(item.title) &&
                  isEmpty(content.preferredProgram) &&
                  isEmpty(content.inTake)
                }
                allRoundActivities={additionalPoint}
                strength={additionalPoint}
                descriptionOne={descriptionOne}
                descriptionTwo={descriptionTwo}
                isTableVisible={table.rows && table.rows.length !== 0}
                tableHeading={""}
                row={table.rows}
                rowDataLength={
                  table.rows && table.rows.length > 0 ? table.rows[0].length : 4
                }
                subDescription={subDescription}
                tableHelper={tableSubDescription}
                list={csfs}
                additionalPoint={additionalPoint}
                isEnd={content.length - 1 === idx}
                spiderGraphUrl={spiderGraphUrl}
              />
            );
          })}
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
          {footerDescription.map((data, idx) => (
            <View style={styles.list_wrapper} key={idx.toString()}>
              <View>
                <Text style={styles.footerText}>{data.name}</Text>
              </View>
              <View style={styles.list_container}>
                <Text style={styles.list_item}>{data.description}</Text>
              </View>
            </View>
          ))}
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
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#488DFF",
    fontWeight: "medium",
    padding: "10px 0px",
  },
  heading: {
    color: "#488DFF",
    fontSize: 12,
    fontWeight: "semibold",
  },
  analysis_title_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    marginTop: "5%",
  },

  colorBox: {
    width: "100%",
    backgroundColor: "#E6F3DC",
    minHeight: 100,
    borderRadius: 10,
    padding: 10,
  },
  small: {
    fontSize: 10,
  },
  p_10: {
    padding: "5px 0px",
  },
  p_15: {
    padding: "15px 0px",
  },
  title_container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  degreeName: {
    fontSize: 10,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  colorBoxTitle: {
    fontSize: 10,
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
  subTitle: {
    fontSize: 10,
    marginBottom: "30px",
  },
  footerText: {
    fontSize: 10,
  },
  remark: {
    fontSize: 10,
  },
  analysis_date_div: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    marginLeft: "50%",
    marginTop: "10px",
  },
  date: {
    fontSize: "13px",
    fontWeight: "600",
  },
  footer: { textAlign: "center", padding: 10 },
  dot_icon_ash: {
    backgroundColor: "#a8a8a8",
    marginRight: "5px",
    // marginLeft: "4px",
    height: "10px",
    width: "10px",
    borderRadius: "5px",
  },
  highlight_text: {
    color: "#2bb2ea",
    letterSpacing: "0px",
    fontWeight: "500",
    fontSize: "10px",
    opacity: "1",
    marginRight: "8px",
  },
  spider_graph_image_view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "105%",
    width: "70%",
    marginLeft: "80px",
  },
  spider_graph_image: {
    height: 600,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  spider_graph_card: {
    border: " 2px solid #ac9eca",
    height: "200px",
    width: "515px",
    borderRadius: "6px",
    marginTop: "5px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    lineHeight: "3px",
    padding: "8px",
  },
});

export default MbaReport;
