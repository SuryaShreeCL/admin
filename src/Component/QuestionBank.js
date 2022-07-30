import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default class QuestionBank extends Component {
  questionBank = [
    {
      type: "one",
      question: "In which field you would like to pursue higher education?",
      options: ["Technical", "Management", "Not decided"],
    },
    {
      type: "yes/no",
      question: "Do you like Back-End?",
    },
    {
      type: "multiple",
      question: "What do you like?",
      options: ["c", "c++", "java"],
    },
    {
      type: "one",
      question: "On a day basis at work,I would like to,",
      options: [
        "Architect,Design,Develop,Softwere Product",
        "Plan and Get things Done",
        "Analyse Information & Execute Projects",
        "Engineer solutions to real world problems",
      ],
    },
    {
      type: "yes/no",
      question: "Do you like Front-End?",
    },
    {
      type: "multiple",
      question: "What do you like?",
      options: ["Sql", "MySql", "MongoDB"],
    },
  ];

  getmuitheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#007bff",
        },
      },
    });

  render() {
    return (
      <ThemeProvider theme={this.getmuitheme()}>
        <div>
          <div className="container">
            {this.questionBank.map((qus) => {
              if (qus.type === "one") {
                return (
                  <>
                    <label className="qus">{qus.question}</label>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        {qus.options.map((op) => {
                          return (
                            <>
                              <FormControlLabel
                                value={op}
                                control={<Radio color="primary" />}
                                label={op}
                              />
                            </>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </>
                );
              } else if (qus.type === "yes/no") {
                return (
                  <>
                    <label className="qus">{qus.question}</label>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </>
                );
              } else if (qus.type === "multiple") {
                return (
                  <>
                    <label className="qus">{qus.question}</label>
                    <FormControl component="fieldset">
                      <FormGroup row>
                        {qus.options.map((op) => {
                          return (
                            <>
                              <FormControlLabel
                                control={<Checkbox name={op} color="primary" />}
                                label={op}
                                labelPlacement="End"
                              />
                            </>
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </>
                );
              }
            })}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
