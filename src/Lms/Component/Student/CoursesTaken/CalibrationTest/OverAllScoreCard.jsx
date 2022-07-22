import { Box, Grid, Typography } from "@material-ui/core";
import {
  FlexColumnView,
  FlexView,
  InsightSubTitle,
  LevelContent,
} from "../../../../Assets/StyledComponents";
import {
  customDateFormat,
  minutesToTime,
} from "../../../../Utils/HelperFunction";
import { useStyles } from "./Style";
import React from "react";

const BOX_COLOR = "rgba(254, 187, 44, 0.5)";

function OverAllScoreCard({ insights }) {
  const classes = useStyles();

  const customCardObj = {
    title: insights?.pie?.title,
    events: insights?.pie?.time,
  };
  const customCardListArr = [...(insights?.pie?.card || []), customCardObj];
  return (
    <>
      <Grid item xs={12}>
        <Box>
          <FlexView gap={"30px"}>
            <Box>
              <FlexView gap={"8px"}>
                <InsightSubTitle>
                  {insights?.donut?.overall?.title}
                </InsightSubTitle>
                <InsightSubTitle>{`${insights?.donut?.overall?.score}/${insights?.donut?.overall?.total}`}</InsightSubTitle>
              </FlexView>
            </Box>
            <Box>
              <FlexView gap={"50px"}>
                <Box>
                  <FlexView gap={"16px"}>
                    <Typography
                      variant={"subtitle1"}
                      style={{ fontWeight: 600 }}
                    >
                      {"Start Date:"}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                      {customDateFormat(insights?.reportDate, "DD MMM YYYY") ||
                        "NA"}
                    </Typography>
                  </FlexView>
                </Box>
                <Box>
                  <FlexView gap={"16px"}>
                    <Typography
                      variant={"subtitle1"}
                      style={{ fontWeight: 600 }}
                    >
                      {"End Date:"}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                      {customDateFormat(insights?.startDate, "DD MMM YYYY") ||
                        "NA"}
                    </Typography>
                  </FlexView>
                </Box>
              </FlexView>
            </Box>
          </FlexView>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {insights.donut.total.length !== 0 &&
            insights.donut.total.map((item, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Box bgcolor={BOX_COLOR} padding={"24px !important"}>
                  <FlexView gap={"10px"}>
                    <Typography
                      variant={"subtitle1"}
                      className={classes.subText}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant={"h5"} className={classes.subText}>
                      {item.total
                        ? `${insights.donut.score[index]}/${item.total}`
                        : insights.donut.score[index]}
                    </Typography>
                  </FlexView>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {customCardListArr.length !== 0 &&
            customCardListArr.map(({ title, events }, index) => (
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  bgcolor={BOX_COLOR}
                  padding={"20px 16px !important"}
                  minHeight={"100%"}
                >
                  <FlexColumnView gap={"20px"}>
                    <LevelContent>{title}</LevelContent>
                    {events &&
                      events.length !== 0 &&
                      events.map((item) => (
                        <FlexView gap={"10px"}>
                          <Typography
                            variant={"subtitle1"}
                            className={classes.subLeftText}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant={"subtitle1"}
                            className={classes.subRightText}
                          >
                            {item.value
                              ? `${item.value}s`
                              : minutesToTime(item.time)}
                          </Typography>
                        </FlexView>
                      ))}
                  </FlexColumnView>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default OverAllScoreCard;
