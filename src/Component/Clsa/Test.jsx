import {
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Search } from '@material-ui/icons';
import Loader from '../Utils/controls/Loader';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MuiAlert from '@material-ui/lab/Alert';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  clsaTestDelete,
  clsaTestDownload,
  clsaTestList,
} from '../../Actions/ClsaActions';
import { clsaTestCreate, clsaTestEdit, testEdit } from '../RoutePaths';
import { ButtonsContainerTwo } from '../Test/Assets/Styles/CreateTestStyles';
import { DrawerContainer } from '../Test/Assets/Styles/WallStyles';
import { default as Controls } from '../Utils/controls/Controls';
import Notification from '../Utils/Notification';
import ConfirmDialog from '../Utils/ConfirmDialog';
import PaginationComponent from '../Utils/CustomPaginationComponent';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: '65%',
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: '#052A4E',
      backgroundColor: '#F4F7F9;',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
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

export default function LiveTest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [scheduler, setScheduler] = useState(false);
  const [data, setData] = useState('');
  const [totalPage, setTotalPage] = useState(20);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [idx, setIdx] = useState('');
  const Alert = (props) => (
    <MuiAlert elevation={6} variant='filled' {...props} />
  );

  const handleSearch = (e) => {
    let target = e.target;
    console.log(target, 'tagr');
    setFilterFn({
      fn: (items) => {
        console.log(items, 'items');
        if (target.value == '') return items;
        else
          return items.filter(
            (x) => console.log(x, 'cgcgh')
            // x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const openInPage = (item) => {
    history.push({
      pathname: testEdit,
      testId: item.id,
      testType: 'Live',
    });
    setOpenDrawer(false);
  };

  useEffect(() => {
    setLoading(true);
    clsaTestList(0)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setData(response?.data?.data);
          setList(response?.data?.data.content);
        }
        if (response === 'CLSA List Is Empty') {
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEdit = (item) => {
    history.push({
      pathname: clsaTestEdit + item.id,
      testIdx: item.id,
    });
  };
  const handleDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setLoading(true);
    clsaTestDelete(item.id)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            clsaTestList(0).then((response) => {
              setLoading(false);
              if (response.status === 200) {
                setData(response?.data?.data);
                setList(response?.data?.data?.content);
              }
            });
          }, 1200);
          setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error',
          });
        }
        if (response === 'Test is Live, It not able to delete') {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: response,
            type: 'error',
          });
        }
        if (response === 'User attended test, It not able to delete') {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: response,
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const convertTimeFormat = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    });
  const handlePageChange = (e, value) => {
    setPage(value - 1);
    setLoading(true);
    clsaTestList(value - 1).then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setData(response?.data?.data);
        setList(response?.data?.data.content);
      }
      if (response === 'CLSA List Is Empty') {
        setLoading(false);
        setError(true);
      }
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Button
            text='Create New Test'
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              history.push({
                pathname: clsaTestCreate,
                type: false,
              });
            }}
          />
        </Toolbar>
      </Paper>
      <Grid container>
        <Grid item md={12}>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 750 }}>Test Name</TableCell>
                  <TableCell>Created on</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list.map((item, index) => {
                    return (
                      <TableRow>
                        {/* <TableCell>{index + 1}</TableCell> */}
                        <TableCell style={{ color: '#1093FF' }}>
                          {item.testName}
                        </TableCell>
                        <TableCell>
                          {moment(new Date(item.createdOn)).format(
                            'DD MMM yyyy'
                          )}{' '}
                          , {convertTimeFormat(item.createdOn)}
                        </TableCell>
                        <TableCell>{item.createdBy}</TableCell>
                        <TableCell>
                          <Controls.ActionButton
                            disabled={!item.noOfStudentAttempt}
                            href={`${process.env.REACT_APP_API_URL}/api/v1/students/clsa/${item.id}/report`}
                          >
                            <CloudDownloadIcon
                              fontSize='small'
                              style={{
                                color: item.noOfStudentAttempt
                                  ? 'green'
                                  : 'gray',
                              }}
                            />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            onClick={() => {
                              handleEdit(item);
                            }}
                          >
                            <EditOutlinedIcon
                              fontSize='small'
                              color='primary'
                            />
                          </Controls.ActionButton>
                          <Controls.ActionButton
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: 'Are you sure to delete this post?',
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  handleDelete(item);
                                },
                              });
                            }}
                          >
                            <DeleteIcon fontSize='small' color='secondary' />
                          </Controls.ActionButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <div style={{ margin: '2rem auto', width: '60%' }}>
              {loading && <Loader />}
              {error && <Alert severity='info'>0 Tests Found</Alert>}
            </div>
            {console.log(page, data.totalPages, 'kkk')}
            <PaginationComponent
              page={page + 0}
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
            />
          </TableContainer>
        </Grid>
      </Grid>

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
          </ButtonsContainerTwo>
        </DrawerContainer>
      </Drawer>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
