import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import "../../../src/Asset/StyledComponents/Styles";
import CustomButton from "../../CommonComponents/CustomButton";
import React, { useState } from "react";
import {
  AddedData,
  Category,
  TableData,
  TableRow,
  TableRows,
  VerticalTable,
  VerticalTableHead,
} from "../../Asset/StyledComponents/Styles";
import { preferenceListHeader } from "../../Utils/Data";
import { COLORS } from "../../Utils/Shared";
import { useStyles } from "./Styles";
import "../../Asset/schoolResearch.css";
import { addRecommendationAction } from "../../Actions/SchoolResearchAction";
import { useDispatch } from "react-redux";
export default function PreferenceTabTable(tableData) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = (
    event,
    universityId,
    opsAddToRecommend,
    programNameId,
    studentAddToRecommend,
    regionId
  ) => {
    let obj = {
      programNameId: programNameId,
      universityId: universityId,
      opsAddToRecommend: opsAddToRecommend,
    };
    console.log(
      programNameId,
      opsAddToRecommend,
      universityId,
      "*****************"
    );
    dispatch(
      addRecommendationAction(
        "3c3b4bee-aab8-462b-9222-9fe30a576734",
        "c46ccdff-0ce7-4b60-95d7-fc6b8a109646",
        obj,
        tableData?.currentTab
      )
    );
  };
  return (
    <div className="GraduationListTable">
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
        <VerticalTable>
          <div className={tableData?.tableData > 5 ? "scrollingTable" : ""}>
            <TableRows>
              {/* Table Header */}
              <VerticalTableHead>{"Category"}</VerticalTableHead>
              {preferenceListHeader.map((item) =>
                item.headerLabel === "Region" ? (
                  <VerticalTableHead> Region</VerticalTableHead>
                ) : item.headerLabel === "Action" ? (
                  <VerticalTableHead
                    style={{ borderLeft: "none" }}
                  ></VerticalTableHead>
                ) : (
                  <VerticalTableHead> {item.headerLabel}</VerticalTableHead>
                )
              )}
            </TableRows>
            {tableData?.tableData &&
              tableData?.tableData.map(
                ({
                  opsAddToRecommend,
                  universityName,
                  programName,
                  region,
                  categoryName,
                  studentAddToRecommend,
                  programNameId,
                  universityId,
                  regionId,
                }) => (
                  <TableRow>
                    {/* Table Data */}
                    <Category>{categoryName ? categoryName : "NA"}</Category>
                    <TableData>
                      {universityName ? universityName : "NA"}
                    </TableData>
                    <TableData>
                      {programName ? (
                        <Link
                          href={programName}
                          underline="always"
                          color={COLORS.linkColor}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {programName}
                        </Link>
                      ) : (
                        "NA"
                      )}
                    </TableData>
                    <TableData>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        {region ? region : "NA"}{" "}
                      </div>
                    </TableData>
                    <AddedData style={{ borderLeft: "none" }}>
                      <CustomButton
                        children={opsAddToRecommend ? "Add" : "Added"}
                        onClick={(event) =>
                          handleClick(
                            event,
                            universityId,
                            opsAddToRecommend,
                            programNameId,
                            studentAddToRecommend,
                            regionId
                          )
                        }
                        className={
                          opsAddToRecommend
                            ? classes.addedButton
                            : classes.addButton
                        }
                      />
                    </AddedData>
                  </TableRow>
                )
              )}
          </div>
        </VerticalTable>
      </Grid>
    </div>
  );
}
