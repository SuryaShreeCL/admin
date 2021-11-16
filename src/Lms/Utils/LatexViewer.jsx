import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

const MathElement = ({ math }) => {
  const ref = useRef(null);
  const element = math || '';
  const el = parse(element);

  const renderMath = () => {
    // MathJax.Hub.Queue(["PreProcess", MathJax.Hub], ["Reprocess", MathJax.Hub]);
    if (window.MathJax)
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, element]);
    // MathJax.Callback.Queue(() => {
    //   MathJax.Hub.Typeset(element);
    // });
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
