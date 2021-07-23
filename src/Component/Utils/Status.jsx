import GreenTick from "../../Asset/Images/greenTick.png";
import Warning from "../../Asset/Images/warning.png"
import React from "react"

const Status=({status,onClick})=>{
    return <img
    src={status==="verified".toLocaleLowerCase() ? GreenTick : Warning }
    style={{
      height: 17,
      width: 17,
      position: "relative",
      top: 5,
      cursor: "pointer",
    }}   
    onClick={onClick}
  />  
}

export default Status;