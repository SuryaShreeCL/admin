import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import React from "react";
import { useDispatch } from "react-redux";
import "../../../src/Asset/StyledComponents/Styles";
import { addRecommendationAction } from "../../Actions/SchoolResearchAction";
import "../../Asset/schoolResearch.css";
import {
  AddedData,
  Category,
  TableData,
  TableRow,
  TableRows,
  VerticalTable,
  VerticalTableHead,
} from "../../Asset/StyledComponents/Styles";
import CustomButton from "../../CommonComponents/CustomButton";
import { preferenceListHeader } from "../../Utils/Data";
import { COLORS } from "../../Utils/Shared";
import { useStyles } from "./Styles";
export default function PreferenceTabTable(tableData) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = (universityId, opsAddToRecommend, programNameId) => {
    let obj = {
      programNameId: programNameId,
      universityId: universityId,
      opsAddToRecommend: opsAddToRecommend,
    };
    console.log(
      programNameId,
      universityId,
      opsAddToRecommend,
      "******************************obj"
    );
    dispatch(
      addRecommendationAction(
        tableData?.props?.studentId,
        tableData?.props?.productId,
        obj,
        tableData?.currentTab
      )
    );
    console.log(obj, "***********************************obj");
    console.log("**************************************handleClick");
  };
  console.log(
    tableData?.buttonDisabled,
    "****************************tableDataButton"
  );
  console.log("rendering element 4");
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
                    {console.log(
                      universityId,
                      "*****************************************uni"
                    )}
                    <Category>{categoryName ? categoryName : "NA"}</Category>
                    <TableData>
                      {universityName ? universityName : "NA"}
                    </TableData>
                    <TableData>
                      {programName ? (
                        <Link
                          href="#"
                          // href={programName}
                          underline="always"
                          color={COLORS.linkColor}
                          // target="_blank"
                          // rel="noopener noreferrer"
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
                        onClick={(event) =>
                          handleClick(
                            universityId,
                            opsAddToRecommend,
                            programNameId
                          )
                        }
                        disabled={tableData?.buttonDisabled}
                        className={
                          opsAddToRecommend
                            ? classes.addButton
                            : classes.addButton
                        }
                      >
                        {opsAddToRecommend ? "Added" : "Add"}
                      </CustomButton>
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
