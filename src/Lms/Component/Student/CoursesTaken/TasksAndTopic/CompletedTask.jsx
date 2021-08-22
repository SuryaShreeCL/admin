import React, { Component } from "react";
import { DataTable } from "../../../../Utils/DataTable";

class CompletedTask extends Component {
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
      },
      {
        field: "completedDate",
        headerName: "Completed date",
        type: "date",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerName: "Status",
        type: "number",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
      },
    ];
    return (
      <>
        <DataTable dataTable={{ rows: rows, columns: columns }} />
      </>
    );
  }
}

export default CompletedTask;
