/**
 * (c) CareerLabs. All rights reserved.
 **/

import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import {
  Button,
  Filler,
  Footer as Main,
} from "../../../../../Assets/css/Preview/GmatStyles";

function Footer() {
  return (
    <Main>
      <Button variant="contained" color="primary">
        <Typography variant="body1">Pause Exam</Typography>
      </Button>
      <Filler />
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
        className="border_right"
      >
        <Typography variant="body1">Next</Typography>
      </Button>
    </Main>
  );
}

export default Footer;
