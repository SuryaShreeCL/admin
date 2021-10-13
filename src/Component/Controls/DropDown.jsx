import ExpandMore from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'

function DropDown(props) {
    return (
    <Autocomplete
    popupIcon={<ExpandMore color={"inherit"} />}
    {...props}
    />
    )
}

export default DropDown
