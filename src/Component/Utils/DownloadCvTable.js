import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { ReactComponent as CommentIcon } from "../../Asset/icons/comment.svg";
import {
  customTheme,
  StyledButton,
  StyledCustomStaticTable,
  useStyles,
} from "../../Asset/StyledComponents/Styles";

function DownloadCvTable({
  headers,
  body,
  handleComment,
  handleDownload,
  handleDelete,
}) {
  const classes = useStyles();
  return (
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
          body.map(({ comment, createdBy, id, path, isDownload }, index) => (
            <tr id={`row${index}`}>
              <td>{path}</td>
              <td>{createdBy}</td>
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
                  {isDownload && (
                    <StyledButton
                      height={"25px"}
                      variant={"outlined"}
                      style={customTheme.palette.delete}
                      onClick={() => handleDelete(id, path)}
                    >
                      {"Delete"}
                    </StyledButton>
                  )}
                  <StyledButton
                    height={"25px"}
                    variant={"outlined"}
                    style={customTheme.palette.outlined}
                    onClick={() => handleDownload(id, path)}
                  >
                    {"Download"}
                  </StyledButton>
                </Box>
              </td>
            </tr>
          ))}
      </tbody>
    </StyledCustomStaticTable>
  );
}

export { DownloadCvTable };
