/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Typography } from "@material-ui/core";
import React from "react";
import {
  SubHeader as Main,
  IconButton,
} from "../../../../../Assets/css/Preview/GmatStyles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// import { routePaths } from "../../../../../routes/RoutePath";

function SubHeader(props) {
  const { sectionTitle, section } = props;
  const { pathname: pathName } = props.location;

  return (
    <Main>
      {section ? (
        <Typography variant="h6">{sectionTitle}</Typography>
      ) : (
        <span />
      )}
      {pathName === "" && (
        <Typography variant="body1" className="inline_class">
          <IconButton onClick={props.bookmarkIconClick}>
            {props.isBookmarked ? (
              <BookmarkIcon style={{ fill: "white" }} />
            ) : (
              <BookmarkBorderIcon style={{ fill: "white" }} />
            )}
          </IconButton>
          &nbsp; Bookmark
        </Typography>
      )}
    </Main>
  );
}

export default SubHeader;
