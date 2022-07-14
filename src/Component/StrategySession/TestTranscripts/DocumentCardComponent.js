import { Card } from "@material-ui/core";
import { useStyles } from "./Styles";
import React from "react";
import moment from "moment";

function DocumentListCard({ certificate, date, onClick }) {
  const classes = useStyles();
  return (
    <div style={{ marginBottom: 20, marginLeft: 10 }}>
      <Card className={classes.documentCardLayout} onClick={onClick}>
        <div className={classes.documentCardWrapper}>
          <p className={classes.documentContent}>{certificate}</p>
          <p className={classes.documentDateTextStyle}>
            {`Uploaded On: ${
              date ? moment(new Date(date)).format("MMM yyyy") : "NA"
            }`}
          </p>
        </div>
      </Card>
    </div>
  );
}

export { DocumentListCard };
