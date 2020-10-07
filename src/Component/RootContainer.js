import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme,ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import { Link} from 'react-router-dom';
import Content from './Content';
import history from './History'
import {rootPath} from './RoutePaths'
const drawerWidth = 240;
const NavbarList = [
      { id: 'courses', icon: <PeopleIcon />, title: 'Courses' },
      { id: 'students', icon: <PeopleIcon />, title: 'Students' },
      { id: 'departments', icon: <DnsRoundedIcon />, title: 'Departments' },
      // {id: 'login', icon:<PeopleIcon />, title:'Marketing App'},
      {id: 'questionbank', icon:<PeopleIcon />, title:'Question Bank'},
      // {id: 'Rengine', icon:<PeopleIcon />, title:'RengineLite'},
      // {id:'/',icon:<DnsRoundedIcon/>,title:'Logout'}
    ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:'column',
    minHeight:'100vh',
    
  },
  homelogo: {
    height: '3.1rem',    
},
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  arrowButton:{
      color:'unset',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: '#18202c',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#232f3e',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: 55,
    background: '#eaeff1',
    flex: 1,
    padding: theme.spacing(6, 4),    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
  ListItemIcon:{
      minWidth:42,
      color:'unset',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
  spacer:{
      flex:1,
  },

}));

const theme=createMuiTheme({
    palette: {
        primary: {
          light: '#63ccff',
          main: '#009be5',
          dark: '#006db3',
        },
      },
    overrides:{
        MuiDrawer: {
            paper: {
              backgroundColor: '#18202c',
            },
          },
          MuiToolbar:{
              regular:{
                minHeight: 48,
              }
          },
          MuiButton: {
            label: {
              textTransform: 'none',
            },
            contained: {
              boxShadow: 'none',
              '&:active': {
                boxShadow: 'none',
              },
            },
          },                    
          MuiDivider: {
            root: {
              backgroundColor: '#404854',
            },
          },          
          MuiListItemIcon: {
            root: {
              color: 'inherit',
              marginRight: 0,
              '& svg': {
                fontSize: 20,
              },
            },
          },
          MuiAvatar: {
            root: {
              width: 32,
              height: 32,
            },
          },
          MuiTypography:{
              body1:{
                  fontSize:'unset',
              }
          }
    }
})

export default function RootContainer() {
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>          
          <img className={classes.homelogo}                            
               src="https://mernlmsassets.s3.ap-south-1.amazonaws.com/img/Careerlabs.png"
               alt="CareerLabs" />
            <div className={classes.spacer}></div>
               <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>   
                <IconButton color="inherit" className={classes.iconButtonAvatar}>                        
                    <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>       

        </Toolbar>
      </AppBar>      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>        
        <ListItem button>
          <ListItemIcon className={classes.ListItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            Overview
          </ListItemText>
        </ListItem>                   
          <IconButton onClick={handleDrawerClose} className={classes.arrowButton}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {NavbarList.map((Item) => (
            <ListItem button key={Item.id}  onClick={() => { history.push( rootPath.concat('/',Item.id)) }} >
              <ListItemIcon className={classes.ListItemIcon} >{Item.icon}</ListItemIcon>
              <ListItemText primary={Item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />       
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Content />           
      </main>
      <footer className={classes.footer}>
            <Copyright />
      </footer>
    </div>
    </ThemeProvider>
  );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }