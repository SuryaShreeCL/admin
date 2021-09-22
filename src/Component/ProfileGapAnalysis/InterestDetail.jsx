import { TextField, Grid } from "@material-ui/core";
import React, { Component } from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./InterestDetail.css";

export default class InterestDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interestArr: [
        {
          areaOfInterest: "",
          enterArea: "",
        },
      ],
    };
  }


  handleAdd = () => {
    console.log("handleAdd");
    let arr = this.state.interestArr;
    arr.push({ areaOfInterest: 2, enterArea: "ewkjnwk" });
    this.setState({
      interestArr: arr,
    });
  };
  handleDelete = (index) => {
    if (this.state.interestArr.length > 1) {
      console.log(index, "Delete");
      let deleteArr = this.state.interestArr;
      deleteArr.splice(index, 1);
      this.setState({
        interestArr: deleteArr,
      });
    }
  };

  render() {
    return (
      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12} xs={12} sm={12} xl={12} lg={12}
            style={{ maxHeight: "92%", overflowY: "scroll", padding: "15px" }}
          >
            {this.state.interestArr.map((data, index) => (
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                  <p>Area of Interest ({index + 1})</p>
                </Grid>
                {/* textfield */}
                <Grid item md={1}  
                  xs={1}
                  sm={1}
                  xl={1}
                  lg={1}></Grid>
                <Grid
                  item
                  md={9}
                  xs={9}
                  sm={9}
                  xl={9}
                  lg={9}
                  className={"grid"}
                  // style={{
                  //   // display: "flex",
                  //   marginLeft: "30px",
                  // }}
                >
                  <TextField
                    className={"textField_align"}
                    label="Enter interest Area"
                    fullWidth
                  ></TextField>
                  </Grid>

                  <Grid item md={2} className={"icon_div"}>
                  {/* <div > */}
                    <AddCircleOutlineIcon
                      color="primary"
                      onClick={() => this.handleAdd()}
                    />
                    <DeleteOutlineIcon
                      color="secondary"
                      onClick={() => {
                        this.handleDelete(index);
                      }}
                    />
                  {/* </div> */}
                  </Grid>
                
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12} xs={12} sm={12} xl={12} lg={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{
                width: "100px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              Save
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

