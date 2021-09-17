import React from 'react';
import { TabContainer, TabThreeDot } from '../../../Assets/StyledComponents';
import { IconButton, Menu } from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';
import { StyledTaps } from '../../../Utils/Tabs';
import { AnswerDiv } from '../../../Assets/StyledTest';

function TabComp(props) {
  let { checked, activeTab, handleTabChange, bucketArray } = props;
  if (checked)
    return (
      <AnswerDiv>
        <TabContainer>
          <TabThreeDot>
            <IconButton
              style={{
                padding: '3px',
              }}
              // onClick={handleThreeDotClick}
            >
              <MoreVertRounded style={{ fill: '#1093ff' }} />
            </IconButton>
            <Menu
            // questionId={tabValue}
            // handleClose={handleClose}
            // open={Boolean(anchorEl)}
            // anchorEl={anchorEl}
            // handleDelete={() => handleDelete()}
            />
          </TabThreeDot>
          <StyledTaps
            tabsData={{
              // tabValue - 1
              tabId: activeTab,
              // this.setState({ tabValue: newValue + 1 }),
              handleTabChange: (e, newValue) => handleTabChange(newValue),
              tabsBackColor: '#1093FF',
              tabData: bucketArray,
              activeClass: 'active__task__tab',
              styleName: 'answer_page_tab_styles',
            }}
          />
        </TabContainer>
      </AnswerDiv>
    );
  else return null;
}

export default TabComp;
