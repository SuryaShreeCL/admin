/**
 * (c) CareerLabs. All rights reserved.
 **/

import React from "react";
import {
  Footer as Main,
  Filler,
  Button,
} from "../../../../../Assets/css/Preview/GmatStyles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import { routePaths } from "../../../../../routes/RoutePath";
import QueryString from "qs";
// import _ from "lodash";

function Footer() {
  // const { pathname: pathName } = location;
  // const { section, resume } = QueryString.parse(location.search, {
  // ignoreQueryPrefix: true,
  // });

  // const renderPrevious = () => {
  // return !(
  //   (
  //     pathName === routePaths.gmat.test ||
  //     pathName === routePaths.gmat.endSection ||
  //     !!(
  //       routePaths.gmat.instruction &&
  //       section &&
  //       !_.isEmpty(sectionData) &&
  //       sectionData.data.currentSection > 1
  //     )
  //   )
  //   // !!(pathName === routePaths.gmat.instruction && resume)
  //   // &&
  //   //
  // );
  // };

  // const renderPauseButton = () => {
  //   // return !(
  //   //   pathName === routePaths.gmat.instruction ||
  //   //   pathName === routePaths.gmat.section
  //   // );
  // };

  return (
    <Main>
      {/* {renderPauseButton() && ( */}
      <Button
        variant="contained"
        color="primary"
        // onClick={handlePause}
      >
        <Typography variant="body1">Pause Exam</Typography>
      </Button>
      {/* )} */}
      <Filler />
      {/* {console.log(renderPrevious())} */}
      {/* {renderPrevious() && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          // onClick={handlePrevious}
        >
          <Typography variant="body1">Previous</Typography>
        </Button>
      )} */}
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
        className="border_right"
        // onClick={handleNext}
      >
        <Typography variant="body1">Next</Typography>
      </Button>
    </Main>
  );
}

export default Footer;
