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
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clsaTestCreate, clsaTestEdit, testEdit } from '../RoutePaths';
import { ButtonsContainerTwo } from '../Test/Assets/Styles/CreateTestStyles';
import { DrawerContainer } from '../Test/Assets/Styles/WallStyles';
import { default as Controls } from '../Utils/controls/Controls';
import Notification from '../Utils/Notification';
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
  const [viewData, setViewData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
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
                  <TableCell>#</TableCell>
                  <TableCell style={{ width: 750 }}>Test Name</TableCell>
                  <TableCell>Created on</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell style={{ color: '#1093FF' }}>
                    CLSA Test xyz
                  </TableCell>
                  <TableCell>12-03-2021</TableCell>
                  <TableCell>Xyz admin</TableCell>
                  <TableCell>
                    <Controls.ActionButton onClick={() => {}}>
                      <VisibilityIcon fontSize='small' color='default' />
                    </Controls.ActionButton>
                    <Controls.ActionButton>
                      <CloudDownloadIcon
                        fontSize='small'
                        style={{
                          color: 'green',
                        }}
                      />
                    </Controls.ActionButton>
                    <Controls.ActionButton onClick={() => {}}>
                      <EditOutlinedIcon
                        fontSize='small'
                        color='primary'
                        onClick={() => {
                          history.push({
                            pathname: clsaTestEdit + 1,
                          });
                        }}
                      />
                    </Controls.ActionButton>
                    <Controls.ActionButton onClick={() => {}}>
                      <DeleteIcon fontSize='small' color='secondary' />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
