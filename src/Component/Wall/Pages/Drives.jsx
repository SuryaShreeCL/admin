import React, { useState, useEffect } from 'react';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import useTable from '../../Utils/useTable';
import Controls from '../../Utils/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DescriptionIcon from '@material-ui/icons/Description';
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { editPath, createPath, result, drivePath } from '../../RoutePaths';
import moment from 'moment';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loader from '../../Utils/controls/Loader';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Preview from '../Components/Preview';
import { DrawerContainer } from '../Assets/Styles/WallStyles';
import { ButtonsContainerTwo } from '../Assets/Styles/CreatePostStyles';
import { listWallPosts, deleteWallPost } from '../../../Actions/WallActions';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '65%',
  },
  filterBtn: {
    position: 'absolute',
    right: '250px',
    borderRadius: '26px',
  },
  newButton: {
    position: 'absolute',
    right: '20px',
    borderRadius: '26px',
  },
}));

const headCells = [
  { id: 'eventTitle', label: 'Title', disableSorting: true },
  { id: 'createdAt', label: 'Published' },
  { id: 'description', label: 'Description', disableSorting: true },
  { id: 'totalRegistrations', label: 'Registrations' },
  { id: 'noOfFormFilled', label: 'Form Filled' },
  { id: 'eventDate', label: 'Start Date', disableSorting: true },
  { id: 'eventEndDate', label: 'End Date', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function Drives() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { loading, error, posts } = useSelector((state) => state.wallPostListReducer);
  let totalPages = posts?.totalPages;

  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, page } = useTable(
    posts?.content,
    headCells,
    filterFn,
    totalPages
  );

  const handleSearch = (text) => {
    dispatch(listWallPosts('Live', true, page, text));
  };

  const openInPopup = (item) => {
    setViewData(item);
    setOpenDrawer(!openDrawer);
  };

  const openInPage = (item) => {
    history.push({
      pathname: editPath,
      recordForEdit: item,
      postType: 'Event',
      postTypeTab: 0,
      isDrive: true,
    });
    setOpenDrawer(false);
  };

  const openResultPage = (item) => {
    history.push({
      pathname: drivePath + item.id,
      id: item.id,
    });
    setOpenDrawer(false);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteWallPost(id));
    setTimeout(() => {
      dispatch(listWallPosts('Live', true, page));
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listWallPosts('Live', true, page));
  }, [dispatch, page]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search Events'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e.target.value);
              }
            }}
          />
          <Controls.Button
            text='Create New Event'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              history.push({
                pathname: createPath,
                type: true,
                postType: 'Event',
                postTypeTab: 0,
                isDrive: true,
              });
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          {posts?.content && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{`${item.eventTitle?.slice(0, 25)}..`}</TableCell>
                  <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
                  <TableCell>{`${item.caption?.slice(0, 20)}...`}</TableCell>
                  <TableCell>{item.totalRegistrations ?? 0}</TableCell>
                  <TableCell>{item.noOfFormFilled ?? 0}</TableCell>
                  <TableCell>{moment(item.eventDate).format('MMM Do, hh:mm a')}</TableCell>
                  <TableCell>{moment(item.eventEndDate).format('MMM Do, hh:mm a')}</TableCell>
                  <TableCell>
                    <Controls.ActionButton onClick={() => openInPopup(item)}>
                      <VisibilityIcon fontSize='small' color='default' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      disabled={item.totalRegistrations === null}
                      href={`${process.env.REACT_APP_API_URL}/api/v1/events/${item.id}/export/excel`}
                    >
                      <CloudDownloadIcon
                        fontSize='small'
                        style={{
                          color: `${item.totalRegistrations && 'green'}`,
                        }}
                      />
                    </Controls.ActionButton>
                    <Controls.ActionButton onClick={() => openInPage(item)}>
                      <EditOutlinedIcon fontSize='small' color='primary' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this post?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                      }}
                    >
                      <DeleteIcon fontSize='small' color='secondary' />
                    </Controls.ActionButton>
                    <Controls.ActionButton onClick={() => openResultPage(item)}>
                      <DescriptionIcon fontSize='small' color='primary' />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </TblContainer>
        <div style={{ margin: '2rem auto', width: '60%' }}>
          {loading && <Loader />}
          {error && <Alert severity='error'>{error}</Alert>}
        </div>
        <TblPagination />
      </Paper>

      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerContainer>
          <Preview state={viewData} />
          <ButtonsContainerTwo>
            <span style={{ fontSize: '1rem' }} onClick={() => openInPage(viewData)}>
              <IconButton aria-label='edit'>
                <EditIcon color='primary' size='large' />
              </IconButton>
              Edit
            </span>
            <span
              style={{ fontSize: '1rem' }}
              onClick={() => {
                setOpenDrawer(false);
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to delete this post?',
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
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
}
