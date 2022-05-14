import { Card, Typography, Grid } from "@material-ui/core";
import React from "react";
import TestImage from "../../Asset/Images/examdateicon.svg";
import "../../Asset/All.css";
import * as moment from "moment";

function ExamDateCard({ date }) {
  console.log(date);
  let actualdate = new Date(date).getDate();
  let actualmonth = new Date(date).getMonth() + 1;
  let actualyear = new Date(date).getFullYear();
  let finaldate = actualdate + "/" + actualmonth + "/" + actualyear;
  return (
    <div>
      <Card className={"gat_card"}>
        <Grid container>
          <Grid item md={4} align={"center"}>
            <img src={TestImage} alt={"Test_Image"} className={"gat_image"} />
          </Grid>
          <Grid item md={8} className={"gat_exam_card"}>
            <div className={"gat_exam_div"}>
              <div>
                <Typography>{"Exam Date"}</Typography>
              </div>
              <div>
                <Typography>
                  {date && moment(new Date(date)).format("MMM yyyy")}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default ExamDateCard;
