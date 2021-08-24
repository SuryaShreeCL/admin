import React, { useState, useEffect ,useRef } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { SECTION } from "../../Constant/Variables";

const Model = ({ section, handleClose ,...props }) => {
  const [verified, setVerified] = useState(null);
  const [remark,setRemark] = useState(null)
  const { sectionName, model, data } = section;

  const prevData=useRef({data}).current;


  useEffect(() => {       
    if(prevData!==data){
      if(data){
        setVerified(data.status);
      setRemark(data.remark)
      }      
    }
    if (data) {           
      setVerified(data.status);
      setRemark(data.remark)      
    }
    return () => { 
      prevData.data=data;      
    };
  },[data]);

  const status = [
    { title: "Verified", value: "Verified" },
    { title: "Not Verified", value: "NotVerified" },
    { title: "Mismatch", value: "Mismatched" },
  ];

  const updateVerification = () => {     
    let obj = {
      student: {
        id: props.match.params.studentId,
      },
      section: {
        name: sectionName,
      },
      remark: verified==="Mismatched" ? remark : "",
      status: verified,
      updatedDate: new Date(),
    };
    props.updateVerificationStatus(obj,res=>{      
      props.viewStudentStatus(props.match.params.studentId);      
      handleClose(); 
    });       
  };

  return (
    <Dialog
      fullWidth={"sm"}
      maxWidth={"sm"}
      open={model}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <Box p={3}>
        <Box fontWeight={600} fontSize={24} color={"#052A4E"} style={{margin:"20px"}}>
          Data Verification {sectionName}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gridGap={15} pt={2} style={{margin:"20px"}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select the Status from Dropdown
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              onChange={(e) => setVerified(e.target.value)}
              value={verified}
            >
              {status.map((item) => (
                <MenuItem value={item.value}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {verified === "Mismatched" && (
            <TextField
              variant={"standard"}
              multiline
              fullWidth
              label={"Add Comment Here"}
              onChange={(e)=>setRemark(e.target.value)}
              value={remark}
            />
          )}
        </Box>
        <DialogActions style={{ justifyContent: "center", paddingTop: 50 }}>
          <Button
            variant={"contained"}
            style={{
              backgroundColor: "#1093FF",
              borderRadius: 30,
              padding: 5,
              width: 250,
              height: 40,
            }}
            color="primary"
            onClick={updateVerification}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Model;
