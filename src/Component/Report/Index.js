import React from "react";
import { useParams } from "react-router-dom";
import MasterReport from "./MasterReport";
import SalesReport from "./SalesReport";

const REPORT_NAMES = {
  masterReport: "masterReport",
  salesReport: "salesReport",
};

function Index(props) {
  const params = useParams();
  switch (params?.reportName) {
    case REPORT_NAMES.masterReport:
      return <MasterReport {...props} />;
    case REPORT_NAMES.salesReport:
      return <SalesReport {...props} />;
    default:
      return null;
  }
}

export default Index;
