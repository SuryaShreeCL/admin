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
import Table from "./Table";
import Star from "../../../Asset/Images/starIcon.png";
import ProfileBuilding from "../../../Asset/Images/MSProfileBuilding.jpg";
import { MONTHS } from "./Variables";

const MyDocument = ({
  preferredProgram = "",
  title = "",
  inTake = "",
  description = "",
  isGreenCardVisible = false,
  isSecondaryPassageVisible = true,
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
  spiderGraph,
}) => (
  <View>
    {/* Top Color Box */}
    {isGreenCardVisible && (
      <View style={styles.colorBox} wrap={true}>
        <View style={styles.title_container}>
          <Text style={{ ...styles.small }} wrap={true}>
            Current most preferred program and area of specialization:
          </Text>
          <Text style={styles.degreeName} wrap={true}>
            {preferredProgram}
          </Text>
        </View>
        <View style={{ ...styles.p_10, ...styles.heading }}>
          <Text style={styles.colorBoxTitle}>{title}</Text>
        </View>
        <View style={styles.p_10}>
          <Text style={styles.colorBoxTitle}>{inTake}</Text>
        </View>
        <View style={styles.p_10}>
          <Text style={styles.colorBoxTitle}>{description}</Text>
        </View>
      </View>
    )}

    {/* ------ */}
    {/* {isSecondaryPassageVisible ? (
      <>
        <View style={styles.p_15}>
          <Text style={{ ...styles.heading, ...styles.p_10 }}>{title}</Text>
          <Text style={{ ...styles.small, ...styles.p_10 }}>
            {descriptionOne}
          </Text>
          <Text style={{ ...styles.small, ...styles.p_15 }}>
            {descriptionTwo}
          </Text>
        </View>
      </>
    ) : null} */}

    {/* Table Component */}
    <View style={{ margin: "5px 0px" }}>
      {isTableVisible && (
        <Table
          tableHeading={title}
          rowDataLength={rowDataLength}
          row={row}
          subDescription={subDescription}
          tableHelper={tableHelper}
        />
      )}
    </View>
    {/* List Component */}
    {isEmpty(list) && (
      <View>
        <View style={{ ...styles.p_10, ...styles.heading }}>
          <Text style={styles.colorBoxTitle}>{title}</Text>
        </View>
        {list.map((item, idx) => (
          <View style={styles.list_wrapper} key={idx.toString()}>
            <View style={styles.list_container}>
              <Image src={Star} style={{ width: 14 }} />
              <Text style={styles.list_item}>{item.name}</Text>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.remark}>{item.remark}</Text>
            </View>
          </View>
        ))}
        <View style={styles.p_10}>
          <Image src={ProfileBuilding} />
        </View>
      </View>
    )}

    {isEmpty(additionalPoint) && (
      <View>
        <View style={{ ...styles.p_10, ...styles.heading }}>
          <Text style={styles.colorBoxTitle}>{title}</Text>
        </View>
        {additionalPoint.map((item, idx) => (
          <View style={styles.list_wrapper} key={idx.toString()}>
            <View style={styles.list_container}>
              <Image src={Star} style={{ width: 14 }} />
              <Text style={styles.list_item}>{item.name}</Text>
            </View>
          </View>
        ))}
      </View>
    )}

    {isEmpty(spiderGraph) && (
      <>
        <View style={{ ...styles.p_10, ...styles.heading }}>
          <Text style={styles.colorBoxTitle}>{title}</Text>
        </View>
        <Text style={{ ...styles.small, ...styles.p_10 }}>
          {descriptionOne}
        </Text>
        <Text style={{ ...styles.small, ...styles.p_15 }}>
          {descriptionTwo}
        </Text>
        {spiderGraph.map((data) => (
          <View style={styles.spider_graph_card} wrap={false}>
            <View style={styles.plan_left_view}>
              <Text style={styles.spider_graph_left_title}>Career Plan</Text>
              <Text style={styles.spider_graph_left_title}>
                Preferred Career Track
              </Text>
              <Text style={styles.spider_graph_left_title}>
                Course Selection 1
              </Text>
              <Text style={styles.spider_graph_left_title}>
                Course Selection 2
              </Text>
            </View>
            <View style={styles.plan_right_view}>
              <Text style={styles.spider_graph_left_title_text}>
                {data.plan}
              </Text>
              <Text style={styles.spider_graph_left_title_text}>
                {data.career}
              </Text>
              <Text style={styles.spider_graph_left_title_text}>
                {data.courseOne}
              </Text>
              <Text style={styles.spider_graph_left_title_text}>
                {data.courseTwo}
              </Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.graph_image_view}>
              <Image
                source={{
                  uri: data.spiderGraphUrl,
                }}
                style={styles.graph_image}
              />
            </View>
          </View>
        ))}
      </>
    )}
  </View>
);

