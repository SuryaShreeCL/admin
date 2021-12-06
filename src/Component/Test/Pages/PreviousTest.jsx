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
import Drawer from '@material-ui/core/Drawer';
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { testEdit } from '../../RoutePaths';
import moment from 'moment';
import Loader from '../../Utils/controls/Loader';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DrawerContainer } from '../Assets/Styles/WallStyles';
import MuiAlert from '@material-ui/lab/Alert';
import { ButtonsContainerTwo } from '../Assets/Styles/CreateTestStyles';
import { listTests, deleteTest } from '../../../Actions/TestActions';
import ScheduleIcon from '@material-ui/icons/Schedule';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '100%',
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
  { id: 'name', label: 'Test Name' },
  { id: 'duration', label: 'Duration', disableSorting: true },
  { id: 'createdAt', label: 'Date', disableSorting: true },
  { id: 'createdAt', label: 'Published' },
  { id: 'attemptedStudents', label: 'Attempted' },
  { id: 'status', label: 'Status', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function PreviousTest() {
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

  const { loading, error, tests } = useSelector((state) => state.testListReducer);

  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  //Sorting based on most recent test results
  let sortedTests = tests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    sortedTests,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else return items.filter((x) => x.name.toLowerCase().includes(target.value));
      },
    });
  };

  const openInPage = (item) => {
    console.log(item.id);
    history.push({
      pathname: testEdit,
      testId: item.id,
      testType: 'Expired',
    });
    setRecordForEdit(item);
    setOpenDrawer(false);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteTest(id));
    setTimeout(() => {
      dispatch(listTests('Expired'));
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listTests('Expired'));
  }, [dispatch]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search Tests'
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
          {tests && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell style={{ color: '#1093FF' }}>{item.name}</TableCell>
                  <TableCell>
                    <ScheduleIcon
                      fontSize='small'
                      color='primary'
                      style={{ marginRight: '5px', marginBottom: '3px' }}
                    />
                    {item.duration}
                  </TableCell>
                  <TableCell>{moment(item.createdAt).calendar()}</TableCell>
                  <TableCell>{moment(item.createdAt).fromNow()}</TableCell>
                  <TableCell>{item.attemptedStudents}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      disabled={!item.attemptedStudents}
                      href={`${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${item.id}/report`}
                    >
                      <CloudDownloadIcon
                        fontSize='small'
                        style={{
                          color: item.attemptedStudents ? 'green' : 'gray',
                        }}
                      />
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
          {!loading && tests?.length === 0 && <Alert severity='info'>0 Previous Tests Found</Alert>}
        </div>
        <TblPagination />
      </Paper>

      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerContainer>
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
