import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';
const drawerWidth = 240 ;
const styles = (theme) => ({
    secondaryBar: {
        zIndex: 0
    },
    homelogo: {
        height: '3.1rem',
        margin: '-7px 8%'
    },
    menuButton: {
        marginLeft: -theme.spacing(1)
    },
    iconButtonAvatar: {
        padding: 4
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    

    button: {
        borderColor: lightColor
    }
});



function Header(props) {
    const { classes, onDrawerToggle } = props;


    return (
        <React.Fragment>
            <AppBar className="appBarShift" color="primary" position="sticky"
                elevation={0}>
                <Toolbar>
                    <Grid container
                        spacing={1}
                        alignItems="center">
                        {/* <Hidden smUp> */}
                        <Grid item>
                            <IconButton color="inherit" aria-label="open drawer"
                                onClick={onDrawerToggle}
                                className={
                                    classes.menuButton
                                }>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        {/* </Hidden> */}
                        <Grid item xs>
                            <img class={
                                classes.homelogo
                            }
                                src="https://mernlmsassets.s3.ap-south-1.amazonaws.com/img/Careerlabs.png"
                                alt="CareerLabs" />
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit"
                                className={
                                    classes.iconButtonAvatar
                                }>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>


        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);

