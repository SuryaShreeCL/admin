import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import '../Assets/Styles/toolbar.css';
import { useParams } from 'react-router-dom';
import ThumbUp from '@material-ui/icons/ThumbUp';
import AddIcon from '@material-ui/icons/Add';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Loader from '../../Utils/controls/Loader';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getStudentEventStatus, updateStudentEventStatus } from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';

function DriveResult() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const columns = [
    {
      title: 'Name',
      field: 'studentName',
      editable: false,
    },
    { title: 'Email', field: 'studentEmailId', filterPlaceholder: 'filter', editable: false },
    {
      title: 'Status',
      field: 'stepStatus',
      emptyValue: () => <em>null</em>,
      render: (rowData) => (
        <div
          style={{
            background:
              rowData.stepStatus === 'Qualified'
                ? '#02ae02af'
                : rowData.stepStatus === 'Not Qualified'
                ? '#d80303aa'
                : '#9f9f9f',
            borderRadius: '4px',
            textAlign: 'center',
            padding: 5,
          }}
        >
          {rowData.stepStatus}
        </div>
      ),
      lookup: { Qualified: 'Qualified', 'Not Qualified': 'Not Qualified', NA: 'NA' },
    },
  ];

  const fetchDriveDetails = () => {
    setIsLoading(true);
    dispatch(
      getStudentEventStatus(id, (response) => {
        setEventInfo(response.data);
        setRounds(response?.data?.stepDetailsModelList);
        setTableData(response?.data?.stepDetailsModelList);
        setIsLoading(false);
      })
    );
  };

  const _roundUpdate = (data, reason = '') => {
    // if (reason === '' || reason.length < 5) {
    //   setNotify({
    //     isOpen: true,
    //     message: 'Please fill the reason',
    //     type: 'error',
    //   });
    //   return;
    // }

    setIsLoading(true);

    // let filterRounds = selectedUsers.filter((student) => student.stepName === data.stepName);

    // let finalStudentsList = filterRounds.map((user) => {
    //   delete user.userId;
    //   delete user.stepName;
    //   return user;
    // });

    let payload = {
      eventId: eventInfo?.eventId,
      eventName: eventInfo?.eventName,
      stepDetailsModelList: data,
    };

    dispatch(
      updateStudentEventStatus(id, payload, (res) => {
        if (res.success) {
          fetchDriveDetails();
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'success',
          });
        } else {
          setIsLoading(false);
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'error',
          });
        }
      })
    );
  };

  useEffect(() => {
    fetchDriveDetails();
  }, []);

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={tableData.studentList}
        components={{
          Toolbar: (props) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <MTableToolbar {...props} />
              {isLoading ? (
                <Loader />
              ) : (
                <FormControl>
                  <Autocomplete
                    style={{ width: '300px', paddingRight: '1rem' }}
                    name='rounds'
                    getOptionLabel={(option) => option?.stepName}
                    options={rounds ?? []}
                    onChange={(e, value) => {
                      if (value) {
                        let filterData = rounds?.filter(
                          (student) => student?.stepName === value?.stepName
                        );
                        setTableData(...filterData);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Select Round'
                        name='rounds'
                        variant='standard'
                      />
                    )}
                  />
                </FormControl>
              )}
            </div>
          ),
        }}
        actions={[
          {
            icon: () => <ThumbUp color='primary' />,
            tooltip: 'Accept',
            onClick: (e, data) => {
              let filterStatus = data.map((student) => {
                student.stepStatus = 'Qualified';
                return student;
              });
              setTableData(tableData, filterStatus);
              _roundUpdate(filterStatus);
            },
          },
          {
            icon: () => <ThumbDown color='error' />,
            tooltip: 'Reject',
            onClick: (e, data) => {
              let filterStatus = data.map((student) => {
                student.stepStatus = 'Not Qualified';
                return student;
              });
              setTableData(tableData, filterStatus);
              console.log(filterStatus);
              _roundUpdate(filterStatus);
            },
          },
        ]}
        // onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: 'right',
          searchFieldVariant: 'standard',
          filtering: true,
          paging: false,
          exportButton: true,
          exportAllData: true,
          exportFileName: eventInfo.eventName,
          addRowPosition: 'first',
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: true,
          showTextRowsSelected: false,
          grouping: false,
          columnsButton: true,
          rowStyle: (data, index) => (index % 2 === 0 ? { background: '#f5f5f5' } : null),
          headerStyle: { background: '#7b7b7b', color: '#ffff' },
        }}
        title={eventInfo.eventName}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default DriveResult;
