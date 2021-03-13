import React from 'react';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';
import NotchedOutline from '@material-ui/core/OutlinedInput/NotchedOutline';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    position: 'relative',
    margin: '10px',
  },
  content: {
    padding: '1.2rem .5rem',
    borderRadius: '5px',
    display: 'flex',
    flexWrap: 'wrap',
    flex: '1 1 50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputLabel: {
    position: 'absolute',
    left: '10px',
    color: 'grey',
    top: 0,
    fontSize:'1.2rem',
    transform: 'translate(0, 24px) scale(1)',
  },
};

const LabelledOutline = ({ classes, id, label, children }) => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);
  React.useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, [label]);

  return (
    <div style={{ position: 'relative', borderRadius: '10px' }}>
      <InputLabel
        ref={labelRef}
        htmlFor={id}
        variant='outlined'
        className={classes.inputLabel}
        shrink
      >
        {label}
      </InputLabel>
      <div className={classes.root}>
        <div id={id} className={classes.content}>
          {children}
          <NotchedOutline notched labelWidth={labelWidth} />
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(LabelledOutline);
