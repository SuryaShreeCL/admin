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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
import { testEdit } from '../../RoutePaths';
import moment from 'moment';
import Loader from '../../Utils/controls/Loader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DrawerContainer } from '../Assets/Styles/WallStyles';
import { ButtonsContainerTwo } from '../Assets/Styles/CreateTestStyles';
import { listTests, deleteTest } from '../../../Actions/TestActions';
import ScheduleLater from '../Components/ScheduleLater';

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
  { id: 'createdAt', label: 'Created' },
  { id: 'createdby', label: 'Created By', disableSorting: true },
  { id: 'status', label: 'Status', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

export default function DraftTest() {
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

  const { loading, error, tests } = useSelector(
    (state) => state.testListReducer
  );
  let totalPages = tests.totalPages;

  const [scheduler, setScheduler] = useState(false);
  const [data, setData] = useState('');

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

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    page,
  } = useTable(tests.content, headCells, filterFn, totalPages);

  const handleSearch = (text) => {
    dispatch(listTests('Draft', page, text));
  };

  const openInPage = (item) => {
    history.push({
      pathname: testEdit,
      testId: item.id,
      testType: 'Draft',
    });
    setRecordForEdit(item);
    setOpenDrawer(false);
  };

  const onSchedule = (item) => {
    setScheduler(true);
    setData(item);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteTest(id));
    setTimeout(() => {
      dispatch(listTests('Draft', page));
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };

  useEffect(() => {
    dispatch(listTests('Draft', page));
  }, [dispatch, page]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.RoundedInput
            className={classes.searchInput}
            placeholder='Search Tests'
            helperText={'Press Enter key to search after typing.'}
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
          {/* <Controls.Button
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
          /> */}
        </Toolbar>

        <TblContainer>
          <TblHead />
          {tests.content && (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell style={{ color: '#1093FF' }}>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <ScheduleIcon
                      fontSize='small'
                      color='primary'
                      style={{ marginRight: '5px', marginBottom: '3px' }}
                    />
                    {item.duration}
                  </TableCell>
                  <TableCell>{moment(item.createdAt).calendar()}</TableCell>
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Controls.ActionButton onClick={() => openInPage(item)}>
                      <EditOutlinedIcon fontSize='small' color='default' />
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
          {!loading && tests.content?.length === 0 && (
            <Alert severity='info'>0 Draft Tests Found</Alert>
          )}
        </div>
        <TblPagination />
      </Paper>

      <Drawer
        anchor='right'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerContainer>
          <ButtonsContainerTwo>
            <span
              style={{ fontSize: '1rem' }}
              onClick={() => openInPage(viewData)}
            >
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ScheduleLater
        scheduler={scheduler}
        setScheduler={setScheduler}
        data={data}
        type={'Draft'}
        listTests={listTests}
      />
    </>
  );
}
