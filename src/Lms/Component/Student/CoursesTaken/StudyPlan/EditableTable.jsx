import React from "react";
import MaterialTable from "material-table";
import {
  Add,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import CustomDatePicker from "../../../../Utils/CustomDatePicker";
import moment from "moment";

const COLUMNS = [
  {
    field: "id",
    title: "Id",
    hidden: true,
  },
  {
    field: "taskId",
    title: "TaskId",
    hidden: true,
  },
  {
    field: "date",
    title: "Date",
    sorting: false,
    type: "date",
    validate: (rowData) => {
      var todayDate = moment(new Date());
      var date = moment(new Date(rowData?.date));
      var isValid =
        date.startOf("day").isSame(todayDate.startOf("day")) ||
        moment(todayDate).isBefore(moment(date));

      return isValid;
    },
    cellStyle: {
      fontWeight: 500,
    },
    dateSetting: {
      format: "dd/MM/yyyy",
    },
    filterComponent: (props) => (
      <CustomDatePicker
        {...props}
        onChange={(event) => {
          props.onFilterChanged(props.columnDef.tableData.id, event);
        }}
      />
    ),
  },
  {
    field: "topicName",
    title: "Topic Name",
    editable: "never",
    sorting: false,
  },
  {
    field: "conceptName",
    title: "Concept Name",
    editable: "never",
    sorting: false,
  },
  {
    field: "taskName",
    title: "Task Name",
    editable: "never",
    sorting: false,
  },
  {
    field: "duration",
    title: "Duration",
    editable: "never",
    sorting: false,
    align: "center",
  },
  {
    field: "status",
    title: "Status",
    editable: "never",
    sorting: true,
    align: "center",
  },
];

function EditableTable({
  onRowUpdate,
  data = [],
  isLoading,
  tableRef,
  onChangePage,
}) {
  return (
    <MaterialTable
      tableRef={tableRef}
      columns={COLUMNS}
      data={data}
      editable={{
        onRowUpdate: onRowUpdate,
      }}
      isLoading={isLoading}
      options={{
        sorting: true,
        actionsColumnIndex: 6,
        showTitle: false,
        search: false,
        pageSize: 10,
        actionsCellStyle: {
          alignItems: "center",
        },
        rowStyle: {
          color: "#052A4E",
          fontWeight: 400,
        },
        headerStyle: {
          color: "#052A4E",
          fontWeight: 600,
          padding: 20,
        },
      }}
      icons={{
        Add: Add,
        Clear: Clear,
        Check: Check,
        Delete: DeleteOutline,
        DetailPanel: ChevronRight,
        Edit: Edit,
        Export: SaveAlt,
        Filter: FilterList,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
        ResetSearch: Clear,
        Search: Search,
        SortArrow: ArrowDownward,
        ThirdStateCheck: Remove,
        ViewColumn: ViewColumn,
      }}
      onChangePage={onChangePage}
    />
  );
}

export default EditableTable;
