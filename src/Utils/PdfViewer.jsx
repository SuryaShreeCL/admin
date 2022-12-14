import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import {
  SelectionMode,
  selectionModePlugin,
} from "@react-pdf-viewer/selection-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/selection-mode/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import SamplePdf from "../Asset/Images/samplePdf.pdf";
import { makeStyles } from "@material-ui/core";
function PdfViewer(props) {
  const useStyles = makeStyles((theme) => ({
    pdfWrapper: {
      border: "1px solid rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      height: "82vh",
      [theme.breakpoints.down("lg")]: {
        height: "106vh",
      },
    },
    pdfViewer: {
      alignItems: "center",
      backgroundColor: "#eeeeee",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      padding: "4px",
    },
  }));
  const classes = useStyles();
  const zoomPluginInstance = zoomPlugin();
  const selectionModePluginInstance = selectionModePlugin();
  const { SwitchSelectionModeButton } = selectionModePluginInstance;

  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
      <div className={classes.pdfWrapper}>
        <div className={classes.pdfViewer}>
          <ZoomOutButton />
          <ZoomPopover />
          <ZoomInButton />
          <SwitchSelectionModeButton mode={SelectionMode.Text} />
        </div>
        <div
          style={{
            flex: 1,
            overflow: "scroll",
          }}
        >
          <Viewer
            {...props}
            fileUrl={
              // SamplePdf
              props.cvUrl ? props.cvUrl : SamplePdf
            }
            plugins={[zoomPluginInstance]}
          />
        </div>
      </div>
    </Worker>
  );
}

export default PdfViewer;
