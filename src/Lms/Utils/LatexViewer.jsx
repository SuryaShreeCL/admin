import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";

const MathElement = ({ math }) => {
  const ref = useRef(null);
  const element = math || "";
  const el = parse(element);

  const renderMath = () => {
    if (window.MathJax)
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, element]);
  };

  useEffect(() => {
    renderMath();
  }, [el]);

  return (
    <div ref={ref} key={Math.random(0, 20).toString()}>
      {el}
    </div>
  );
};

export default React.memo(MathElement);
