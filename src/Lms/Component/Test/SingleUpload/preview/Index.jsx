import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Transition from "../../../../Utils/Transition";
import GmatPreview from "./gmat/Index";
import "../../../../Assets/css/Preview/Preview.css";
import GrePreview from "./gre/Test";
import DefaultPreview from "./exam/Index";
import Explanation from "./Explanation";

function Index(props) {
  useEffect(() => {
    if (props.open) window.addEventListener("click", handleClick, true);
  }, [props.open]);

  const handleClick = () => {
    window.removeEventListener("click", handleClick, true);
    props.handleClose();
  };

  const courseTitle = sessionStorage.getItem("courseTitle");
  const testType = sessionStorage.getItem("testType");

  switch (testType) {
    case "CALIBRATION": {
      if (courseTitle === "GMAT") {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <GmatPreview {...props} />
            <Explanation {...props} />
          </Dialog>
        );
      } else if (courseTitle === "GRE") {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <GrePreview {...props} />
            <Explanation {...props} />
          </Dialog>
        );
      } else {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <DefaultPreview {...props} />
            <Explanation {...props} />
          </Dialog>
        );
      }
      break;
    }
    default:
      return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
          <DefaultPreview {...props} />
          <Explanation {...props} />
        </Dialog>
      );
  }
}

export default Index;
