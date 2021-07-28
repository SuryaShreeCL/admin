import React, { useState, useEffect } from 'react';
import TestimonialForm from './TestimonialForm';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core';
import useTable from '../Utils/useTable';
import Controls from '../Utils/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Utils/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../Utils/Notification';
import Loader from '../Utils/controls/Loader';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../Utils/ConfirmDialog';
import { useSelector, useDispatch } from 'react-redux';
import {
  listTestimonials,
  deleteTestimonial,
  createTestimonial,
  updateTestimonial,
} from '../../Actions/TestimonialActions';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  { id: 'studentName', label: 'Student Name' },
  { id: 'program', label: 'Program' },
  { id: 'mixedTag', label: 'Tagging' },
  { id: 'scores.gre', label: 'GRE Score' },
  { id: 'scores.gmat', label: 'GMAT Score' },
  { id: 'products', label: 'Product' },
  { id: 'yop', label: 'Year' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function Testimonials() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { loading, error, testimonials } = useSelector((state) => state.testimonialListReducer);

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    testimonials,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter(
            (x) =>
              x.studentName.toLowerCase().includes(target.value) ||
              x.mixedTag.toLowerCase().includes(target.value) ||
              x.products.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (testimonial) => {
    if (!testimonial.id) dispatch(createTestimonial(testimonial));
    else dispatch(updateTestimonial(testimonial));
    setOpenPopup(false);
    setTimeout(() => {
      dispatch(listTestimonials());
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteTestimonial(id));
    setTimeout(() => {
      dispatch(listTestimonials());
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listTestimonials());
  }, [dispatch]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label='Search Students'
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
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          {testimonials && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item?.program?.acronym}</TableCell>
                  <TableCell>{item?.mixedTag}</TableCell>
                  <TableCell>{item?.scores?.gre}</TableCell>
                  <TableCell>{item?.scores?.gmat}</TableCell>
                  <TableCell>{item?.productList.map((prd) => `${prd} `) ?? []}</TableCell>
                  <TableCell>{item?.yearOfPassing}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color='primary'
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize='small' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color='secondary'
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
                      <CloseIcon fontSize='small' />
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
      <Popup title='Add or Edit Testimonial' openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TestimonialForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
}
