import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import '../Assets/Styles/toolbar.css';
import { useParams } from 'react-router-dom';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CloudDownloadIcon from '@material-ui/icons/PictureAsPdf';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Loader from '../../Utils/controls/Loader';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getStudentEventStatus, updateStudentEventStatus } from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';
import Controls from '../../Utils/controls/Controls';

function DriveResult() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rounds, setRounds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRound, setSelectedRound] = useState([]);
  const [rejectReason, setRejectReason] = useState(null);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    {
      title: '10%',
      field: 'sscScore',
      type: 'numeric',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{rowData.sscScore}</div>,
    },
    {
      title: '12%',
      field: 'hscScore',
      type: 'numeric',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{rowData.hscScore}</div>,
    },
    {
      title: 'UG%',
      field: 'ugScore',
      type: 'numeric',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{rowData.ugScore}</div>,
    },
    {
      title: 'Graduation',
      field: 'ugEndDate',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{new Date(rowData.ugEndDate).getFullYear()}</div>,
    },
    {
      title: 'Active Backlogs',
      field: 'activeBacklogs',
      type: 'numeric',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{rowData.activeBacklogs}</div>,
    },
    {
      title: 'Fresher/Experience',
      field: 'experienceStatus',
      emptyValue: () => <em>null</em>,
      render: (rowData) => <div>{rowData.experienceStatus}</div>,
      lookup: { Frehser: 'Fresher', Experienced: 'Experienced' },
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

  const _roundUpdate = (data) => {
    setIsLoading(true);

    let payload = {
      eventId: eventInfo?.eventId,
      eventName: eventInfo?.eventName,
      stepDetailsModelList: [{ ...selectedRound, reason: rejectReason, studentList: data }],
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
      <Controls.Input
        label='Rejection Reason'
        value={rejectReason}
        name='rejectReason'
        onChange={(ev) => setRejectReason(ev.target.value)}
        style={{ width: '100%' }}
        multiline
        rows={3}
      />
      <MaterialTable
        columns={columns}
        data={tableData.studentList}
        components={{
          Toolbar: (props) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {isLoading ? (
                <Loader />
              ) : (
                <FormControl>
                  <Autocomplete
                    style={{ width: '300px', paddingLeft: '1rem' }}
                    name='rounds'
                    getOptionLabel={(option) => option?.stepName}
                    options={rounds ?? []}
                    onChange={(e, value) => {
                      if (value) {
                        setSelectedRound(value);
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
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        actions={[
          {
            icon: () => <ThumbUp style={{ color: 'green' }} />,
            tooltip: 'Accept',
            onClick: (e, data) => {
              let filterStatus = data.map((student) => {
                student.stepStatus = 'Qualified';
                return student;
              });
              setTableData(tableData, filterStatus);
              _roundUpdate(filterStatus, '');
            },
          },
          {
            icon: () => <ThumbDown color='error' />,
            tooltip: 'Reject',
            onClick: (e, data) => {
              if (rejectReason === null) {
                setNotify({
                  isOpen: true,
                  message: 'Please fill the reason',
                  type: 'error',
                });
                return;
              }
              let filterStatus = data.map((student) => {
                student.stepStatus = 'Not Qualified';
                return student;
              });
              setTableData(tableData, filterStatus);
              _roundUpdate(filterStatus);
            },
          },
          {
            icon: () => <CloudDownloadIcon color='error' />,
            tooltip: 'CV Download',
            onClick: (e, data) => console.log('pdf'),
          },
        ]}
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
          headerStyle: { background: '#e0edfc', color: '#000' },
        }}
        title={selectedRound?.stepName}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default DriveResult;
