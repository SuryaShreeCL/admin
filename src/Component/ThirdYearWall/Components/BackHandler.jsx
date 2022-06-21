import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { BackHandlerContainer } from "../Assets/Styles/CreatePostStyles";
import { thirdYear } from "../../RoutePaths";
import { useHistory } from "react-router-dom";

const BackHandler = ({ title, tab, isDrive }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push({
      pathname: thirdYear,
      tab: tab,
    });
  };

  return (
    <BackHandlerContainer>
      <ArrowBackIcon
        style={{ color: "#4383E7", fontSize: "1.7rem" }}
        onClick={handleBack}
      />
      <h5 style={{ cursor: "pointer" }} onClick={handleBack}>
        {title}
      </h5>
    </BackHandlerContainer>
  );
};

export default BackHandler;
