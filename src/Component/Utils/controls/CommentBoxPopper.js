import { ClickAwayListener, Popper } from "@material-ui/core";
import React from "react";
import { ContentWrapper, Paper, Typo, useStyles, Wrapper } from "./Styles";

function CommentBoxPopper({
  anchorEl,
  popperComment,
  handleClickAway,
  placement,
  title,
  paperClassName,
}) {
  const classes = useStyles();
  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement={placement || "bottom-start"}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper className={paperClassName}>
          <Wrapper>
            <Typo variant={"body1"} color={"#18AAE7"}>
              {title || "Comment"}
            </Typo>
            <ContentWrapper className={classes.popperContentStyle}>
              <Typo
                variant={"body1"}
                color={"#333333"}
                paragraph={true}
                className={classes.popperContent}
              >
                {popperComment}
              </Typo>
            </ContentWrapper>
          </Wrapper>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
}

export { CommentBoxPopper };
