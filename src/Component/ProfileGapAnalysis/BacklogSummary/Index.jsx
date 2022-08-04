import React, { useState } from "react";
import Editable from "../../../Utils/EditableTable";

function Index(props) {
  return (
    <Editable
      data={props.data}
      columns={props.columns}
      onRowDelete={props.handleRowDelete}
      onRowAdd={props.handleRowAdd}
      onRowUpdate={props.handleRowUpdate}
    />
  );
}

export default Index;
