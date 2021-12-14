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
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { editPath, createPath } from '../../RoutePaths';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loader from '../../Utils/controls/Loader';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Preview from '../Components/Preview';
import { DrawerContainer } from '../Assets/Styles/WallStyles';
import { ButtonsContainerTwo } from '../Assets/Styles/CreatePostStyles';
import { listWallPosts, deleteWallPost } from '../../../Actions/WallActions';
import { renderListCategory } from '../../Utils/Helpers';

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
  { id: 'category', label: 'Category', disableSorting: true },
  { id: 'createdAt', label: 'Published' },
  { id: 'caption', label: 'Caption', disableSorting: true },
  { id: 'totalLikes', label: 'Likes' },
  { id: 'totalViews', label: 'Views' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function LivePost() {
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

  const { loading, error, posts } = useSelector((state) => state.wallPostListReducer);

  //Filtering out the webinar posts
  let totalPages = posts?.totalPages;
  let filteredPosts = posts?.content?.filter((post) => post.isWebinar !== true);

  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, page } = useTable(
    filteredPosts,
    headCells,
    filterFn,
    totalPages
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else return items.filter((x) => x.caption.toLowerCase().includes(target.value));
      },
    });
  };

  const openInPopup = (item) => {
    setViewData(item);
    setOpenDrawer(!openDrawer);
  };

  const openInPage = (item) => {
    history.push({
      pathname: editPath,
      recordForEdit: item,
      postType: 'Post',
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
     dispatch(listWallPosts('Live', false, page));
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listWallPosts('Live', false, page));
  }, [dispatch, page]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search Posts'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
            text='Create New Post'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              history.push({
                pathname: createPath,
                type: false,
                postType: 'Post',
                postTypeTab: 0,
              });
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          {filteredPosts && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{renderListCategory(item.wallCategories)}</TableCell>
                  <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
                  <TableCell>{`${item.caption.slice(0, 20)}...`}</TableCell>
                  <TableCell>{item.totalLikes}</TableCell>
                  <TableCell>{item.totalViews}</TableCell>
                  <TableCell>
                    <Controls.ActionButton onClick={() => openInPopup(item)}>
                      <VisibilityIcon fontSize='small' color='default' />
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
