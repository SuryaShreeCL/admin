import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { ReactComponent as CommentIcon } from "../../Asset/icons/comment.svg";
import {
  customTheme,
  StyledButton,
  StyledCustomStaticTable,
  useStyles,
} from "../../Asset/StyledComponents/Styles";
import { ReactComponent as Document } from "../../Asset/icons/empty-document.svg";
import { Typo } from "./controls/Styles";
import moment from "moment";

function DownloadCvTable({
  headers,
  body,
  handleComment,
  handleDownload,
  handleDelete,
}) {
  const classes = useStyles();
  return body?.length !== 0 ? (
    <StyledCustomStaticTable>
      <thead>
        <tr>
          {headers &&
            headers.length !== 0 &&
            headers.map((item, index) => <th id={`head${index}`}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {body &&
          body.length !== 0 &&
          body.map(
            (
              { comment, versionName, uploadedDate, id, path, isDelete },
              index
            ) => (
              <tr id={`row${index}`}>
                <td>{versionName}</td>
                <td>
                  {uploadedDate
                    ? moment(new Date(uploadedDate)).format("DD MMMM YYYY")
                    : "NA"}
                </td>
                <td>
                  {comment && comment.trim().length !== 0 && (
                    <IconButton
                      id={"command_icon"}
                      className={classes.iconButtonStyle}
                      onClick={(e) => handleComment(comment, e)}
                    >
                      <CommentIcon />
                    </IconButton>
                  )}
                </td>
                <td>
                  <Box
                    display={"flex"}
                    gridGap={"10px"}
                    justifyContent={"flex-end"}
                  >
                    {isDelete && (
                      <StyledButton
                        height={"25px"}
                        variant={"outlined"}
                        style={customTheme.palette.delete}
                        onClick={(e) => handleDelete(id, path, e)}
                      >
                        {"Delete"}
                      </StyledButton>
                    )}

                    <StyledButton
                      height={"25px"}
                      variant={"outlined"}
                      style={customTheme.palette.outlined}
                      onClick={(e) => handleDownload(path, e)}
                      disabled={Boolean(!path)}
                    >
                      {"Download"}
                    </StyledButton>
                  </Box>
                </td>
              </tr>
            )
          )}
      </tbody>
    </StyledCustomStaticTable>
  ) : (
    <Box
      margin={"75px 0px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Document />
      <Typo padding={"10px 0px"} variant={"h6"}>
        {"No Document added"}
      </Typo>
    </Box>
  );
}

export { DownloadCvTable };
