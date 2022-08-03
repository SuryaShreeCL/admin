import Loader from "../../Component/Utils/controls/Loader";
import React from "react";

export default function LoadingSpinner({ loading }) {
  return loading ? (
    <div style={style}>
      <Loader />
    </div>
  ) : null;
}

const style = {
  position: "absolute",
  left: "calc(50% - 40px)",
  top: "auto",
};
