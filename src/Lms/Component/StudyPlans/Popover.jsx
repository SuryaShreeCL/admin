import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Create from "@material-ui/icons/Create";
import { Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const ITEM_HEIGHT = 48;

export default function LongMenu({ options, color, iconColor }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderIcon = (text) => {
    if (text === "Delete") return <DeleteIcon style={{ fill: "#1093FF" }} />;
    if (text === "Edit")
      return <Create style={{ fill: iconColor || "#1093FF" }} />;
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: "0px", marginRight: "16px" }}
      >
        <MoreVertIcon style={{ fill: color || "#1093FF" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            <Box display={"flex"} padding={"5px !important"} gridGap={"10px"}>
              {renderIcon(option)}
              <Box
                padding={"0px !important"}
                fontSize={16}
                color={"#052A4E"}
                lineHeight={"20px"}
              >
                {option}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
