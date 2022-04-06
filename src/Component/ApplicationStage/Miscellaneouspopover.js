import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { StyledStaticButton } from "../../Asset/StyledComponents/Styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledStaticButton active={true} color={"primary"} onClick={handleClick}>
        {"Miscellaneous / Handouts"}
      </StyledStaticButton>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div>
          <StyledMenuItem style={{ width: "200px", textAlign: "center" }}>
            <ListItemText primary='Resume 1' />
          </StyledMenuItem>
          <StyledMenuItem style={{ textAlign: "center" }}>
            <ListItemText primary='Resume 2' />
          </StyledMenuItem>
          <StyledMenuItem style={{ textAlign: "center" }}>
            <ListItemText primary='Resume 3' />
          </StyledMenuItem>
        </div>
      </StyledMenu>
    </div>
  );
}
