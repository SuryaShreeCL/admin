import { DialogContent, Grid, TextField } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import Dropzone from "react-dropzone";
import PrimaryButton from "../../../Utils/PrimaryButton";
import { Typo } from "../../Utils/controls/Styles";
import { useStyles } from "./Styles";

function GmatDialogContent({
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
  integratedReasoning,
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

  const classes = useStyles({ isFileError: Boolean(fileError) });
  return (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typo className={classes.dialogTitle}>{"GMAT Score"}</Typo>
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
                ...e,
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
          <TextField
            disableFuture
            margin={"normal"}
            label={"Exam Date"}
            value={date}
            type={"month"}
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
            label={"Quantitative Reasoning (Max Score 60)"}
            value={quantitativeReasoning}
            name={"quantitativeReasoning"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 60) {
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
                ...e,
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
        <Grid item md={6}>
          <TextField
            type={"number"}
            label={"Integrated Reasoning (Max Score 8)"}
            value={integratedReasoning}
            name={"integratedReasoning"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 8) {
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
            label={"Verbal Reasoning (Max Score 60)"}
            value={verbalReasoning}
            name={"verbalReasoning"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 60) {
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
            label={"Total (Max Score 800)"}
            value={total}
            name={"total"}
            onChange={(e) => {
              if (parseInt(e.target.value) > 800) {
                e.preventDefault();
              } else {
                handleChange(e);
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={6} sm={5} xs={5}>
          <Dropzone onDrop={handleDrop}>
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
            onClick={() => handleSave("GMAT")}
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

export { GmatDialogContent };
