import React, { Component } from "react";
import { DataTable } from "../../../../Utils/DataTable";

class OtherTask extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { rows } = this.props;
    const columns = [
      {
        field: "id",
        headerName: "#",
        width: 50,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "taskName",
        headerName: "Task name",
        sortable: false,
        flex: 1,
      },
      {
        field: "topicName",
        headerName: "Topic Name",
        flex: 1,
        sortable: false,
      },
      {
        field: "startTime",
        headerName: "Start Time",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "schudledDate",
        headerName: "Schudled for",
        type: "date",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerName: "Status",
        type: "number",
        flex: 1,
        sortable: false,
      },
    ];
    return (
      <>
        <DataTable dataTable={{ rows: rows, columns: columns }} />
      </>
    );
  }
}

export default OtherTask;
