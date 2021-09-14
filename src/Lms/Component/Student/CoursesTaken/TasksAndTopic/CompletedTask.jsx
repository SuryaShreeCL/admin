import React, { Component } from "react";
import { DataTable } from "../../../../Utils/DataTable";

class CompletedTask extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { completedTasks } = this.props;
    const rows = (completedTasks &&
      completedTasks.length !== 0 &&
      completedTasks.map((item, index) => ({
        id: index + 1,
        taskName: item.task,
        topicName: item.topic,
        completedDate: item.date,
        time: item.time,
      }))) || [
      { id: "", taskName: "", topicName: "", completedDate: null, time: null },
    ];

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
        field: "time",
        headerName: "Time",
        type: "time",
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
