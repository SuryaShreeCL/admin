/**
 * (c) CareerLabs. All rights reserved.
 **/
import { Box, Breadcrumbs } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../Assets/icons/back.svg';

const Navigation = props => {
  const generateData = () => {
    const { concept, subject, task, customData } = props.topics.data;

    if (customData) {
      return customData;
    }

    return [
      {
        name: 'Dashboard',
        path: '#',
      },
      {
        name: subject,
        path: '#',
      },
      {
        name: concept,
        path: '#',
      },
      {
        name: task,
        path: '#',
      },
    ];
  };

  if (props.topics && props.topics.length !== 0) {
    var data = generateData();

    return (
      <Box display={'flex'} alignItems={'center'} gridGap={15}>
        {!props.back && (
          <Box>
            <img src={Back} alt={''} style={{ cursor: 'pointer' }} />
          </Box>
        )}
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
          >
            {data.map(item => (
              <NavLink
                className={`on-boost-mode ${item.path === '#' &&
                  'disable-click'}`}
                color={'inherit'}
                style={{ textDecoration: 'none' }}
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}
          </Breadcrumbs>
        </Box>
      </Box>
    );
  }
  return <></>;
};

const NavLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #052a4e;
`;

export default withRouter(Navigation);
