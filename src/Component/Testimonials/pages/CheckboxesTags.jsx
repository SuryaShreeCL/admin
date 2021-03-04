import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function CheckboxesTags() {
  const [Options, setOptions] = useState([]);
  return (
    <Autocomplete
      multiple
      id='checkboxes-tags-demo'
      onChange={(e, newValue) => setOptions(newValue)}
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label='Checkboxes' placeholder='Favorites' />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const careerlabsProducts = ['ACS', 'GMAT', 'GRE'];
