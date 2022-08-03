import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import useTable from "../../Utils/useTable";
import Controls from "../../Utils/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Notification from "../../Utils/Notification";
import { useHistory } from "react-router-dom";
import { editPath, createPath } from "../../RoutePaths";
import Loader from "../../Utils/controls/Loader";
import MuiAlert from "@material-ui/lab/Alert";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Preview from "../Components/Preview";
import { DialogDiv, DrawerContainer } from "../Assets/Styles/WallStyles";
import {
  ButtonsContainerTwo,
  VideoPlayerDiv,
} from "../Assets/Styles/CreatePostStyles";
import {
  listWallWebinars,
  deleteWallPost,
  postRecordedVideoUrl,
} from "../../../Actions/WallActions";
import { renderListCategory } from "../../Utils/Helpers";
import { isLms_Role } from "../WallLanding";
import LinkIcon from "@material-ui/icons/Link";
import "../Assets/../../../Asset/RecordedVideo.css";
import VideoPlayer from "../../../Lms/Utils/VideoPlayer";
import { getVideoInfo } from "../../../Lms/Redux/Action/CourseMaterial";
import { connect } from "react-redux";

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "65%",
  },
  filterBtn: {
    position: "absolute",
    right: "250px",
    borderRadius: "26px",
  },
  newButton: {
    position: "absolute",
    right: "20px",
    borderRadius: "26px",
  },
}));

