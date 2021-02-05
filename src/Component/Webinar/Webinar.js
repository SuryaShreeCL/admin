import React, { Component } from "react";
import Papa from "papaparse";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "./Webinar.css";

export default class Webinar extends Component {
  render() {
    let bigArray;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    function ReadCSV(event) {
      event.preventDefault();
      if (
        document.getElementById("upload-csv").value != "" &&
        document.getElementById("session").value != "" &&
        document.getElementById("duration1").value != ""
      ) {
        Papa.parse(document.getElementById("upload-csv").files[0], {
          download: true,
          header: false,
          complete: function (results) {
            console.log(results.data);
            bigArray = results.data;
            console.log(bigArray);
            let newArray = [];
            let keyItems = [
              "First Name",
              "Last Name",
              "Email Address",
              "Time in Session",
              "College",
              "Department",
              "Phone",
              "Semester",
              "Branch",
            ];
            for (let i = 8; i < bigArray.length; i++) {
              let object = {};
              bigArray[7].forEach((element, elementIndex) => {
                for (let j = 0; j < keyItems.length; j++) {
                  if (keyItems[j].includes(element)) {
                    object[element] = bigArray[i][elementIndex];
                    if (element === "Time in Session") {
                      let attendeeTimeArray;
                      if (
                        bigArray[i][elementIndex] == "--" ||
                        bigArray[i][elementIndex] == undefined
                      ) {
                        console.log("none");
                      } else {
                        attendeeTimeArray = bigArray[i][elementIndex].split(
                          " "
                        );
                        let time;
                        for (let k = 0; k < attendeeTimeArray.length; k++) {
                          if (attendeeTimeArray.length == 4) {
                            if (
                              attendeeTimeArray[k].includes("hour") &&
                              attendeeTimeArray[k + 2].includes("minutes")
                            ) {
                              time =
                                parseInt(attendeeTimeArray[0]) * 60 +
                                parseInt(attendeeTimeArray[2]);
                              console.log(
                                JSON.stringify(time) + " " + "minutes"
                              );
                              object[element] =
                                JSON.stringify(time) + " " + "minutes";
                            }
                          }
                          if (attendeeTimeArray.length == 2) {
                            if (attendeeTimeArray[k].includes("hour")) {
                              time = parseInt(attendeeTimeArray[0]) * 60;
                              console.log(
                                JSON.stringify(time) + " " + "minutes"
                              );
                              object[element] =
                                JSON.stringify(time) + " " + "minutes";
                            }
                          }
                        }
                      }
                      console.log(attendeeTimeArray);
                    }
                  }
                }
              });
              if (
                object["Time in Session"] == "--" ||
                object["Time in Session"] == undefined
              ) {
                // console.log("yes")
              } else {
                newArray.push(object);
              }
              for (let m = 0; m < newArray.length; m++) {
                newArray[m]["Lead Stage"] = "c0";
                newArray[m]["Date"] = bigArray[2][0].split(" ")[0];
                // console.log(bigArray[2][0].split(" ")[0])
                // console.log(newArray[m]["Time in Session"])
                if (
                  document.getElementById("session").value ==
                  "Main Session - P+H"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "C-C0";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else {
                    newArray[m]["Original Lead Stage"] = "C-C0a";
                  }
                }
                if (
                  document.getElementById("session").value == "Follow Up Cat A"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "A-C0a";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else {
                    newArray[m]["Original Lead Stage"] = "A-C2a";
                  }
                }
                if (
                  document.getElementById("session").value == "Follow Up Cat C"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "C-C0a";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else {
                    newArray[m]["Original Lead Stage"] = "C-C2a";
                  }
                }
                if (
                  document.getElementById("session").value == "Main Session - H"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "A-C0";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else {
                    newArray[m]["Original Lead Stage"] = "A-C0a";
                  }
                }
                if (
                  document.getElementById("session").value ==
                  "Follow Up for Regular - H"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "A-C0a";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else {
                    newArray[m]["Original Lead Stage"] = "A-C2a";
                  }
                }
                if (
                  document.getElementById("session").value ==
                  "Main Session - CLAPP"
                ) {
                  if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                    parseInt(document.getElementById("duration1").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "CLAPP-C0";
                    console.log(
                      typeof document.getElementById("duration1").value
                    );
                  } else if (
                    parseInt(newArray[m]["Time in Session"].split(" ")[0]) >
                    parseInt(document.getElementById("duration2").value)
                  ) {
                    newArray[m]["Original Lead Stage"] = "CLAPP-C2A";
                  } else {
                    newArray[m]["Original Lead Stage"] = "CLAPP-C0A";
                  }
                }
              }
            }
            console.log(newArray);
            console.log(document.getElementById("duration1").value);
            console.log(document.getElementById("session").value);

            //   let time = newArray[1]["Time in Session"]
            //   console.log(time)
            const ws = XLSX.utils.json_to_sheet(newArray);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
            });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "sheet1" + fileExtension);
          },
        });       
      document.getElementById("upload-csv").value = "";
      document.getElementById("session").value = "" ;
      document.getElementById("duration1").value = "";
      document.getElementById("duration2").value = "";
      }
      else {
        document.getElementById("validationMessage").style.display="block"
          setTimeout(function(){ document.getElementById("validationMessage").style.display="none" }, 2000)
      }
    }
    return (
      <div className="flexColumn">
        <h2 className="heading">Webinars Lead Automation</h2>
        <form className="form">
        <h3 className="step1">Step 1: Please browse and upload .csv file</h3>
          <input type="file" id="upload-csv" accept=".csv" required />
          <h3 className="step2">Step 2: Please fill the tagging rules below:</h3>
          <div class="container">
            <input
              id="duration1"
              type="number"
              placeholder="Duration1"
              required
            />
            <label for="duration2">
              This duration is only for CLAPP webinars
            </label>
            <input id="duration2" type="number" placeholder="Duration2" />
            <label for="session">Choose the Session from the list:</label>
            <input list="sessions" name="session" id="session"placeholder="Session" required />

            <datalist id="sessions">
              <option value="Main Session - P+H" />
              <option value="Follow Up Cat A" />
              <option value="Follow Up Cat C" />
              <option value="Main Session - H" />
              <option value="Follow Up for Regular - H" />
              <option value="Main Session - CLAPP" />
            </datalist>
          </div>
          <div id="validationMessage">please fill all required fields!!</div>
          <h3 className="step3">Step 3: Click on download button to download excel sheet</h3>
          <div class="container1">
            <button id="btn-upload-csv" type="submit" onClick={ReadCSV}>
              Download
            </button>
          </div>
        </form>
      </div>
    );
  }
}
