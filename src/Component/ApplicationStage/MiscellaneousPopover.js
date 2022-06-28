import { ClickAwayListener, Popper } from "@material-ui/core";
import React from "react";
import {
  StyledList,
  StyledListItem,
  StyledMenuPaper,
} from "../../Asset/StyledComponents/Styles";

function PopperMenu({
  anchorEl,
  handleClickAway,
  placement,
  lists,
  handleListItemClick,
  selectedValue,
}) {
  return (
    <Popper anchorEl={anchorEl} placement={placement} open={Boolean(anchorEl)}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledMenuPaper>
          <StyledList>
            {lists &&
              Array.isArray(lists) &&
              lists.length !== 0 &&
              lists.map(({ name, label, url }) => (
                <StyledListItem
                  button
                  selected={selectedValue === name}
                  onClick={(e) => handleListItemClick(name, e)}
                  disabled={Boolean(!url)}
                >
                  {label}
                </StyledListItem>
              ))}
          </StyledList>
        </StyledMenuPaper>
      </ClickAwayListener>
    </Popper>
  );
}
export { PopperMenu };
