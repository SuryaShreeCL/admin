import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import DropDown from "../Controls/DropDown";
import { useStyles } from "./Styles/Index";
import {
  deleteStudentCsf,
  getPgaCfcList,
  getStudentPgaCsfList,
  saveCsf,
} from "../../AsyncApiCall/PgaReport/CriticalSuccess";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";

function CriticalSuccessFactor(props) {
  const [factors, setFactors] = useState([
    { id: null, pgaCSF: null, remark: "" },
  ]);
  const [cv, setCv] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const classes = useStyles();
  const handleAddClick = () => {
    setFactors([...factors, { id: null, pgaCSF: null, remark: "" }]);
  };

  const getAndSetFactor = () => {
    getStudentPgaCsfList(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setFactors(
          response.data.data.length === 0
            ? [{ id: null, pgaCSF: null, remark: "" }]
            : response.data.data
        );
      }
    });
  };

  useEffect(() => {
    getPgaCfcList().then((response) => {
      if (response.status === 200) {
        setCv(response.data.data);
      }
    });
    getAndSetFactor();
  }, []);

  const handleCvChange = (value, index) => {
    let copyOf = [...factors];
    copyOf[index].pgaCSF = value;
    copyOf[index].remark = value ? value.remark : "";
    setFactors(copyOf);
  };

  const handleTextChange = (e, index) => {
    let copyOf = [...factors];
    copyOf[index][e.target.name] = e.target.value;
    setFactors(copyOf);
  };

  const handleSave = () => {
    let error = false;
    for (let index = 0; index < factors.length; index++) {
      if (isEmptyObject(factors[index].pgaCSF)) {
        error = true;
        break;
      }
      if (isEmptyString(factors[index].remark)) {
        error = true;
        break;
      }
    }
    if (!error) {
      saveCsf(
        props.match.params.studentId,
        props.match.params.productId,
        factors
      ).then((response) => {
        if (response.status === 200) {
          getAndSetFactor();
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
        }
      });
    } else {
      setSnack({
        snackMsg: HELPER_TEXT.requiredField,
        snackColor: "error",
        snackOpen: true,
      });
    }
  };

  const handleDelete = (index) => {
    let copyOf = [...factors];
    if (copyOf[index].id) {
      deleteStudentCsf(copyOf[index].id).then((response) => {
        if (response.status === 200) {
          getAndSetFactor();
        }
      });
    } else {
      if (copyOf.length !== 1) {
        copyOf.splice(index, 1);
        setFactors(copyOf);
      }
    }
  };

  return (
    <PageWrapper>
      <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
          <Grid item md={10} sm={10} xs={10} lg={10} xl={10}>
            <Typography variant={"h5"}>Critical Success Factors</Typography>
          </Grid>
          <Grid
            item
            md={2}
            sm={2}
            xs={2}
            lg={2}
            xl={2}
            container
            justifyContent={"flex-end"}
          >
            <AddButton onClick={handleAddClick} color={colors.primaryColor}>
              Add
            </AddButton>
          </Grid>
          {factors.map((eachFactor, index) => {
            return (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <DropDown
                    id="combo-box-demo"
                    options={cv}
                    className={classes.autoCompleteStyle}
                    value={eachFactor.pgaCSF}
                    onChange={(e, newValue) => handleCvChange(newValue, index)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Title"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                  <TextFieldComponent
                    onChange={(e) => handleTextChange(e, index)}
                    name={"remark"}
                    value={eachFactor.remark}
                    label={"Remarks"}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  container
                  justifyContent={"flex-end"}
                >
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteOutlineRoundedIcon color={"secondary"} />
                  </IconButton>
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>

      <BottomContainer onClick={handleSave} />
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackColor: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackColor}
        snackMsg={snack.snackMsg}
      />
    </PageWrapper>
  );
}

export default CriticalSuccessFactor;
