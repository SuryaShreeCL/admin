import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Container, Divider, H1, H2 } from "../../Assets/StyledComponents";
import PlusButton from "../../Utils/PlusButton";
import TableComponent from "./TableComponent";
import { Dialog } from "@material-ui/core";
import { InputTextField } from "../../Utils/TextField";
import { isEmptyString } from "../../../Component/Validation";

function Index() {
  //   const handleOptions = (text, topicName, topicId) => {
  //     if (text === "Edit") {
  //       this.props.history.push(lms_add_topic + "?topic_id=" + topicId);
  //     }
  //   };
  const [state, setState] = useState({
    show: false,
    passageErr: "",
    descriptionErr: "",
    passage: "",
    description: "",
    openStatus: false,
    clickableStatus: false,
    passageId: null,
    anchorEl: null,
  });
  const {
    show,
    passageErr,
    descriptionErr,
    passage,
    description,
    openStatus,
    clickableStatus,
    passageId,
    anchorEl,
  } = state;
  const handleClickOpen = (e) => {
    setState({
      ...state,
      show: true,
    });
  };

  const handleCancel = (e) => {
    setState({
      show: false,
    });
  };

  const handleThreeDotClick = (event) => {
    // console.log(event.target.id, "dfghjk");
    setState({
      ...state,
      anchorEl: event.currentTarget,
      passageId: event.currentTarget.id,
    });
  };

  const handleClose = () => {
    this.setState({ anchorEl: null, passageId: null });
  };

  const handleOptions = (text, passageId) => {
    if (text === "Edit") {
      setState({
        ...state,
        show: true,
        anchorEl: null,
        passageId: passageId,
      });
    }
  };

  const handleSave = () => {
    let helperTxt = "Please fill the Required Field";
    isEmptyString(passage)
      ? setState({ passageErr: helperTxt })
      : setState({ passageErr: "" });

    isEmptyString(description)
      ? setState({ descriptionErr: helperTxt })
      : setState({ descriptionErr: "" });

    // if (
    //   !isEmptyString(this.state.username) &&
    //   !isEmptyString(this.state.password) &&
    //   !isEmptyArray(this.state.department)
    // ) {
    //   let reqBody = {
    //     id: null, // if updating the user details mean pass the id
    //     username: this.state.username,
    //     password: this.state.password,
    //     userDetails: this.state.department,
    //   };
    //       setState({
    //         snackMsg: "Add sucessfully",
    //         snackOpen: true,
    //         snackVariant: "success",
    //         show: false,
    //       });
    //       this.props.editAdmin(reqBody);
    //       console.log(reqBody);
  };

  const handleUpdate = () => {
    let helperTxt = "Please fill the Required Field";
    isEmptyString(passage)
      ? setState({ passageErr: helperTxt })
      : setState({ passageErr: "" });

    isEmptyString(description)
      ? setState({ descriptionErr: helperTxt })
      : setState({ descriptionErr: "" });

    // if (
    //   !isEmptyString(this.state.username) &&
    //   !isEmptyArray(this.state.department)
    // ) {
    //   let reqBody = {
    //     id: this.state.id, // if updating the user details mean pass the id
    //     username: this.state.username,
    //     password: this.state.password,
    //     userDetails: this.state.department,
    //   };
    //   this.setState({
    //     snackMsg: "Update sucessfully",
    //     snackOpen: true,
    //     snackVariant: "success",
    //     show: false,
    //   });
    //   this.props.editAdmin(reqBody);

    //   console.log(reqBody);
    // }
  };

  const handleEdit = () => {
    // console.log(data, "________________");
    setState({
      passage: passage,
      description: description,
      show: true,
      passageErr: "",
      descriptionErr: "",
      //   id: data.id,
      //   username: data.username,
      //   department: data.departments,
      //   show: true,
      //   passwordEnable: true,
      //   passwordErr: "",
      //   usernameErr: "",
      //   departmentErr: "",
    });
  };

  return (
    <>
      <Container>
        <Grid style={{ minWidth: 0 }} container spacing={3}>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            style={{ marginBottom: "35px" }}
          >
            <Grid item>
              <H1>Passages</H1>
            </Grid>
            <div>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item>
                  <PlusButton onClick={(e) => handleClickOpen()}>
                    Add Passage
                  </PlusButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Divider />
          <Grid item>
            <H2>List of Passages</H2>
          </Grid>
          <TableComponent
            handleThreeDotClick={handleThreeDotClick}
            handleOptions={handleOptions}
            handleClose={handleClose}
            anchorEl={anchorEl}
            passageId={passageId}
          />
        </Grid>
      </Container>
      {console.log(passageId, "ERDFGHJ")}
      <Dialog open={show} maxWidth="sm" fullWidth>
        <DialogTitle>
          <H1>{passageId !== null ? "Edit Passage" : "Add Passage"}</H1>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                color="primary"
                label="Passage Name"
                fullWidth
                // error={passageErr?.length > 0}
                // helperText={passageErr}
                // value={passage}
                // onChange={(e) =>
                //   setState({ passage: e.target.value, passageErr: "" })
                // }
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                rows={3}
                // error={descriptionErr?.length > 0}
                // helperText={descriptionErr}
                // onChange={(e) =>
                //   setState({
                //     description: e.target.value,
                //     descriptionErr: "",
                //   })
                // }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <div style={{ width: "20px" }} />
          <Button
            color="primary"
            variant="contained"
            onClick={passageId !== null ? handleUpdate : handleSave}
          >
            {passageId !== null ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Index;
