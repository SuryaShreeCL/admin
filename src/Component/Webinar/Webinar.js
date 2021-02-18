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
        document.getElementById("duration1").value != "" &&
        document.getElementById("account").value == "Goto Webinar"
      ) {
        Papa.parse(document.getElementById("upload-csv").files[0], {
          download: true,
          header: false,
          complete: function(results) {
            console.log(results.data);
            bigArray = results.data;
            console.log(bigArray);
            let newArray = [];
            let newModifiedArray = [];
            let keyItems = [
              "First Name",
              "Last Name",
              "Email Address",
              "Time in Session",
              "College",
              "Department",
              "Department.",
              "Phone",
              "Semester",
              "Organization",
              "Job Title",
              "Questions and Comments",
              "I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO",
              "I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO",
              "I want to build a PROFILE for"
            ];
            
            let newModifiedObject;
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
                            else {
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
                object["Time in Session"] == undefined ||  
                object["I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO"] == "NOT interested. No help required" ||
                object["I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO"]=="NOT interested. No help required"
              ) {
                // console.log("yes")
              } else {
                newArray.push(object);
              }
              
            }
            for (let m = 0; m < newArray.length; m++) {
              newArray[m]["Lead Stage"] = "c0";
              newArray[m]["Date"] = bigArray[4][1].split(" ")[0];
              console.log(
                newArray[m]["Time in Session"].replace("minutes", "")
              );
              newArray[m]["Time in Session"] = newArray[m][
                "Time in Session"
              ].replace("minutes", "");
              newArray[m]["Time in Session"] = newArray[m][
                "Time in Session"
              ].replace(" ", "");
              newArray[m]["Time in Session"] = newArray[m][
                "Time in Session"
              ].replace("minute", "");
              // console.log(bigArray[2][0].split(" ")[0])
              // console.log(newArray[m]["Time in Session"])
              if (
                document.getElementById("session").value ==
                "Main Session - P+H"
              ) {
                if (newArray[m]["I want to build a PROFILE for"]=="Placements (Product/Core)" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  newArray[m]["Lead Category"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Placements (Product/Core)" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) >=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Masters Abroad" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  newArray[m]["Lead Category"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Masters Abroad" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) >=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  newArray[m]["Lead Category"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  newArray[m]["Lead Category"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                }
              }
              if (
                document.getElementById("session").value == "Follow Up Cat A"
              ) {
                if (
                  newArray[m]["I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO"]=="BookMySeat & Enroll NOW (Be in the First 10 Signups)"
                ) {
                  newArray[m]["Original Lead Stage"] = "A - Poll";
                  newArray[m]["Lead Category"] = "A1";
                }
                else if(newArray[m]["I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO"]=="BookMySeat & Enroll Surely, but need to consult with parents"){
                  newArray[m]["Original Lead Stage"] = "A - C2a";
                  newArray[m]["Lead Category"] = "A2";
                }
                else if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  newArray[m]["Lead Category"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C2a";
                  newArray[m]["Lead Category"] = "A - C0a";
                }
              }
              if (
                document.getElementById("session").value == "Follow Up Cat C"
              ) {
                if (
                  newArray[m]["I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO"]=="BookMySeat & Enroll NOW (Be in the First 10 Signups)"
                ) {
                  newArray[m]["Original Lead Stage"] = "C - Poll";
                  newArray[m]["Lead Category"] = "C1";
                }
                else if(newArray[m]["I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO"]=="BookMySeat & Enroll Surely, Need More Time/More Clarity"){
                  newArray[m]["Original Lead Stage"] = "C - C2a";
                  newArray[m]["Lead Category"] = "C2";
                }
                else if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Lead Category"] = "C - C0a";
                  newArray[m]["Original Lead Stage"] = "C - C2a";
                }
              }
              if (
                document.getElementById("session").value == "Main Session - H"
              ) {
                if (newArray[m]["I want to build a PROFILE for"]=="Masters Abroad" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  newArray[m]["Lead Category"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Masters Abroad" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) >=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  newArray[m]["Lead Category"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Placements (Product/Core)" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  newArray[m]["Lead Category"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (newArray[m]["I want to build a PROFILE for"]=="Placements (Product/Core)" &&
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) >=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  newArray[m]["Lead Category"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  newArray[m]["Lead Category"] = "A - C0a";
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
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C2a";
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
                  newArray[m]["Original Lead Stage"] = "CLAPP - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) >
                  parseInt(document.getElementById("duration2").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "CLAPP - C2a";
                } else {
                  newArray[m]["Original Lead Stage"] = "CLAPP - C0a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Main Session - H Re-Eng"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Main Session - P+H Re-Eng"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                }
              }
              newModifiedObject = {
                Date: newArray[m]["Date"],
                "Last Name": newArray[m]["Last Name"],
                "First Name": newArray[m]["First Name"],
                "Email Address": newArray[m]["Email Address"],
                "Phone": newArray[m]["Phone"],
                "College": newArray[m]["College"] || newArray[m]["Organization"],
                "Lead Category":newArray[m]["Lead Category"],
                "Comments": newArray[m]["Time in Session"],
                "Branch": newArray[m]["Department"] || newArray[m]["Department."] || newArray[m]["Job Title"],
                "Semester": newArray[m]["Semester"] || newArray[m]["Questions and Comments"],
                "Lead Stage": newArray[m]["Lead Stage"],
                "Original Lead Stage": newArray[m]["Original Lead Stage"],
                // "I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO ": newArray[m]["I am AWARE & CLEAR there is a PRICE, PROCESS involved in this PLATFORM. I WANT TO "],
                // "I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO": newArray[m]["I am AWARE there is a PRICE, PROCESS involved in BYJU's GRE,Profile Builder & ACS Platform, I WANT TO"],
              };            
            newModifiedArray.push(newModifiedObject);
            }            
            console.log(newArray);
            console.log(document.getElementById("duration1").value);
            console.log(document.getElementById("session").value);

            //   let time = newArray[1]["Time in Session"]
            //   console.log(time)
            const ws = XLSX.utils.json_to_sheet(newModifiedArray);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
            });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(
              data,
              `${bigArray[0][1]} - ${bigArray[4][1].split(" ")[0]}` +
                fileExtension
            );
          },
        });
        // document.getElementById("upload-csv").value = "";
        // document.getElementById("session").value = "" ;
        // document.getElementById("duration1").value = "";
        // document.getElementById("duration2").value = "";
      }
      else if(document.getElementById("upload-csv").value != "" &&
      document.getElementById("session").value != "" &&
      document.getElementById("duration1").value != "" &&
      document.getElementById("account").value == "Zoom"){
        Papa.parse(document.getElementById("upload-csv").files[0], {
          download: true,
          header: false,
          complete: function(results) {
            console.log(results.data);
            bigArray = results.data;
            console.log(bigArray);
            let newArray = [];
            let newModifiedArray = [];
            let keyItems = [
              "First Name",
              "Last Name",
              "Email",
              "Time in Session (minutes)",
              "College",
              "Department",
              "Department.",
              "Phone",
              "Semester",
              "Organization",
              "Job Title",
              "Questions & Comments",
              "Industry",
              "Choice of Career After Graduation"
            ];
            
            let newModifiedObject;
            let loopStart;
            for(let h=0; h<bigArray.length;h++){
              if(bigArray[h][0]=="Attendee Details"){
                loopStart = h+2
              }
            }
            //This stores key value pairs where
            //key = emailId, value = index of newArray
            let uniqueUserObj = {"jashwanthi":0};
            let counter = 0;
            for (let i = loopStart; i < bigArray.length; i++) {
              let object = {};
              bigArray[loopStart-1].forEach((element, elementIndex) => {
                for (let j = 0; j < keyItems.length; j++) {
                  if (keyItems[j].includes(element)) {
                    object[element] = bigArray[i][elementIndex];
                  }
                }
              });
              if (
                object["Time in Session (minutes)"] == "--" ||
                object["Time in Session (minutes)"] == undefined
              ) {
                // console.log("yes")
              } else {
                if(uniqueUserObj[object["Email"]]===undefined){
                  uniqueUserObj[object["Email"]]=counter;
                  counter++;
                  newArray.push(object);
                }
                else{
                  let value= parseInt(newArray[uniqueUserObj[object["Email"]]]["Time in Session (minutes)"]) + parseInt(object["Time in Session (minutes)"]);
                  newArray[uniqueUserObj[object["Email"]]]["Time in Session (minutes)"]= `${value}`;
                }               
              } 
            }
            for (let m = 0; m < newArray.length; m++) {
              newArray[m]["Lead Stage"] = "c0";
              newArray[m]["Date"] = `${bigArray[3][2].split(" ")[0]} ${bigArray[3][2].split(" ")[1]} ${bigArray[3][2].split(" ")[2]}`;
              // console.log(bigArray[2][0].split(" ")[0])
              // console.log(newArray[m]["Time in Session"])
              if (
                document.getElementById("session").value ==
                "Main Session - P+H"
              ) {
                if ((newArray[m]["Industry"]=="Placements" &&
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)) || (newArray[m]["Choice of Career After Graduation"]=="Placements" &&
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value))
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  newArray[m]["Lead Category"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if ((newArray[m]["Industry"]=="Placements" &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) >=
                parseInt(document.getElementById("duration1").value)) || (newArray[m]["Choice of Career After Graduation"]=="Placements" &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) >=
                parseInt(document.getElementById("duration1").value))
              ) {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if ((newArray[m]["Industry"]=="HigherEducation" &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                parseInt(document.getElementById("duration1").value)) || ((newArray[m]["Choice of Career After Graduation"]=="HIGHER EDUCATION - ABROAD" || newArray[m]["Choice of Career After Graduation"]=="HIGHER EDUCATION - INDIA") &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                parseInt(document.getElementById("duration1").value))
              ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  newArray[m]["Lead Category"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if ((newArray[m]["Industry"]=="HigherEducation" &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) >=
                parseInt(document.getElementById("duration1").value)) || ((newArray[m]["Choice of Career After Graduation"]=="HIGHER EDUCATION - ABROAD" || newArray[m]["Choice of Career After Graduation"]=="HIGHER EDUCATION - INDIA") &&
                parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) >=
                parseInt(document.getElementById("duration1").value))
              ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  newArray[m]["Lead Category"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                }
                else if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  newArray[m]["Lead Category"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  newArray[m]["Lead Category"] = "C - C0a";
                }
              }
              if (
                document.getElementById("session").value == "Follow Up Cat A"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C2a";
                }
              }
              if (
                document.getElementById("session").value == "Follow Up Cat C"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "C - C2a";
                }
              }
              if (
                document.getElementById("session").value == "Main Session - H"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Follow Up for Regular - H"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C2a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Main Session - CLAPP"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "CLAPP - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) >
                  parseInt(document.getElementById("duration2").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "CLAPP - C2a";
                } else {
                  newArray[m]["Original Lead Stage"] = "CLAPP - C0a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Main Session - H Re-Eng"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "A - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "A - C0a";
                }
              }
              if (
                document.getElementById("session").value ==
                "Main Session - P+H Re-Eng"
              ) {
                if (
                  parseInt(newArray[m]["Time in Session (minutes)"].split(" ")[0]) <=
                  parseInt(document.getElementById("duration1").value)
                ) {
                  newArray[m]["Original Lead Stage"] = "C - C0";
                  console.log(
                    typeof document.getElementById("duration1").value
                  );
                } else {
                  newArray[m]["Original Lead Stage"] = "C - C0a";
                }
              }
              newModifiedObject = {
                Date: newArray[m]["Date"],
                "Last Name": newArray[m]["Last Name"],
                "First Name": newArray[m]["First Name"],
                "Email Address": newArray[m]["Email"],
                "Phone": newArray[m]["Phone"],
                "College": newArray[m]["College"] || newArray[m]["Organization"],
                "Lead Category":newArray[m]["Lead Category"],
                "Comments": newArray[m]["Time in Session (minutes)"],
                "Branch": newArray[m]["Department"] || newArray[m]["Department."] || newArray[m]["Job Title"],
                "Semester": newArray[m]["Semester"] || newArray[m]["Questions & Comments"],
                "Lead Stage": newArray[m]["Lead Stage"],
                "Original Lead Stage": newArray[m]["Original Lead Stage"],
              };            
            newModifiedArray.push(newModifiedObject);
            }            
            console.log(newArray);
            console.log(document.getElementById("duration1").value);
            console.log(document.getElementById("session").value);

            //   let time = newArray[1]["Time in Session"]
            //   console.log(time)
            const ws = XLSX.utils.json_to_sheet(newModifiedArray);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
            });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(
              data,
              `${bigArray[3][0]} - ${bigArray[3][2].split(" ")[0]} ${bigArray[3][2].split(" ")[1]} ${bigArray[3][2].split(" ")[2]}` +
                fileExtension
            );
          },
        });
        // document.getElementById("upload-csv").value = "";
        // document.getElementById("session").value = "" ;
        // document.getElementById("duration1").value = "";
        // document.getElementById("duration2").value = "";
      } 
      else {
        document.getElementById("validationMessage").style.display = "block";
        setTimeout(function() {
          document.getElementById("validationMessage").style.display = "none";
        }, 2000);
      }
    }
    return (
      <div className="flexColumn">
        <h2 className="heading">Webinars Lead Automation</h2>
        <form className="form">
          <h3 className="step1">Step 1: Please browse and upload .csv file</h3>
          <input type="file" id="upload-csv" accept=".csv" required />
          <h3 className="step2">
            Step 2: Please fill the tagging rules below:
          </h3>
          <div class="container">
          <label for="session">Choose the account from the list:</label>
            <input
              list="accounts"
              name="account"
              id="account"
              placeholder="Account"
              required
            />

            <datalist id="accounts">
              <option value="Goto Webinar" />
              <option value="Zoom" />
            </datalist>
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
            <input
              list="sessions"
              name="session"
              id="session"
              placeholder="Session"
              required
            />

            <datalist id="sessions">
              <option value="Main Session - P+H" />
              <option value="Follow Up Cat A" />
              <option value="Follow Up Cat C" />
              <option value="Main Session - H" />
              <option value="Follow Up for Regular - H" />
              <option value="Main Session - CLAPP" />
              <option value="Main Session - H Re-Eng" />
              <option value="Main Session - P+H Re-Eng" />
            </datalist>
          </div>
          <div id="validationMessage">please fill all required fields!!</div>
          <h3 className="step3">
            Step 3: Click on download button to download excel sheet
          </h3>
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
