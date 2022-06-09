import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Container, TopTab, TopTabs } from "./Assets/Styles/WallStyles";
import { useLocation } from "react-router-dom";
import Webinars from "./Pages/ThirdYearWebinars";
import ConversionPopup from "./Pages/ConversionPopup";

const ThirdYearWallLanding = () => {
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <Webinars />;
      } else if (value === 1) {
        return <ConversionPopup />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tabCount, "tabCount");
  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <TopTabs
            value={tabCount}
            textColor={"inherit"}
            onChange={(e, value) => setTabCount(value)}
            aria-label="tabs"
          >
            <TopTab label="3rd Year Webinars" />
            <TopTab label="Customize Conversion Pop-up" />
          </TopTabs>
        </Grid>
        <Grid item md={12} overflow="auto">
          {renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThirdYearWallLanding;
