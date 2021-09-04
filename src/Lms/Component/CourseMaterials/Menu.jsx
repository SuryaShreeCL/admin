import React from "react";
import { MuiMenu } from "../../Assets/StyledTableComponents";
import { DeleteRounded } from "@material-ui/icons";
import { MenuItem, ListItemIcon, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    height: "44px",
    color: "#052A4E",
    fontSize: "16px",
    margin: "0px 6px",
    "&:hover": {
      background: "#F2F9FF",
    },
  },
});

export default function Menu(props) {
  const classes = useStyle();
  const choices = [
    {
      text: "Delete",
      icon: <DeleteRounded style={{ fill: "#1093ff", fontSize: "24px" }} />,
    },
  ];

  const { questionId, open, anchorEl, handleClose, handleDelete } = props;
  return (
    <MuiMenu
      id={questionId}
      open={open}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      {choices.map((choice) => (
        <MenuItem classes={{ root: classes.root }} onClick={handleDelete}>
          <ListItemIcon style={{ minWidth: "36px" }}>
            {choice.icon}
          </ListItemIcon>
          <span>{choice.text}</span>
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
