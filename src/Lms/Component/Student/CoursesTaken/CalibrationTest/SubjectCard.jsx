import { Box, Grid, Typography } from "@material-ui/core";
import {
  FlexColumnView,
  FlexView,
  InsightSubTitle,
  LevelContent,
} from "../../../../Assets/StyledComponents";
import { minutesToTime } from "../../../../Utils/HelperFunction";
import { useStyles } from "./Style";
import React from "react";

const BOX_COLOR = "rgba(183, 222, 255, 0.1)";

function SubjectCard({ subjects }) {
  const classes = useStyles();

  return subjects && subjects.length !== 0
    ? subjects.map((subject) => {
        var overallObj = subject?.donut?.overall;
        var totalArr = subject?.donut?.total;
        var scoreArr = subject?.donut?.score;
        var pieObj = subject?.pie;
        var customObj = {
          title: pieObj.title,
          events: pieObj.time,
        };
        var customCardArr = [...(pieObj.card || []), customObj];
        return (
          <>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12}>
              <FlexView gap={"8px"} justifyContent={"start"}>
                <InsightSubTitle>{overallObj.title}</InsightSubTitle>
                <InsightSubTitle>{`${overallObj?.score}/${overallObj?.total}`}</InsightSubTitle>
              </FlexView>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {totalArr.length !== 0 &&
                  totalArr.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3}>
                      <Box bgcolor={BOX_COLOR} padding={"24px !important"}>
                        <FlexView gap={"10px"}>
                          <Typography
                            variant={"subtitle1"}
                            className={classes.subText}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            variant={"h5"}
                            className={classes.subText}
                          >
                            {item.total
                              ? `${scoreArr[index]}/${item.total}`
                              : scoreArr[index]}
                          </Typography>
                        </FlexView>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {customCardArr.length !== 0 &&
                  customCardArr.map((cardContent, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <Box
                        bgcolor={BOX_COLOR}
                        padding={"20px 16px !important"}
                        minHeight={"100%"}
                      >
                        <FlexColumnView gap={"20px"}>
                          <LevelContent>{cardContent?.title}</LevelContent>
                          {cardContent?.events &&
                            cardContent.events.length !== 0 &&
                            cardContent.events.map((item) => (
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
      })
    : null;
}

export default SubjectCard;
