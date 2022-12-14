/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import Latex from "../../../../../Utils/LatexViewer";
import Grid from '@material-ui/core/Grid'
const App = ({ choices, bundleLength, selectedChoice,question }) => {
  var alphaOption = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  var romanLetter = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

  const renderHeader = () => {
    let arr = [];
    for (let i = 1; i <= bundleLength; i++) {
      arr.push(`blank (${romanLetter[i - 1]})`);
    }
    return arr;
  };

  const renderOptions = () => {
    let arr = [];
    for (let i = 1; i <= bundleLength; i++) {
      let choice = [];
      for (let j = 0; j < choices.length; j++) {
        if (choices[j].bundleNo === i) {
          choice.push(choices[j]);
        }
      }
      arr.push({
        bundleNo: i,
        choices: choice,
      });
    }
    return arr;
  };

  let idxx = -1;
  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12}>
        <div
          className={""}
          dangerouslySetInnerHTML={{ __html: question }}
        ></div>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <table className={"bundle__table"}>
          <thead>
            <tr>
              {renderHeader().map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {renderOptions().map((item, i) => {
              let indx = 0;
              return (
                <td className={"td"}>
                  {item.choices.map((option, idx) => {
                    return (
                      <tr>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="optionA"
                              color="primary"
                              checked={selectedChoice.some(
                                (selected) =>
                                  selected.bundleNo === item.bundleNo &&
                                  selected.id === option.id
                              )}
                            />
                          }
                          label={
                            <Box display={"flex"}>
                              <span>
                                {alphaOption[(idxx = idxx + 1)]})&nbsp;
                              </span>
                              <Latex math={option.text} />
                            </Box>
                          }
                        />
                      </tr>
                    );
                  })}
                </td>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default App;
