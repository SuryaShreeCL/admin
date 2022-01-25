import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
// import { ReactComponent as Upload } from '../assets/icons/uploadIcon.svg';
// import CustomButton from './CustomButton';
// import { DropHelperText, FlexView, useStyles } from './Styles';

const borderImage = color => {
  return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23${color}FF' stroke-width='4' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`;
};

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 12px 36px',
  transition: 'border .3s ease-in-out',
  background: '#ffffff',
  backgroundImage: borderImage('343B89'),
  borderRadius: '10px',
  gap: '10px',
  cursor: 'move',
  overflow: 'hidden',
  outline: 'none',
};

const activeStyle = {
  backgroundImage: borderImage('2196F3'),
};

const acceptStyle = {
  backgroundImage: borderImage('00E676'),
};

const rejectStyle = {
  backgroundImage: borderImage('FF1744'),
};

function DropzoneComponent({
  isImage,
  nameLetter,
  profileHoverContent,
  url,
  acceptTypes,
  onDrop,
}) {
  const classes = useStyles({
    hoverContent: profileHoverContent,
    url: url,
    isImage: isImage,
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: acceptTypes,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {/* <aside>
          <div className={classes.photoFrameBackdrop}>
            {isImage ? '' : nameLetter}
          </div>
        </aside>

        <FlexView gap={'12px'} paddingTop={'12px'}>
          <Upload width={'36px'} height={'36px'} />
          <DropHelperText>{'Drag and drop file or'}</DropHelperText>
        </FlexView>

        <CustomButton variant={'outlined'} className={classes.browse}>
          {'Browse'}
        </CustomButton> */}
      </div>
    </section>
  );
}

export default DropzoneComponent;
