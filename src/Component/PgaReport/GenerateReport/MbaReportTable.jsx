import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const MbaReportTable = ({
  data,
  //   row = rowData,
  rowDataLength = 4,
  tableHelper = [],
}) => {
  const PRIMARY = "#488DFF";
  const styles = StyleSheet.create({
    heading: {
      fontSize: 12,
      color: PRIMARY,
      padding: "5px 0px",
    },
    row: {
      display: "flex",
      // flexWrap: "wrap",
      flexDirection: "row",
      //   backgroundColor: "blue",
    },
    th: {
      //   color: PRIMARY,
      fontSize: 12,
      padding: 10,
      border: `1px solid ${PRIMARY}`,
      flex: `0 0 ${100 / rowDataLength}%`,
      maxWidth: `${100 / rowDataLength}%}`,
      textAlign: "center",
      overflow: "hidden",
    },
    td: {
      fontSize: 10,
      border: `1px solid ${PRIMARY}`,
      flex: `0 0 ${100 / rowDataLength}%`,
      maxWidth: `${100 / rowDataLength}%}`,
      textAlign: "center",
      padding: 5,
    },
    table_footer: {
      color: "red",
      fontSize: 8,
      padding: "5px 0px",
      marginBottom: 20,
    },
    table_sub_description: {
      fontSize: 10,
      // padding: 10,
    },
    table_sub_description_container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 5,
    },
    colorBox: {
      width: 10,
      height: 10,
    },
    table_sub_description_inner: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingRight: 10,
    },
  });

  return (
    <View>
      {/* <Text style={styles.heading}>{tableHeading}</Text> */}
      <View>
        {data &&
          data.map((item, idx) => (
            <View style={styles.row}>
              {item.map((item, index) => (
                <Text
                  style={{
                    ...styles.th,
                    color: item.frontColorCode,
                    borderLeftColor: "#488DFF",
                  }}
                >
                  {item.name}
                </Text>
              ))}
            </View>
          ))}
      </View>
      {/* Table Footer */}
      {/* <View>
        {subDescription.length > 0 && (
          <Text style={styles.table_footer}>{subDescription}</Text>
        )}
        <View style={styles.table_sub_description_container}>
          {tableHelper.map((item) => (
            <View style={styles.table_sub_description_inner}>
              <View
                style={{ ...styles.colorBox, backgroundColor: item.colorCode }}
              ></View>
              <Text style={styles.table_sub_description}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View> */}
    </View>
  );
};

export default MbaReportTable;
