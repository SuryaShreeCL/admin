import React from "react";
import Grid from "@material-ui/core/Grid";
import FileViewer from "react-file-viewer";

const getFileType = (fileName) => fileName.split(".").pop();

export default function App({ fileType, filePath }) {
  const containerRef = React.useRef(null);

  return (
    <div>
      {filePath && fileType && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              ref={containerRef}
              style={{
                width: "100%",
                height: "560px",
                border: "1px solid black",
              }}
            >
              <FileViewer
                key={filePath}
                fileType={fileType}
                filePath={filePath}
                errorComponent={<p>errorComponent</p>}
                onError={(error) =>
                  console.error("FileViewer error: ", { error })
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/*
react-file-viewer claims to support following file types:

pdf
csv
xslx
docx
Video: mp4, webm
Audio: mp3
*/

/*
if it's photo viewer, it'll gonna have id of 
pg-photo-container

pdf:
pdf-viewer-container
pdf-viewer
pdf-canvas x2?
*/
