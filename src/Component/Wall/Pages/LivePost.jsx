import React, { useState, useEffect } from 'react';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  IconButton,
} from '@material-ui/core';
import useTable from '../../Utils/useTable';
import Controls from '../../Utils/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../Utils/Popup';
import Drawer from '@material-ui/core/Drawer';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { createPath } from '../../RoutePaths';
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

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const content = [
  {
    id: '1',
    category: 'Science',
    likes: 21,
    posters: [
      {
        link:
          'https://previews.123rf.com/images/kho/kho1406/kho140600092/29092622-beautiful-girl-reading-book-in-the-summer-park-image-toned-.jpg',
      },
      {
        link: 'https://image.freepik.com/free-photo/cute-young-lady-reading-book_23-2148204301.jpg',
      },
      {
        link:
          'https://media.istockphoto.com/photos/beautiful-lady-reading-a-book-picture-id183825490',
      },
    ],
    caption: 'lorem21',
    comments: 44,
  },
  {
    id: '2',
    category: 'Machine Learning',
    likes: 21,
    posters: [
      {
        link:
          'https://previews.123rf.com/images/kho/kho1406/kho140600092/29092622-beautiful-girl-reading-book-in-the-summer-park-image-toned-.jpg',
      },
      {
        link: 'https://image.freepik.com/free-photo/cute-young-lady-reading-book_23-2148204301.jpg',
      },
      {
        link:
          'https://media.istockphoto.com/photos/beautiful-lady-reading-a-book-picture-id183825490',
      },
    ],
    caption: 'lorem31',
    comments: 44,
  },
];

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
  { id: 'id', label: '#' },
  { id: 'category', label: 'Category' },
  { id: 'caption', label: 'Caption' },
  { id: 'likes', label: 'Likes' },
  { id: 'comments', label: 'Comments' },
  { id: 'posters', label: 'Posters' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function LivePost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  const toggleDrawer = () => (item) => {
    console.log('object', item);
    setData(item);
    setOpenDrawer(!openDrawer);
  };

  // const { loading, error, testimonials } = useSelector((state) => state.testimonialListReducer);

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    content,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    // let target = e.target;
    // setFilterFn({
    //   fn: (items) => {
    //     if (target.value == '') return items;
    //     else
    //       return items.filter(
    //         (x) =>
    //           x.studentName.toLowerCase().includes(target.value) ||
    //           x.mixedTag.toLowerCase().includes(target.value) ||
    //           x.products.toLowerCase().includes(target.value)
    //       );
    //   },
    // });
  };

  const addOrEdit = (testimonial) => {
    history.push(createPath);
    // if (!testimonial.id) dispatch(createTestimonial(testimonial));
    // else dispatch(updateTestimonial(testimonial));
    // setOpenPopup(false);
    // setTimeout(() => {
    //   dispatch(listTestimonials());
    // }, 1200);
    // setNotify({
    //   isOpen: true,
    //   message: 'Submitted Successfully',
    //   type: 'success',
    // });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    // setConfirmDialog({
    //   ...confirmDialog,
    //   isOpen: false,
    // });
    // dispatch(deleteTestimonial(id));
    // setTimeout(() => {
    //   dispatch(listTestimonials());
    // }, 1200);
    // setNotify({
    //   isOpen: true,
    //   message: 'Deleted Successfully',
    //   type: 'error',
    // });
  };

  useEffect(() => {
    // dispatch(listTestimonials());
  }, [dispatch]);

  return (
    <>
      {/* {loading && <Loader />} */}
      {/* {error && <Alert severity='error'>{error}</Alert>} */}
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
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
            text='Filter'
            variant='outlined'
            color='default'
            startIcon={<FilterListIcon />}
            className={classes.filterBtn}
            onClick={() => {
              // setOpenPopup(true);
              // setRecordForEdit(null);
            }}
          />
          <Controls.Button
            text='Create New Post'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              // setOpenPopup(true);
              history.push(createPath);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          {content && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.likes}</TableCell>
                  <TableCell>{item.caption}</TableCell>
                  <TableCell>{item.comments}</TableCell>
                  <TableCell>{item?.posters.length}</TableCell>
                  <TableCell>
                    <Controls.ActionButton onClick={toggleDrawer(item)}>
                      <VisibilityIcon fontSize='small' color='default' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize='small' color='primary' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize='small' color='secondary' />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </TblContainer>
        <TblPagination />
      </Paper>
      {/* <Popup title='Add or Edit Testimonial' openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <CreatePost recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup> */}
      <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer()}>
        <DrawerContainer>
          <Preview state={[]} />
          <ButtonsContainerTwo>
            <span style={{ fontSize: '1rem' }}>
              <IconButton aria-label='edit'>
                <EditIcon color='primary' size='large' />
              </IconButton>
              Edit
            </span>
            <span style={{ fontSize: '1rem' }}>
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
