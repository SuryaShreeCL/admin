import { DialogContent, Grid, TextField } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import Dropzone from "react-dropzone";
import PrimaryButton from "../../../Utils/PrimaryButton";
import { Typo } from "../../Utils/controls/Styles";
import { useStyles } from "./Styles";
import * as moment from "moment";

function GreDialogContent({
  handleChange,
  handleDrop,
  handleClose,
  handleSave,
  attemptOptions,
  analyticalOptions,
  attempt,
  quantitativeReasoning,
  date,
  analytical,
  verbalReasoning,
  total,
  fileError,
  finalFile,
}) {
  const renderScoreCard = (file) => {
    if (file) {
      const { name, size } = file;
      return <li key={name}>{size ? `${name} - ${size} bytes` : name}</li>;
    } else return null;
  };
  let greDateFinal = moment(date).format("YYYY-MM-DD");

  const classes = useStyles({ isFileError: Boolean(fileError) });
  return (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typo className={classes.dialogTitle}>{"GRE Score"}</Typo>
          <hr />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            popupIcon={<ExpandMore className={classes.arrowColor} />}
            id={"combo-box-demo"}
            options={attemptOptions || []}
            value={attempt}
            onChange={(e, newValue) => {
              handleChange({
                target: { name: "attempt", value: newValue },
              });
            }}
            getOptionLabel={({ title }) => title}
            renderInput={(params) => (
              <TextField {...params} label={"Attempt"} variant={"standard"} />
            )}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {console.log(date)}
          <TextField
            disableFuture
            margin={"normal"}
            label={"Exam Date"}
            value={date}
            type={"date"}
            name={"date"}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            type={"number"}
            label={"Quantitative Reasoning (Max Score 170)"}
            value={quantitativeReasoning}
            name={"quantitativeReasoning"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 170) {
                e.preventDefault();
              } else {
                handleChange(e);
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            type={"number"}
            label={"Verbal Reasoning (Max Score 170)"}
            value={verbalReasoning}
            name={"verbalReasoning"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 170) {
                e.preventDefault();
              } else {
                handleChange(e);
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            type={"number"}
            label={"Total (Max Score 340)"}
            value={total}
            name={"total"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 340) {
                e.preventDefault();
              } else {
                handleChange(e);
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <Autocomplete
            popupIcon={<ExpandMore className={classes.arrowColor} />}
            id={"combo-box-demo"}
            options={analyticalOptions}
            value={analytical}
            onChange={(e, newValue) => {
              handleChange({
                target: { name: "analytical", value: newValue },
              });
            }}
            getOptionLabel={({ title }) => title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Analytical Writing Assessment (Max Score 6)"}
                variant={"standard"}
              />
            )}
            fullWidth
          />
        </Grid>
        <Grid item md={6} sm={5} xs={5}>
          <Dropzone onDrop={handleDrop} accept={".pdf"}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: classes.dropZoneLayout })}>
                  <input {...getInputProps()} />
                  <PublishRoundedIcon color={"primary"} />
                </div>
                <Typo
                  className={classes.fileError}
                  variant={"body2"}
                  color={"secondary"}
                >
                  {"Marksheet/Transcript"}
                </Typo>
                <aside>
                  <p className={classes.fileHelperText}>
                    {"File Size: less than 1MB | Format: PDF"}
                  </p>
                  <ul>{renderScoreCard(finalFile)}</ul>
                </aside>
              </section>
            )}
          </Dropzone>
        </Grid>
        <Grid item md={6} sm={6} xs={6}></Grid>
        <Grid item md={3}>
          <PrimaryButton
            color={"primary"}
            variant={"contained"}
            className={classes.buttonStyle}
            onClick={() => handleSave("GRE")}
          >
            {"Save"}
          </PrimaryButton>
        </Grid>
        <Grid item md={3}>
          <PrimaryButton
            color={"primary"}
            variant={"outlined"}
            className={classes.buttonStyle}
            onClick={handleClose}
          >
            {"Cancel"}
          </PrimaryButton>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export { GreDialogContent };
