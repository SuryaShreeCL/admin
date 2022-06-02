import React, { useEffect, useRef, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CloudDownloadIcon from '@material-ui/icons/PictureAsPdf';
import ThumbDown from '@material-ui/icons/ThumbDown';
import FilterIcon from '@material-ui/icons/Tune';
import SortIcon from '@material-ui/icons/CompareArrows';
import SearchIcon from '@material-ui/icons/SearchSharp';
import ExportIcon from '@material-ui/icons/GetApp';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ClearIcon from '@material-ui/icons/Clear';
import Loader from '../../Utils/controls/Loader';
import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getStudentEventStatus, updateStudentEventStatus } from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';
import Controls from '../../Utils/controls/Controls';

function DriveResult() {
  let textRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rounds, setRounds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRound, setSelectedRound] = useState([]);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  let columns = [
    {
      title: 'Name',
      field: 'studentName',
      editable: false,
      filtering: false,
      sorting: true,
      defaultSort: 'asc',
    },
    {
      title: 'Email',
      field: 'studentEmailId',
      filtering: false,
      filterPlaceholder: 'filter',
      editable: false,
      sorting: false,
    },
    {
      title: 'Status',
      field: 'stepStatus',
      sorting: false,
      emptyValue: () => <em>null</em>,
      render: (rowData) => (
        <p
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
        </p>
      ),
      lookup: { Qualified: 'Qualified', 'Not Qualified': 'Not Qualified', NA: 'NA' },
    },
    {
      title: '10%',
      field: 'sscScore',
      type: 'numeric',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{rowData.sscScore}</p>,
    },
    {
      title: '12%',
      field: 'hscScore',
      type: 'numeric',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{rowData.hscScore}</p>,
    },
    {
      title: 'UG%',
      field: 'ugScore',
      type: 'numeric',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{rowData.ugScore}</p>,
    },
    {
      title: 'Graduation',
      field: 'ugEndDate',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{new Date(rowData.ugEndDate).getFullYear()}</p>,
    },
    {
      title: 'Active Backlogs',
      field: 'activeBacklogs',
      type: 'numeric',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{rowData.activeBacklogs}</p>,
    },
    {
      title: 'Fresher/Experience',
      field: 'experienceStatus',
      emptyValue: () => <em>--</em>,
      render: (rowData) => <div>{rowData.experienceStatus}</div>,
      lookup: { Frehser: 'Fresher', Experienced: 'Experienced' },
    },
  ];

  //Populates the custom questions into columns array
  const customQuestionFields = customQuestions?.forEach((question, idx) => {
    columns.push({
      title: question,
      field: 'answers',
      sorting: false,
      render: (rowData) => (
        <div style={{ width: '300px', display: 'flex' }}>
          <p>{rowData?.answers[idx] ?? '--'}</p>
        </div>
      ),
    });
    return columns;
  });

  const fetchDriveDetails = () => {
    setIsLoading(true);
    dispatch(
      getStudentEventStatus(id, (response) => {
        setCustomQuestions(response?.data?.stepDetailsModelList[0]?.customQuestions);
        setEventInfo(response.data);
        setRounds(response?.data?.stepDetailsModelList);
        setTableData(response?.data?.stepDetailsModelList);
        setIsLoading(false);
      })
    );
  };

  //Updates the specific round detials
  const _roundUpdate = (data) => {
    setIsLoading(true);

    let payload = {
      eventId: eventInfo?.eventId,
      eventName: eventInfo?.eventName,
      stepDetailsModelList: [
        { ...selectedRound, reason: textRef.current.value, studentList: data },
      ],
    };

    //once the update is success, it re-renders the ui with latest information
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
      <h3 style={{ textAlign: 'center' }}>{eventInfo?.eventName} </h3>
      <Controls.Input
        inputRef={textRef}
        label='Enter Rejection Reason'
        name='rejectReason'
        style={{ width: '100%' }}
        multiline
        rows={3}
      />
      <MaterialTable
        columns={columns}
        data={tableData.studentList}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                display: 'flex',
                marginTop: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid #0094b1',
                borderTop: '2px solid #007d93',
                borderRadius: '4px',
              }}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
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
                          variant='outlined'
                        />
                      )}
                    />
                  </FormControl>
                  <div style={{ flexGrow: 1, padding: '1rem' }}>
                    <MTableToolbar {...props} />
                  </div>
                </>
              )}
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
              _roundUpdate(filterStatus);
            },
          },
          {
            icon: () => <ThumbDown color='error' />,
            tooltip: 'Reject',
            onClick: (e, data) => {
              if (textRef.current.value.length === 0) {
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
            icon: () => <CloudDownloadIcon />,
            tooltip: 'CV Download',
            onClick: (e, data) => {
              let filteredIds = data.map((student) => ({
                studentId: student.studentId,
              }));
              window.open(
                `${
                  process.env.REACT_APP_API_URL
                }/api/v1/event/${id}/filter/cv?studentIdList=${JSON.stringify(...filteredIds)}`,
                '_blank'
              );
            },
          },
        ]}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: 'right',
          searchFieldVariant: 'outlined',
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
          headerStyle: { background: 'aliceblue', color: '#000' },
        }}
        title={selectedRound?.stepName}
        icons={{
          Filter: () => <FilterIcon style={{ color: '#807f7f' }} />,
          SortArrow: () => (
            <SortIcon fontSize='small' style={{ color: '#c6c6c6', transform: 'rotate(-90deg)' }} />
          ),
          Clear: () => <ClearIcon />,
          Export: () => <ExportIcon style={{ color: 'green' }} />,
          ResetSearch: () => <ClearIcon />,
          Search: () => <SearchIcon />,
          ViewColumn: () => <ViewColumnIcon />,
        }}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default DriveResult;
