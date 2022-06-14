import React, { useEffect, useRef, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ThumbUp from "@material-ui/icons/ThumbUp";
import CloudDownloadIcon from "@material-ui/icons/PictureAsPdf";
import ThumbDown from "@material-ui/icons/ThumbDown";
import FilterIcon from "@material-ui/icons/Tune";
import SortIcon from "@material-ui/icons/CompareArrows";
import BackHandler from "../Components/BackHandler";
import SearchIcon from "@material-ui/icons/SearchSharp";
import ExportIcon from "@material-ui/icons/GetApp";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ClearIcon from "@material-ui/icons/Clear";
import Loader from "../../Utils/controls/Loader";
import { FormControl, MenuItem, Select, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  getStudentEventStatus,
  updateStudentEventStatus,
} from "../../../Actions/WallActions";
import Notification from "../../Utils/Notification";
import Controls from "../../Utils/controls/Controls";

function DriveResult() {
  let textRef = useRef(null);
  const [sslcValue, setSslcValue] = useState("all");
  const [hscValue, setHscValue] = useState("all");
  const [ugValue, setUgValue] = useState("all");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rounds, setRounds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData ?? []);
  const [selectedRound, setSelectedRound] = useState([]);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  let columns = [
    {
      title: "Name",
      field: "studentName",
      editable: false,
      filtering: false,
      sorting: true,
      defaultSort: "asc",
    },
    {
      title: "Email",
      field: "studentEmailId",
      filtering: false,
      filterPlaceholder: "filter",
      editable: false,
      sorting: false,
    },
    {
      title: "Status",
      field: "stepStatus",
      sorting: false,
      emptyValue: () => <em>--</em>,
      render: (rowData) => (
        <p
          style={{
            background:
              rowData.stepStatus === "Qualified"
                ? "#02ae02af"
                : rowData.stepStatus === "Not Qualified"
                ? "#d80303aa"
                : "#9f9f9f",
            borderRadius: "4px",
            textAlign: "center",
            padding: 5,
          }}
        >
          {rowData.stepStatus}
        </p>
      ),
      lookup: {
        Qualified: "Qualified",
        "Not Qualified": "Not Qualified",
        NA: "NA",
      },
    },
    {
      title: "10%",
      field: "sscScore",
      cellStyle: {
        textAlign: "center",
      },
      filterComponent: () => (
        <Select
          id="sslc"
          style={{ width: 70 }}
          value={sslcValue}
          onChange={(e) => {
            setSslcValue(e.target.value);
            let filteredData = tableData.studentList.filter(
              (student) => parseInt(student.sscScore) >= e.target.value
            );
            setFilteredData(filteredData);
          }}
        >
          <MenuItem value={"all"}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={40}>40%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={60}>60%</MenuItem>
          <MenuItem value={70}>70%</MenuItem>
          <MenuItem value={80}>80%</MenuItem>
          <MenuItem value={90}>90%</MenuItem>
        </Select>
      ),
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p style={{ width: "70px" }}>{rowData.sscScore}</p>,
    },
    {
      title: "12%",
      field: "hscScore",
      cellStyle: {
        textAlign: "center",
      },
      filterComponent: () => (
        <Select
          id="hsc"
          style={{ width: 70 }}
          value={hscValue}
          onChange={(e) => {
            setHscValue(e.target.value);
            let filteredData = tableData.studentList.filter(
              (student) => parseInt(student.hscScore) >= e.target.value
            );
            setFilteredData(filteredData);
          }}
        >
          <MenuItem value={"all"}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={40}>40%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={60}>60%</MenuItem>
          <MenuItem value={70}>70%</MenuItem>
          <MenuItem value={80}>80%</MenuItem>
          <MenuItem value={90}>90%</MenuItem>
        </Select>
      ),
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p style={{ width: "70px" }}>{rowData.hscScore}</p>,
    },
    {
      title: "UG CGPA",
      field: "ugScore",
      cellStyle: {
        textAlign: "center",
      },
      filterComponent: () => (
        <Select
          id="ugscore"
          style={{ width: 70 }}
          value={ugValue}
          onChange={(e) => {
            setUgValue(e.target.value);
            let filteredData = tableData.studentList.filter(
              (student) => parseInt(student.ugScore) >= e.target.value
            );
            setFilteredData(filteredData);
          }}
        >
          <MenuItem value={"all"}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={40}>40%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={60}>60%</MenuItem>
          <MenuItem value={70}>70%</MenuItem>
          <MenuItem value={80}>80%</MenuItem>
          <MenuItem value={90}>90%</MenuItem>
        </Select>
      ),
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p style={{ width: "70px" }}>{rowData.ugScore}</p>,
    },
    {
      title: "Graduation",
      field: "ugEndDate",
      cellStyle: {
        textAlign: "center",
      },
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{new Date(rowData.ugEndDate).getFullYear()}</p>,
    },
    {
      title: "Active Backlogs",
      field: "activeBacklogs",
      type: "numeric",
      cellStyle: {
        textAlign: "center",
      },
      emptyValue: () => <em>--</em>,
      render: (rowData) => <p>{rowData.activeBacklogs}</p>,
    },
    {
      title: "Fresher/Experience",
      field: "experienceStatus",
      emptyValue: () => <em>--</em>,
      render: (rowData) => <div>{rowData.experienceStatus}</div>,
      lookup: { Fresher: "Fresher", Experienced: "Experienced" },
    },
  ];

  //Populates the custom questions into columns array
  const customQuestionFields = customQuestions?.forEach((question, idx) => {
    console.log(question, idx);
    columns.push({
      title: question,
      field: "answers",
      sorting: false,
      render: (rowData) => (
        <div style={{ width: "300px", display: "flex" }}>
          <p>{rowData?.answers[idx] ?? "--"}</p>
        </div>
      ),
      customFilterAndSearch: (term, rowData) =>
        Boolean(
          rowData?.answers[idx] &&
            rowData?.answers[idx].toLowerCase().indexOf(term.toLowerCase()) > -1
        ),
    });
    return columns;
  });

  const fetchDriveDetails = () => {
    setIsLoading(true);
    dispatch(
      getStudentEventStatus(id, (response) => {
        setCustomQuestions(
          response?.data?.stepDetailsModelList[0]?.customQuestions
        );
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
            type: "success",
          });
          setSslcValue("all");
          setHscValue("all");
          setUgValue("all");
        } else {
          setSslcValue("all");
          setHscValue("all");
          setUgValue("all");
          setIsLoading(false);
          setNotify({
            isOpen: true,
            message: res.message,
            type: "error",
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
      <BackHandler title="" tab={0} isDrive={true} />
      <h3 style={{ textAlign: "center" }}>{eventInfo?.eventName} </h3>
      <Controls.Input
        inputRef={textRef}
        label="Enter Rejection Reason"
        name="rejectReason"
        style={{ width: "100%" }}
        multiline
        rows={3}
      />
      <MaterialTable
        columns={columns}
        data={filteredData.length > 0 ? filteredData : tableData.studentList}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                display: "flex",
                marginTop: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid #0094b1",
                borderTop: "2px solid #007d93",
                borderRadius: "4px",
              }}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <FormControl>
                    <Autocomplete
                      style={{ width: "300px", paddingLeft: "1rem" }}
                      name="rounds"
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
                          label="Select Round"
                          name="rounds"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                  <div style={{ flexGrow: 1, padding: "1rem" }}>
                    <MTableToolbar {...props} />
                  </div>
                </>
              )}
            </div>
          ),
        }}
        actions={[
          {
            icon: () => <ThumbUp style={{ color: "green" }} />,
            tooltip: "Accept",
            onClick: (e, data) => {
              let filterStatus = data.map((student) => {
                student.stepStatus = "Qualified";
                return student;
              });
              setTableData(tableData, filterStatus);
              _roundUpdate(filterStatus);
            },
          },
          {
            icon: () => <ThumbDown color="error" />,
            tooltip: "Reject",
            onClick: (e, data) => {
              if (textRef.current.value.length === 0) {
                setNotify({
                  isOpen: true,
                  message: "Please fill the reason",
                  type: "error",
                });
                return;
              }
              let filterStatus = data.map((student) => {
                student.stepStatus = "Not Qualified";
                return student;
              });
              setTableData(tableData, filterStatus);
              _roundUpdate(filterStatus);
            },
          },
          {
            icon: () => <CloudDownloadIcon />,
            tooltip: "CV Download",
            onClick: (e, data) => {
              let filteredIds = data.map((student) => student.studentId);
              window.open(
                `${process.env.REACT_APP_API_URL}/api/v1/event/${id}/filter/cv?studentIdList=${filteredIds}`,
                "_blank"
              );
            },
          },
          {
            icon: () => <ExportIcon style={{ color: "green" }} />,
            tooltip: "Master Sheet Download",
            onClick: (e, data) => {
              let filteredIds = data.map((student) => student.studentId);
              window.open(
                `${process.env.REACT_APP_API_URL}/api/v1/event/${id}/filter/result/page?studentIdList=${filteredIds}`,
                "_blank"
              );
            },
          },
        ]}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchFieldVariant: "outlined",
          filtering: true,
          paging: false,
          exportButton: false,
          exportAllData: false,
          exportFileName: eventInfo.eventName,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: true,
          showTextRowsSelected: false,
          grouping: false,
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "aliceblue", color: "#000" },
        }}
        title={selectedRound?.stepName}
        icons={{
          Filter: () => <FilterIcon style={{ color: "#807f7f" }} />,
          SortArrow: () => (
            <SortIcon
              fontSize="small"
              style={{ color: "#c6c6c6", transform: "rotate(-90deg)" }}
            />
          ),
          Clear: () => <ClearIcon />,
          Export: () => <ExportIcon style={{ color: "green" }} />,
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
