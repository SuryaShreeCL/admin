import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { Divider, FlexView, SubTitle } from "../../../Assets/StyledComponents";

function Popup({
  open,
  title,
  onCancel,
  onSave,
  onPreview,
  onUpload,
  children,
  disabledOnSave,
  disabledOnUpload,
  isAddStudyPlanMonth,
}) {
  return (
    <Dialog open={open} maxWidth={"md"} fullWidth>
      <DialogTitle style={{ padding: "24px" }}>
        <SubTitle>{title}</SubTitle>
      </DialogTitle>
      <Divider style={{ margin: 0 }} />
      <DialogContent>{children}</DialogContent>
      <Divider style={{ margin: 0 }} />
      <DialogActions>
        <FlexView
          gap={"25px"}
          padding={"15px 20px !important"}
          minWidth={"300px"}
        >
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={onCancel}
            fullWidth
          >
            {"Cancel"}
          </Button>

          {isAddStudyPlanMonth ? (
            <Button
              color={"primary"}
              variant={"contained"}
              className={"button-style"}
              onClick={onSave}
              disabled={disabledOnSave}
              fullWidth
            >
              {"Save"}
            </Button>
          ) : (
            <>
              <Button
                color={"primary"}
                variant={"contained"}
                title={"Preview Template for study plan"}
                onClick={onPreview}
                fullWidth
              >
                {"Preview"}
              </Button>
              <Button
                color={"primary"}
                variant={"contained"}
                onClick={onUpload}
                disabled={disabledOnUpload}
                fullWidth
              >
                {"Upload"}
              </Button>
            </>
          )}
        </FlexView>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
