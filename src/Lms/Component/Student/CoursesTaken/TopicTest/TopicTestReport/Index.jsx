import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import { useStyles } from "./Style";
import {
  FlexColumnView,
  FlexView,
  LevelContent,
} from "../../../../../Assets/StyledComponents";
import TableComp from "./TableComp";
import { minutesToTime } from "../../../../../Utils/HelperFunction";
import TopicTest from "../Index";

const BOX_COLOR = "rgba(254, 187, 44, 0.5)";

function TopicTestReport({ data, handleClickBack }) {
  const classes = useStyles();
  const tableData = data?.review || [];
  //   const customCardObj = {
  //     title: data.insights.cards.title,
  //     events: data.insights.cards.events,
  //   };
  const customCardListArr = data?.insights?.cards || [];

  return (
    <Box padding={"0 20px !important"}>
      {/* {isReport ? (
        <TopicTest studentId={studentId} courseId={productId} />
      ) : ( */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <FlexView gap={"50px"}>
              <Box>
                <FlexView gap={"16px"}>
                  <IconButton onClick={handleClickBack}>
                    <ArrowBackIosOutlinedIcon className={classes.icon} />
                  </IconButton>
                  <Typography className={classes.heading}>
                    {data.title}
                  </Typography>
                </FlexView>
              </Box>
            </FlexView>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <FlexView gap={"50px"}>
              <Box>
                <FlexView gap={"16px"}>
                  <Typography className={classes.heading2}>
                    {data.insights.donut.title}
                  </Typography>
                  <Typography
                    className={classes.heading2}
                  >{`${data.insights.donut.score}/${data.insights.donut.totalQuestion}`}</Typography>
                </FlexView>
              </Box>
            </FlexView>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {customCardListArr.length !== 0 &&
              customCardListArr.map(({ title, events }) => {
                return (
                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      bgcolor={BOX_COLOR}
                      padding={"20px 16px !important"}
                      minHeight={"100%"}
                    >
                      <FlexColumnView gap={"20px"}>
                        <LevelContent>{title}</LevelContent>
                        {events &&
                          events.length !== 0 &&
                          events.map((item) => {
                            return (
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
                                  {minutesToTime(item.time)}
                                </Typography>
                              </FlexView>
                            );
                          })}
                      </FlexColumnView>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        {tableData && <TableComp tableData={tableData} />}
      </Grid>
      {/* )} */}
    </Box>
  );
}
export default TopicTestReport;
