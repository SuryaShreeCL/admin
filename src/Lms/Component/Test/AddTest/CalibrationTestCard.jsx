import React, { Component, Fragment } from 'react';
import { StyledTaps } from '../../../Utils/Tabs';
import {
  Divider,
  TabContainer,
  TabThreeDot,
} from '../../../Assets/StyledComponents';
import { InputTextField } from '../../../Utils/TextField';
import { AutocompleteText } from '../../../Utils/Autocomplete';
import { AddButton } from '../../../Utils/Buttons';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { MoreVertRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Menu from '../../CourseMaterials/Menu';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  InputAdornment,
} from '@material-ui/core';
class CalibrationTestCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      tabValue,
      tabLabels,
      sectionChange,
      testData,
      tabChange,
      testPropertiesChange,
      sectionInstructionChange,
      handleClose,
      anchorEl,
      handleMenuItemDelete,
      handleThreeDotClick,
    } = this.props.data;
    return (
      <>
        <Divider />
        <Grid container spacing={3} justifyContent={'flex-end'}>
          <AddButton
            style={{
              background: 'none',
              fontWeight: 600,
              fontSize: '18px',
              color: '#1093FF',
              marginRight: 5,
            }}
            startIcon={
              <AddRoundedIcon
                style={{ marginLeft: 4, marginRight: -8, fontSize: '24px' }}
              />
            }
            onClick={sectionChange}
          >
            Add New Section
          </AddButton>
        </Grid>
        <TabContainer style={{ margin: '24px 0px 30px 0px' }}>
          {tabValue > 0 && testData.length !== 0 && (
            <TabThreeDot>
              <IconButton
                style={{ padding: '3px' }}
                onClick={handleThreeDotClick}
              >
                <MoreVertRounded style={{ fill: '#1093ff' }} />
              </IconButton>
              <Menu
                questionId={tabValue}
                handleClose={handleClose}
                open={anchorEl}
                anchorEl={anchorEl}
                handleDelete={handleMenuItemDelete}
              />
            </TabThreeDot>
          )}
          <StyledTaps
            tabsData={{
              tabId: tabValue - 1,
              handleTabChange: tabChange,
              tabsBackColor: '#1093FF',
              tabData: tabLabels,
              activeClass: 'active__task__tab',
              styleName: 'test',
            }}
          />
        </TabContainer>
        {testData.map((item, index) => {
          console.log();
          return (
            <Fragment key={index}>
              <div hidden={tabValue !== index + 1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={item.duration > 0 ? 4 : 6}>
                    <InputTextField
                      name='name'
                      onChange={e => testPropertiesChange(index, e)}
                      value={item.name}
                      label='Section Name'
                      placeholder='Section Name'
                      height='11px'
                    />
                  </Grid>

                  <Grid item xs={12} md={item.duration > 0 ? 4 : 6}>
                    <InputTextField
                      name='noOfQuestions'
                      onChange={e => testPropertiesChange(index, e)}
                      value={item.noOfQuestions}
                      label='Number of question'
                      placeholder='Number of question'
                      height='11px'
                      type={'number'}
                    />
                  </Grid>
                  {item.duration > 0 ? (
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel
                          shrink={true}
                          style={{
                            top: '-8px',
                            left: '15px',
                            background: '#FFFFFF',
                            padding: '0 10px 0 8px',
                            zIndex: 1,
                          }}
                        >
                          Expected time for completion
                        </InputLabel>
                        <OutlinedInput
                          disabled
                          inputProps={{
                            style: {
                              height: '11px',
                            },
                          }}
                          type={'number'}
                          value={item.duration}
                          name='duration'
                          placeholder='Expected time for completion'
                          onChange={e => testPropertiesChange(index, e)}
                          endAdornment={
                            <InputAdornment position='end'>mins</InputAdornment>
                          }
                          labelWidth={230}
                        />
                      </FormControl>
                    </Grid>
                  ) : null}
                </Grid>
                <Grid container style={{ paddingTop: '30px' }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name='descriptionTitle'
                      onChange={e => testPropertiesChange(index, e)}
                      value={item.descriptionTitle}
                      label='Section Instruction heading'
                      placeholder='Section Instruction heading'
                      height='11px'
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <InputTextField
                      name='nameDescription'
                      onChange={e => testPropertiesChange(index, e)}
                      value={item.nameDescription}
                      label='Section Description'
                      placeholder='Section Description'
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AutocompleteText
                      autoData={{
                        key: index,
                        label: 'Section Instruction Details',
                        placeholder: 'List The Instruction',
                        title: 'Type the content and press enter',
                        value:
                          item.description !== null ? item.description : [],
                        onChange: sectionInstructionChange,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Fragment>
          );
        })}
      </>
    );
  }
}

export default CalibrationTestCard;
