import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "../../../Asset/icons/upload.svg";
import { customTheme, StyledButton, Typo, UploadIcon } from "./Styles";

const borderImage = (color) => {
  return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23${color}FF' stroke-width='4' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`;
};

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "26px 12px 36px",
  transition: "border .3s ease-in-out",
  background: "#ffffff",
  backgroundImage: borderImage("18AAE7"),
  borderRadius: "10px",
  gap: "7px",
  cursor: "move",
  overflow: "hidden",
  outline: "none",
};

const activeStyle = {
  backgroundImage: borderImage("2196F3"),
};

const acceptStyle = {
  backgroundImage: borderImage("00E676"),
};

const rejectStyle = {
  backgroundImage: borderImage("FF1744"),
};

const disabledStyle = {
  pointerEvents: "none",
  opacity: 0.5,
};

function DropzoneComponent({ acceptTypes, disabled, onDrop }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: acceptTypes,
    disabled: disabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(disabled ? disabledStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept, disabled]
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <UploadIcon src={Upload} />
        <Typo color={"#333333"}>
          <center>{"Drag and drop file"}</center>
          <center>{"or"}</center>
        </Typo>
        <StyledButton
          variant={"contained"}
          height={"36px"}
          style={customTheme.palette.contained}
        >
          {"Browse"}
        </StyledButton>
      </div>
    </section>
  );
}

export default DropzoneComponent;
