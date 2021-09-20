import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { SelectionMode, selectionModePlugin } from '@react-pdf-viewer/selection-mode';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import SamplePdf from "../Asset/Images/samplePdf.pdf";
function PdfViewer(props) {
  const zoomPluginInstance = zoomPlugin();
  const selectionModePluginInstance = selectionModePlugin();
  const { SwitchSelectionModeButton } = selectionModePluginInstance;
  
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <div
        className="rpv-core__viewer"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <ZoomOutButton />
          <ZoomPopover />
          <ZoomInButton />
          <SwitchSelectionModeButton mode={SelectionMode.Text} />
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Viewer
            fileUrl={
              SamplePdf
            //   "http://localhost:8080/api/v1/files/download/4623e859-e423-4cf1-9b6d-50a8dac14af0/MDNM_DDDM_SSC.pdf"
            }
            plugins={[zoomPluginInstance]}
          />
        </div>
      </div>
      
    </Worker>
  );
}

export default PdfViewer;
