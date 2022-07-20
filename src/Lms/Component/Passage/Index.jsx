import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MySnackBar from "../../../Component/MySnackBar";
import { isEmptyString } from "../../../Component/Validation";
import {
  Container,
  Divider,
  FlexView,
  H1,
  H2,
} from "../../Assets/StyledComponents";
import { EditorBox } from "../../Assets/StyledTest";
import { getAllPassages, postAdd } from "../../Redux/Action/Passage";
import PlusButton from "../../Utils/PlusButton";
import TextEditor from "../../Utils/TextEditor";
import TableComponent from "./TableComponent";
import React from "react";

function Index() {
  const [state, setState] = useState({
    show: false,
    name: null,
    content: null,
    text: "",
    passageId: null,
    anchorEl: null,
    snackMsg: null,
    snackVariant: null,
    snackOpen: false,
  });
  const {
    show,
    name,
    content,
    passageId,
    anchorEl,
    text,
    snackMsg,
    snackVariant,
    snackOpen,
  } = state;

  const { nameList } = useSelector((state) => state.PassageReducer);
  const passageData = nameList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPassages());
  }, []);

  const handleClickOpen = () => {
    setState({
      ...state,
      show: true,
      name: null,
      content: null,
      passageId: null,
      text: "Add",
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      show: false,
    });
  };

  const handleThreeDotClick = (event, data) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      passageId: event.currentTarget.id,
      name: data.name,
      content: data.content,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null,
      passageId: null,
      name: null,
      content: null,
    });
  };

  const handleOptions = (name, passageId) => {
    if (name === "Edit") {
      setState({
        ...state,
        show: true,
        anchorEl: null,
        passageId: passageId,
        text: "Edit",
      });
    }
  };

  const handleSave = () => {
    let helperTxt = "Please fill the Required Field";

    if (!isEmptyString(name) && !isEmptyString(content)) {
      let reqBody = {
        name: name,
        content: content,
      };
      dispatch(
        postAdd(reqBody, (res) => {
          if (res.success) {
            dispatch(getAllPassages());
            setState({
              ...state,
              snackMsg: "Added Successfully",
              snackOpen: true,
              snackVariant: "success",
              show: false,
            });
          } else {
            setState({
              ...state,
              snackMsg: res.message,
              snackOpen: true,
              snackVariant: "error",
            });
          }
        })
      );
    } else {
      setState({
        ...state,
        snackOpen: true,
        snackMsg: helperTxt,
        snackVariant: "error",
      });
    }
  };

  const handleUpdate = () => {
    let helperTxt = "Please fill the required field";
    if (!isEmptyString(name) && !isEmptyString(content)) {
      let responseBody = {
        id: passageId,
        name: name,
        content: content,
      };

      dispatch(
        postAdd(responseBody, (res) => {
          if (res.success) {
            dispatch(getAllPassages());
            setState({
              ...state,
              snackMsg: "Updated Successfully",
              snackOpen: true,
              snackVariant: "success",
              show: false,
            });
          } else {
            setState({
              ...state,
              snackMsg: res.message,
              snackOpen: true,
              snackVariant: "error",
            });
          }
        })
      );
    } else {
      setState({
        ...state,
        snackOpen: true,
        snackMsg: helperTxt,
        snackVariant: "error",
      });
    }
  };

  const handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    setState({ ...state, content: data });
  };

  return (
    <>
      <Container>
        <Grid style={{ minWidth: 0 }} container spacing={3}>
          <Grid
            item
            container
            alignItems='center'
            justifyContent='space-between'
            spacing={2}
            style={{ paddingBottom: "26px" }}
          >
            <Grid item>
              <H1>{"Passage"}</H1>
            </Grid>
            <div>
              <Grid container alignItems='center' spacing={2}>
                <Grid item>
                  <PlusButton onClick={(e) => handleClickOpen()}>
                    {"Add Passage"}
                  </PlusButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Divider style={{ margin: 0 }} />
          {passageData && (
            <TableComponent
              handleThreeDotClick={handleThreeDotClick}
              handleOptions={handleOptions}
              handleClose={handleClose}
              anchorEl={anchorEl}
              passageId={passageId}
              passageData={passageData.data}
            />
          )}
          <Box height={"30px"} />
        </Grid>
      </Container>
      <Dialog open={show} maxWidth='md' fullWidth>
        <DialogTitle>
          <H1>{`${text} Passage`}</H1>
        </DialogTitle>
        <DialogContent style={{ overflowX: "hidden" }}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                variant='outlined'
                color='primary'
                label='Passage Name'
                value={name}
                onChange={(e) =>
                  setState({
                    ...state,
                    name: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <EditorBox>
                <TextEditor
                  onChange={(event, editor) =>
                    handleDescriptionChange(event, editor)
                  }
                  data={content}
                />
              </EditorBox>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider style={{ margin: 0 }} />
        <DialogActions>
          <FlexView gap={"20px"} padding={"20px !important"} width={"300px"}>
            <Button
              color={"primary"}
              variant={"outlined"}
              onClick={handleCancel}
              fullWidth
            >
              {"Cancel"}
            </Button>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={text === "Edit" ? handleUpdate : handleSave}
              fullWidth
            >
              {text === "Edit" ? "Update" : "Save"}
            </Button>
          </FlexView>
        </DialogActions>
      </Dialog>
      <MySnackBar
        snackMsg={snackMsg}
        snackVariant={snackVariant}
        snackOpen={snackOpen}
        onClose={() =>
          setState({
            ...state,
            snackOpen: false,
            snackMsg: "",
            snackVariant: "",
          })
        }
      />
    </>
  );
}
export default Index;
