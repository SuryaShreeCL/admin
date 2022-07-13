import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Divider, H1, H2 } from "../../Assets/StyledComponents";
import PlusButton from "../../Utils/PlusButton";
import TableComponent from "./TableComponent";
import { Dialog } from "@material-ui/core";
import { isEmptyString } from "../../../Component/Validation";
import { getAllPassages, postAdd, postEdit } from "../../Redux/Action/Passage";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../Utils/TextEditor";
import { EditorBox } from "../../Assets/StyledTest";
import MySnackBar from "../../../Component/MySnackBar";

function Index() {
  const [state, setState] = useState({
    show: false,
    nameErr: null,
    contentErr: null,
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
    nameErr,
    contentErr,
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
  console.log(nameList);
  const passageData = nameList;
  console.log(passageData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPassages());
  }, []);

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
    setState({
      ...state,
      anchorEl: event.currentTarget,
      passageId: event.currentTarget.id,
    });
  };

  const handleClose = () => {
    setState({ anchorEl: null, passageId: null });
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
    isEmptyString(name)
      ? setState({ ...state, nameErr: helperTxt })
      : setState({ ...state, nameErr: "" });

    isEmptyString(content)
      ? setState({ ...state, contentErr: helperTxt })
      : setState({ ...state, contentErr: "" });

    if (!isEmptyString(name) && !isEmptyString(content)) {
      let reqBody = {
        name: name,
        content: content,
      };
      setState({
        ...state,
        snackMsg: "Add sucessfully",
        snackOpen: true,
        snackVariant: "success",
        show: true,
      });
      dispatch(postAdd(reqBody));
    }
  };

  const handleUpdate = () => {
    let helperTxt = "Please fill the Required Field";
    isEmptyString(name)
      ? setState({ nameErr: helperTxt })
      : setState({ nameErr: "" });

    isEmptyString(content)
      ? setState({ contentErr: helperTxt })
      : setState({ contentErr: "" });

    if (!isEmptyString(name) && !isEmptyString(content)) {
      let responseBody = {
        name: name,
        content: content,
        passageId: passageId,
      };
      setState({
        ...state,
        snackMsg: "Update sucessfully",
        snackOpen: true,
        snackVariant: "success",
        show: true,
      });
      dispatch(postAdd(responseBody));
    }
  };

  const handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    setState({ ...state, content: data, contentErr: "" });
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
        </Grid>
      </Container>
      <Dialog open={show} maxWidth="md" fullWidth>
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
                error={nameErr?.length > 0}
                helperText={nameErr}
                value={name}
                onChange={(e) =>
                  setState({
                    ...state,
                    name: e.target.value,
                    nameErr: null,
                  })
                }
              />
            </Grid>
            <Grid item md={12}>
              <EditorBox>
                <TextEditor
                  onChange={(event, editor, contentErr) =>
                    handleDescriptionChange(event, editor, contentErr)
                  }
                  data={content}
                />
              </EditorBox>
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
      <MySnackBar
        snackMsg={snackMsg}
        snackVariant={snackVariant}
        snackOpen={snackOpen}
        onClose={() => setState({ snackOpen: false })}
      />
    </>
  );
}
export default Index;
