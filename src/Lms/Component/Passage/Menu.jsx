import React from "react";
import { MuiMenu } from "../../Assets/StyledTableComponents";
import EditIcon from "@material-ui/icons/Edit";
import { boolean } from "yup";
import { ListItemIcon, MenuItem, Typography } from "@material-ui/core";

const MenuOption = [
  { text: "Edit", icon: <EditIcon style={{ fill: "#1093FF" }} /> },
];
function Menu({ handleClose, anchorEl, passageId, handleOptions }) {
  console.log(passageId, anchorEl);
  return (
    <MuiMenu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "center", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
      id={passageId}
    >
      {MenuOption.map((item) => (
        <MenuItem
          onClick={() => handleOptions(item.text, passageId)}
          className={"menu-item-text"}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Typography>{item.text}</Typography>
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
export default Menu;
