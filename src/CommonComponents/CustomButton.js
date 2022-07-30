import { Button } from "@mui/material";
import React from "react";

function CustomButton({
  children,
  variant,
  color,
  onClick,
  status,
  disabled,
  opacity,
  className,
  width,
  type,
  ...rest
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      opacity={opacity}
      className={className}
      type={type}
      width={width}
      status={status}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
