import { Box, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CustomDropZone from "../../../../Component/Utils/controls/CustomDropZone";
import { Typo } from "../../../../Component/Utils/controls/Styles";
import { FlexView } from "../../../Assets/StyledComponents";
import React from "react";

function UploadStudyPlan({
  file,
  disabled,
  onDrop,
  onDelete,
  planName,
  planDuration,
}) {
  const leftText = (text) => (
    <Typo variant={"subtitle1"} color={"#052a4e"}>
      {text}
    </Typo>
  );
  const rightText = (text) => (
    <Typo
      variant={"subtitle1"}
      color={"#052a4e"}
      fontWeight={600}
      style={textOverflowStyle}
    >
      {text}
    </Typo>
  );

  return (
    <Box padding={"20px 0px 40px !important"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FlexView gap={"20px"}>
            <div>
              <FlexView gap={"10px"}>
                {leftText("Plan Name: ")}
                {rightText(planName)}
              </FlexView>
            </div>
            <div>
              <FlexView gap={"10px"}>
                {leftText("Plan Duration: ")}
                {rightText(planDuration ? `${planDuration} month` : "NA")}
              </FlexView>
            </div>
          </FlexView>
        </Grid>
        <Grid item xs={12}>
          <CustomDropZone
            acceptTypes={
              "text/csv , application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
            onDrop={onDrop}
            disabled={disabled}
          />
          <FlexView justifyContent={"end"}>
            {file?.name && (
              <>
                <Typo variant={"caption"} color={"#333333"}>
                  {file.name}
                </Typo>
                <IconButton onClick={onDelete}>
                  <DeleteIcon
                    style={{
                      padding: "2px !important",
                    }}
                    color={"error"}
                  />
                </IconButton>
              </>
            )}
          </FlexView>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UploadStudyPlan;

const textOverflowStyle = {
  maxWidth: 400,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
