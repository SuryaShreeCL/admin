import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { ToolTip } from "../../../assets/css/MuiStyles";
import "../../../assets/css/Style.css";
import {
  CommentIcon,
  DividerBookmark,
  SubHeading,
  TopGridSubPara,
} from "../../../assets/css/StyledComponent";
import Comment from "../../../assets/icons/comment.svg";
import ClockImage from "../../../assets/images/ClockImCage.png";
import { RenderBookMark } from "../../../utils/components/Bookmark";
import Notes from "./Notes";
import Button from "../../../utils/components/Button";

function RightCard(props) {
  const { t } = props;
  return (
    <div className={"main-card-align left-container-task-view"}>
      <Box p={3} pl={3} pr={3} pb={13} height="inherit">
        <DividerBookmark>
          <div style={{ padding: "4px 20px 0 0" }}>
            <RenderBookMark
              bookMarked={props.isBookmarked}
              onClick={props.handleBookmarkClick}
            />
          </div>
        </DividerBookmark>
        {/* <ToolTip title={'All Notes'} placement='left' arrow>
          <CommentIcon>
            <IconButton onClick={props.handleNotesIconClick}>
              <img src={Comment} />
            </IconButton>
          </CommentIcon>
        </ToolTip> */}
        <SubHeading>{props.content && props.content.title}</SubHeading>
        <Box pt={2} pb={2} className={"left-side-card-text"}>
          <img src={ClockImage} alt="clockImage" style={{ width: 17 }} />
          &nbsp;&nbsp;&nbsp;
          {props.content && props.content.duration} Min
        </Box>

        <TopGridSubPara>
          {/* {renderHighlightedTask()} */}
          <p
            className={"copy__allowed"}
            dangerouslySetInnerHTML={{
              __html: props.content && props.content.content,
            }}
          />
        </TopGridSubPara>
      </Box>

      <div className={"bottom-card-align"}>
        {!(props.currentStatus === "COMPLETED") ? (
          <Button
            loading={props.loading}
            variant="outlined"
            color="primary"
            className={"footer-align"}
            onClick={props.handleReadClick}
          >
            {t("Mark as Read")}
          </Button>
        ) : (
          <div style={{ height: "46px" }} />
        )}
      </div>
      <Notes {...props.notesPops} />
    </div>
  );
}

export default RightCard;