function isEmpty(data) {
  return data && data.length !== 0;
}

const renderDateTime = (date) => {
  const year = new Date(date).getFullYear();
  const month = MONTHS[new Date(date).getMonth()];
  const reportDate = new Date(date).getDate();
  const finalDate = reportDate + " " + month + " " + year;

  return finalDate;
};

function MsReport({ content = [] }) {
  let ReportDate =
    content.find((item) => item.content.dateTime) &&
    content.find((item) => item.content.dateTime).content.dateTime;
    console.log(content)
  return (
    <Document>
      <Page style={styles.body} wrap>
        <View style={styles.main_container} wrap={true}>
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

          {content &&
            content.map((item, idx) => {
              const {
                content,
                table,
                tableSubDescription,
                subDescription,
                descriptionOne,
                descriptionTwo,
                csfs,
                additionalPoint,
                spiderGraph,
              } = item;

              return (
                <MyDocument
                  preferredProgram={content.preferredProgram}
                  title={item.title}
                  inTake={content.inTake}
                  description={content.description}
                  isGreenCardVisible={
                    content.inTake ||
                    content.description ||
                    content.preferredProgram ||
                    content.title
                  }
                  isSecondaryPassageVisible={
                    isEmpty(content.title) &&
                    isEmpty(descriptionOne) &&
                    isEmpty(descriptionTwo)
                  }
                  isTableVisible={table.rows && table.rows.length !== 0}
                  descriptionOne={descriptionOne}
                  descriptionTwo={descriptionTwo}
                  tableHeading={""}
                  row={table.rows}
                  rowDataLength={
                    table.rows && table.rows.length > 0
                      ? table.rows[0].length
                      : 4
                  }
                  subDescription={subDescription}
                  tableHelper={tableSubDescription}
                  list={csfs}
                  additionalPoint={additionalPoint}
                  isEnd={content.length - 1 === idx}
                  spiderGraph={spiderGraph}
                />
              );
            })}
          <View style={styles.footer}>
            <Text style={styles.small}>
              Do write to us at <Link> msconsulting@thecareerlabs.com</Link> if
              you have any queries or concerns.
            </Text>
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
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#488DFF",
    fontWeight: "medium",
    padding: "10px 0px",
  },
  main_container: {
    padding: 20,
    borderLeft: "2px solid black",
    borderRight: "2px solid black",
    borderTop: "2px solid black",
    borderBottom: "2px solid black",
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
  spider_graph_card: {
    border: " 2px solid #ac9eca",
    height: "150px",
    width: "515px",
    borderRadius: "6px",
    marginTop: "5px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    lineHeight: "3px",
    padding: "8px",
  },
  spider_graph_left_title: {
    fontSize: 10,
    color: "#a9a9a9",
    lineHeight:2,
    // backgroundColor:"red"
  },
  spider_graph_left_title_text: {
    fontSize: 10,
    lineHeight: 2,
    display: "flex",
    overflow: "hidden",
    // backgroundColor:"green"
  },
  verticalLine: {
    height: "90%",
    width: 1,
    backgroundColor: "#909090",
    // marginLeft: "39px",
    alignItems: "center",
    display: "flex",
  },
  graph_image_view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "70%",
  },
  graph_image: {
    height: 300,
    width: 200,
  },
  plan_left_view: {
    padding: "1%",
    width: "35%",
    lineHeight: 2,
  },
  plan_right_view: {
    padding: "1%",
    display: "flex",
  },
});

export default MsReport;
