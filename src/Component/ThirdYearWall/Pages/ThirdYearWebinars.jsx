import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteWebinarById,
  getAllWebinarList,
} from "../../../Actions/ThirdWebinarAction";
import { createWebinarPath, editWebinarPath } from "../../RoutePaths";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import Controls from "../../Utils/controls/Controls";
import Loader from "../../Utils/controls/Loader";
import Notification from "../../Utils/Notification";
import useTable from "../../Utils/useTable";

const ACTIVE_STATUS = ["Live", "Scheduled", "Expired"];

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { loading, allWebinarList, deleteStatus } = useSelector(
    (state) => state.thirdYearWebinarListReducer
  );

  let totalPages = allWebinarList?.data?.totalPages;

  let filteredWebinars =
    allWebinarList?.data?.content?.filter((webinar) =>
      ACTIVE_STATUS.includes(webinar.activeStatus)
    ) || [];

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
    setPage,
  } = useTable(filteredWebinars, headCells, filterFn, totalPages);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.webinarTitle.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const openInPage = (item) => {
    history.push({
      pathname: `${editWebinarPath}/${item.webinarId}`,
      recordForEdit: item,
      postType: "Webinar",
      postTypeTab: 0,
    });
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    let currentPageContentLength = filteredWebinars.length - 1;
    dispatch(deleteWebinarById(id, currentPageContentLength));
    setDeleteClick(true);
  };

  useEffect(() => {
    if (deleteClick && deleteStatus) {
      if (deleteStatus.success) {
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
        setTimeout(() => {
          if (deleteStatus.currentPageContentLength)
            dispatch(getAllWebinarList(page));
          else {
            let newPage = page - 1 === 0 ? 1 : page - 1;
            dispatch(getAllWebinarList(newPage));
            setPage(newPage);
          }
        }, 1200);
      } else {
        setNotify({
          isOpen: true,
          message: deleteStatus.message,
          type: "error",
        });
      }
      setDeleteClick(false);
    }
  }, [deleteClick, deleteStatus]);

  useEffect(() => {
    dispatch(getAllWebinarList(page));
  }, [dispatch, page]);

  const handleDeleteClick = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: "DELETE WEBINAR?",
      subTitle: `Are you sure you want to delete the selected Event?
        It’wll go longer will be visible on the App.`,
      onConfirm: () => {
        onDelete(item.webinarId);
      },
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search 3rd Year Webinars'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />

          <Controls.Button
            text='Create New Webinar'
            variant='contained'
            color='primary'
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
                return (
                  <TableRow key={item.webinarId}>
                    <TableCell>{`${item.webinarTitle}`}</TableCell>
                    <TableCell>{moment(item.published).fromNow()}</TableCell>
                    <TableCell>{`${item.description?.slice(0, 20) ||
                      ""}...`}</TableCell>
                    <TableCell>{item.activeStatus}</TableCell>
                    <TableCell>
                      {moment(item.startDate).format("MMM Do, hh:mm a")}
                    </TableCell>
                    <TableCell>
                      {moment(item.endDate).format("MMM Do, hh:mm a")}
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <Controls.ActionButton onClick={() => openInPage(item)}>
                        <EditOutlinedIcon fontSize='small' color='primary' />
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
        <div style={{ margin: "2rem auto", width: "60%" }}>
          {!loading && allWebinarList ? (
            allWebinarList.success ? (
              filteredWebinars?.length === 0 && (
                <Alert severity='info'>0 Webinars Found</Alert>
              )
            ) : (
              <Alert severity='error'>{allWebinarList.message}</Alert>
            )
          ) : (
            <Loader />
          )}
        </div>
        <TblPagination />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
