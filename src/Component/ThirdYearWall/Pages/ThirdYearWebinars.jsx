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
} from "@material-ui/core";
import useTable from "../../Utils/useTable";
import Controls from "../../Utils/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Notification from "../../Utils/Notification";
import { useHistory } from "react-router-dom";
import { editPath, createWebinarPath, editWebinarPath } from "../../RoutePaths";
import Loader from "../../Utils/controls/Loader";
import MuiAlert from "@material-ui/lab/Alert";
import ConfirmDialog from "../../Utils/ConfirmDialog";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DrawerContainer } from "../Assets/Styles/WallStyles";
import { ButtonsContainerTwo } from "../Assets/Styles/CreatePostStyles";
import { listWallWebinars, deleteWallPost } from "../../../Actions/WallActions";
import moment from "moment";
import { renderListCategory } from "../../Utils/Helpers";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

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
  actions: {
    width: "140px",
  },
}));

const headCells = [
  { id: "eventTitle", label: "Webinar Title" },
  { id: "published", label: "Published" },
  { id: "caption", label: "Description", disableSorting: true },
  { id: "status", label: "Webinar Status", disableSorting: true },
  { id: "startDate", label: "Start date" },
  { id: "endDate", label: "End date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Webinars() {
  let role = window.sessionStorage.getItem("role");
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

  const wallPostDeleteReducer = useSelector(
    (state) => state.wallPostDeleteReducer
  );

  let totalPages = webinars?.totalPages;

  //fitering out archived webinars
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
  const [deleteClick, setDeleteClick] = useState(false);

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
    history.push({
      pathname: editWebinarPath,
      recordForEdit: item,
      postType: "Webinar",
      postTypeTab: 0,
    });
    setRecordForEdit(item);
    setOpenDrawer(false);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteWallPost(id));
    setTimeout(() => {
      dispatch(listWallWebinars(page, "Live,Draft,Scheduled"));
    }, 1200);
    setDeleteClick(true);
  };

  useEffect(() => {
    if (deleteClick && !wallPostDeleteReducer.loading) {
      if (wallPostDeleteReducer.success) {
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
      } else {
        setNotify({
          isOpen: true,
          message: wallPostDeleteReducer.error,
          type: "error",
        });
      }
      setDeleteClick(false);
    }
  }, [deleteClick, wallPostDeleteReducer]);

  useEffect(() => {
    dispatch(listWallWebinars(page, "Live,Draft,Scheduled"));
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

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder="Search 3rd Year Webinars"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* <Controls.Button
            text='Filter'
            variant='outlined'
            color='default'
            startIcon={<FilterListIcon />}
            className={classes.filterBtn}
          /> */}
          <Controls.Button
            text="Create New Webinar"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              history.push({
                pathname: createWebinarPath,
                type: false,
                postType: "Webinar",
                postTypeTab: 0,
              });
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          {filteredWebinars && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => {
                console.log(item, "item+++");
                return (
                  <TableRow key={item.id}>
                    <TableCell>{`${item.eventTitle}`}</TableCell>
                    <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
                    <TableCell>{`${item.caption.slice(0, 20)}...`}</TableCell>
                    <TableCell>{item.activeStatus}</TableCell>
                    <TableCell>
                      {moment(item.eventDate).format("MMM Do, hh:mm a")}
                    </TableCell>
                    <TableCell>
                      {moment(item.eventEndDate).format("MMM Do, hh:mm a")}
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <Controls.ActionButton onClick={() => openInPage(item)}>
                        <EditOutlinedIcon fontSize="small" color="primary" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        onClick={() => handleDeleteClick(item)}
                      >
                        <DeleteIcon fontSize="small" color="secondary" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </TblContainer>
        <div style={{ margin: "2rem auto", width: "60%" }}>
          {loading && <Loader />}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && filteredWebinars?.length === 0 && (
            <Alert severity="info">0 Webinars Found</Alert>
          )}
        </div>
        <TblPagination />
      </Paper>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerContainer>
          <ButtonsContainerTwo>
            <span
              style={{ fontSize: "1rem" }}
              onClick={() => openInPage(viewData)}
            >
              <IconButton aria-label="edit">
                <EditIcon color="primary" size="large" />
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
              <IconButton aria-label="remove">
                <DeleteIcon color="secondary" size="large" />
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