const headCells = [
  { id: "category", label: "Category", disableSorting: true },
  { id: "eventTitle", label: "Title" },
  { id: "caption", label: "Caption", disableSorting: true },
  { id: "studentWallWebinar", label: "Registered" },
  { id: "createdDate", label: "Date of upload" },
  { id: "uploadedBy", label: "Uploded by" },
  { id: "status", label: "Status", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Webinars(props) {
  let role = window.sessionStorage.getItem("department");
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { loading, error, webinars } = useSelector(
    (state) => state.wallWebinarListReducer
  );
  let totalPages = webinars?.totalPages;

  // Filtering out archived webinars
  let filteredWebinars = webinars?.content?.filter(
    (webinar) => webinar.activeStatus !== "Archive"
  );

  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    page,
  } = useTable(filteredWebinars, headCells, filterFn, totalPages);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.eventTitle.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const openInPage = (item) => {
    if (!item.isEditable) {
      setNotify({
        isOpen: true,
        message: "Only the creator can edit the post",
        type: "Error",
      });
    } else {
      history.push({
        pathname: editPath,
        recordForEdit: item,
        postType: "Webinar",
        postTypeTab: isLms_Role(role) ? 0 : 4,
      });
      setRecordForEdit(item);
      setOpenDrawer(false);
    }
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteWallPost(id));
    setTimeout(() => {
      dispatch(listWallWebinars(page, "Expired"));
    }, 1200);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  useEffect(() => {
    dispatch(listWallWebinars(page, "Expired"));
  }, [dispatch, page]);

  const handleDeleteClick = (item) => {
    if (!item.isEditable) {
      setNotify({
        isOpen: true,
        message: "Only the creator can delete the post",
        type: "Error",
      });
    } else {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure to delete this post?",
        subTitle: "You can't undo this operation",
        onConfirm: () => {
          onDelete(item.id);
        },
      });
    }
  };

  const [activeDialogId, setActiveDialogId] = useState("");
  const [linkField, setLinkField] = useState("");
  const [videoObj, setVideoObj] = useState({ playBackInfo: "", otp: "" });

  const handleLinkClick = (e, recordedVideo) => {
    setActiveDialogId(e.target.id);
    setLinkField(recordedVideo);
  };

  const handleDialogClose = () => {
    setActiveDialogId("");
    setLinkField("");
    setVideoObj({ playBackInfo: "", otp: "" });
  };

  const handleLinkFieldChange = (e) => {
    setLinkField(e.target.value);
    setVideoObj({ playBackInfo: "", otp: "" });
  };

  const handleSaveClick = () => {
    dispatch(
      postRecordedVideoUrl(activeDialogId, linkField, (res) => {
        if (res.success) {
          setLinkField("");
          handleDialogClose();
          dispatch(listWallWebinars(page, "Expired"));
        } else {
          setNotify({
            isOpen: true,
            message: res.message,
            type: "Error",
          });
        }
      })
    );
  };

  const handlePreviewClick = () => {
    let deptName = window.sessionStorage.getItem("department");
    deptName !== "assessment_engine_admin" &&
      props.getVideoInfo(linkField, (res) => {
        console.log(res);
        if (res.playbackInfo && res.otp)
          setVideoObj({ playBackInfo: res.playbackInfo, otp: res.otp });
        else {
          setNotify({
            isOpen: true,
            message: res.message,
            type: "Error",
          });
        }
      });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search Recorded Videos'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          {filteredWebinars && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {renderListCategory(item.wallCategories)}
                    </TableCell>
                    <TableCell>{`${item.eventTitle}`}</TableCell>
                    <TableCell>{`${item.caption.slice(0, 20)}...`}</TableCell>
                    <TableCell>{item.studentWallWebinar.length}</TableCell>
                    <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell>{item.activeStatus}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        id={item.id}
                        onClick={(e) =>
                          handleLinkClick(e, item.webinarRecordingsVideoUrl)
                        }
                      >
                        <LinkIcon
                          id={item.id}
                          fontSize='small'
                          color={
                            item.webinarRecordingsVideoUrl ? "primary" : ""
                          }
                        />
                      </Controls.ActionButton>

                      <Controls.ActionButton
                        onClick={() => handleDeleteClick(item)}
                      >
                        <DeleteIcon fontSize='small' color='secondary' />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </TblContainer>

        <Dialog
          open={activeDialogId}
          onClose={handleDialogClose}
          aria-labelledby='form-dialog-title'
          maxWidth={"md"}
          fullWidth
        >
          <DialogTitle id='form-dialog-title'>Recorded Video Url</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Enter the URL'
              fullWidth
              value={linkField}
              onChange={handleLinkFieldChange}
            />

            {videoObj.otp && (
              <VideoPlayerDiv>
                <VideoPlayer
                  playBackInfo={videoObj.playBackInfo}
                  otp={videoObj.otp}
                />
              </VideoPlayerDiv>
            )}
          </DialogContent>
          <DialogActions>
            <Controls.ActionButton
              onClick={handleDialogClose}
              color='Secondary'
            >
              Cancel
            </Controls.ActionButton>
            <Controls.ActionButton
              onClick={() => handleSaveClick()}
              color='primary'
            >
              Save
            </Controls.ActionButton>
            <Controls.ActionButton
              onClick={() => handlePreviewClick()}
              color='primary'
            >
              Preview
            </Controls.ActionButton>
          </DialogActions>
        </Dialog>

        <DialogDiv>
          {loading && <Loader />}
          {error && <Alert severity='error'>{error}</Alert>}
          {!loading && filteredWebinars?.length === 0 && (
            <Alert severity='info'>0 Webinars Found</Alert>
          )}
        </DialogDiv>
        <TblPagination />
      </Paper>

      <Drawer
        anchor='right'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerContainer>
          <Preview state={viewData} />
          <ButtonsContainerTwo>
            <span
              style={{ fontSize: "1rem" }}
              onClick={() => openInPage(viewData)}
            >
              <IconButton aria-label='edit'>
                <EditIcon color='primary' size='large' />
              </IconButton>
              Edit
            </span>
            <span
              style={{ fontSize: "1rem" }}
              onClick={() => {
                setOpenDrawer(false);
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this post?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    onDelete(viewData.id);
                  },
                });
              }}
            >
              <IconButton aria-label='remove'>
                <DeleteIcon color='secondary' size='large' />
              </IconButton>
              Remove
            </span>
          </ButtonsContainerTwo>
        </DrawerContainer>
      </Drawer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default connect(() => {}, { getVideoInfo })(Webinars);
