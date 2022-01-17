/**
 * (c) CareerLabs. All rights reserved.
 **/
import PulseLoader from "react-spinners/PulseLoader";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { Box } from "@material-ui/core";

export default ({ size }) => {
  return (
    <Box
      display={"flex"}
      height={"80vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <PulseLoader size={20} color={"#1093FF"} />
    </Box>
  );
};
