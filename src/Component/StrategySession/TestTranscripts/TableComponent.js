import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React, { Fragment } from "react";
import { useStyles } from "./Styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import Pencil from "../../../Asset/Images/pencil.png";

function TableComponent({
  tableData,
  disabled,
  handleDownload,
  handleEdit,
  name,
}) {
  const classes = useStyles();

  const header = {
    GRE: [
      "Attempt #",
      "Exam Date",
      "Verbal Reasoning",
      "Analytical Writing",
      "Quantitative Reasoning",
      "Total",
      "Transcripts",
      "",
      "",
    ],
    GMAT: [
      "Attempt #",
      "Exam Date",
      "Quantitative",
      "Analytical Writing Assessment",
      "Verbal Reasoning",
      "Integrated Reasoning",
      "Total",
      "Transcripts",
      "",
    ],
    IELTS: [
      "Attempt #",
      "Exam Date",
      "Reading",
      "Writing",
      "Speaking",
      "Listening",
      "Total",
      "Transcripts",
      "",
    ],
    TOEFL: [
      "Attempt #",
      "Exam Date",
      "Reading",
      "Writing",
      "Speaking",
      "Listening",
      "Total",
      "Transcripts",
      "",
    ],
  };

  const renderInnerContent = (eachData) => {
    switch (name) {
      case "GRE": {
        return (
          <>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.verbalReasoning}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.analyticalWriting}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.quantitativeReasoning}
            </TableCell>
          </>
        );
      }
      case "GMAT": {
        return (
          <>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.quantitativeReasoning}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.analyticalAssessment}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.verbalReasoning}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.integratedReasoning}
            </TableCell>
          </>
        );
      }
      case "TOEFL": {
        return (
          <>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.reading}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.writing}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.speaking}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.listening}
            </TableCell>
          </>
        );
      }
      case "IELTS": {
        return (
          <>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.readingScore}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.writingScore}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.speakingScore}
            </TableCell>
            <TableCell
              align='center'
              contentEditable={disabled}
              className={classes.tableCellCustomStyle}
            >
              {eachData.listeningScore}
            </TableCell>
          </>
        );
      }
    }
  };

  return tableData && Array.isArray(tableData) && tableData.length !== 0 ? (
    <Fragment>
      <div className={classes.subTextContainer}>
        <div className={classes.subHeadStyle}>{name}</div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {header[name]?.map((item, index) => (
                <TableCell
                  id={`table-cell-${index}`}
                  className={classes.tableCellStyle}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((eachData, index) => {
              return (
                <TableRow>
                  <TableCell
                    align='center'
                    contentEditable={disabled}
                    className={classes.tableCellCustomStyle}
                  >
                    {eachData.attempt}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={classes.tableCellCustomStyle}
                  >
                    {moment(
                      new Date(eachData && eachData.completedExamDate)
                    ).format("MMM yyyy")}
                  </TableCell>
                  {renderInnerContent(eachData)}
                  <TableCell
                    align='center'
                    contentEditable={disabled}
                    className={classes.tableCellCustomStyle}
                  >
                    {eachData.score || eachData.totalScore}
                  </TableCell>
                  <TableCell
                    align='center'
                    contentEditable={disabled}
                    style={{ borderBottom: "none", cursor: "pointer" }}
                  >
                    <div
                      style={{
                        color: "#407BFF",
                        fontSize: 18,
                        fontStyle: "italic",
                      }}
                    >
                      <IconButton onClick={() => handleDownload("GRE", index)}>
                        <GetAppIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <IconButton
                      onClick={() => handleEdit(eachData, index, name)}
                    >
                      <img src={Pencil} height={17} width={17} />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  ) : null;
}

export { TableComponent };
