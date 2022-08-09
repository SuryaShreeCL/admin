import { StyleSheet, Text, View, Font, Link } from "@react-pdf/renderer";
import React, { useEffect } from "react";

const Table = ({
  tableHeading,
  row,
  rowDataLength,
  subDescription,
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
      borderLeft: "1px solid #488DFF",
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
      flexShrink: 1,
      flexWrap: "wrap",
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
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 5,
    },
    colorBox: {
      width: 10,
      height: 10,
      marginRight: "4px",
    },
    table_sub_description_inner: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingRight: 10,
    },
  });
  Font.registerHyphenationCallback((word) => {
    const middle = Math.floor(word.length);
    const parts =
      word.length === 1
        ? [word]
        : [word.substr(0, middle), word.substr(middle)];

    console.log(word, parts);

    return parts;
  });

  const handleLinkClick = (e) => {
    console.log(e);
  };

  var el = document.getElementById("school_link");
  useEffect(() => {
    if (el) {
      console.log("goooooooooooooooooo");
      el.addEventListener("click", handleLinkClick, false);
    }
  }, [el]);

  return (
    <View>
      <Text style={styles.heading}>{tableHeading}</Text>
      <View>
        {row.map((item, idx) => (
          <View style={styles.row}>
            {item.map((item, index) => {
              let programNameIndex = row[0].findIndex(
                (item) => item.name === "Program Name"
              );
              let isProgramLink =
                programNameIndex > -1 &&
                programNameIndex === index &&
                item.link;
              return (
                <Text
                  style={
                    idx === 0
                      ? {
                          ...styles.th,
                          color: item.frontColorCode,
                          borderLeft: item.colorCode,
                        }
                      : {
                          ...styles.td,
                          color: item.frontColorCode,
                          borderLeft: `3px solid ${item.colorCode}`,
                        }
                  }
                >
                  {isProgramLink ? (
                    <Link
                      src={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
      {/* Table Footer */}
      <View>
        {subDescription.length > 0 ? (
          <Text style={styles.table_footer}>{subDescription}</Text>
        ) : (
          <Text style={{ paddingTop: "100px" }} />
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
      </View>
    </View>
  );
};

export default Table;
