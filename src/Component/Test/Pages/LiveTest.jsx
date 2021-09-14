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
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { testCreate, testEdit } from '../../RoutePaths';
import moment from 'moment';
import Loader from '../../Utils/controls/Loader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DrawerContainer } from '../Assets/Styles/WallStyles';
import { ButtonsContainerTwo } from '../Assets/Styles/CreateTestStyles';
import { listTests, deleteTest } from '../../../Actions/TestActions';
import { renderListCategory } from '../../Utils/Helpers';
import ScheduleLater from '../Components/ScheduleLater';

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
  { id: 'testName', label: 'Test Name' },
  { id: 'category', label: 'Category' },
  { id: 'duration', label: 'Duration' },
  { id: 'created', label: 'Created On' },
  { id: 'createdby', label: 'Created By' },
  { id: 'attempted', label: 'Attempted' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function LiveTest() {
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

  const onSchedule = (item) => {
    setScheduler(true);
    setData(item);
  };

  const { loading, error, tests } = useSelector((state) => state.testListReducer);

  const [scheduler, setScheduler] = useState(false);
  const [data, setData] = useState('');

  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    tests,
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
      testType: 'Live',
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
      dispatch(listTests('Live'));
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listTests('Live'));
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
          <Controls.Button
            text='Filter'
            variant='outlined'
            color='default'
            startIcon={<FilterListIcon />}
            className={classes.filterBtn}
          />
          <Controls.Button
            text='Create New Test'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              history.push({
                pathname: testCreate,
                type: false,
              });
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          {tests && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{renderListCategory(item.wallCategory)}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{moment(item.createdAt).calendar()}</TableCell>
                  <TableCell>{item.createdBy}</TableCell>
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
                    <Controls.ActionButton onClick={() => onSchedule(item)}>
                      <ScheduleIcon fontSize='small' color='primary' />
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
          {!loading && tests.length === 0 && <Alert severity='info'>0 Live Tests Found</Alert>}
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
      <ScheduleLater
        scheduler={scheduler}
        setScheduler={setScheduler}
        data={data}
        type={'Live'}
        listTests={listTests}
      />
    </>
  );
}
