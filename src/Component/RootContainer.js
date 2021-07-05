import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import { Link } from 'react-router-dom';
import Content from './Content';
import history from './History';
import { rootPath, rootLoginPath, coursePath, studentPath, departmentPath, collegePath, universityPath, cityPath, aspirationPath, questionSetPath, videoPath, productPath, webinarPath, careerTrackPath, notificationPath, clientDetailsPath, testimonialsPath, reportsPath, productBasedPath, starterPackPath,productPunchingPath } from './RoutePaths';
import GoogleBtn from './GoogleBtn';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import SportsHandballRoundedIcon from '@material-ui/icons/SportsHandballRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import CallIcon from '@material-ui/icons/Call';
import Routes from './Routes';


const drawerWidth = 240;
const NavbarList = [
      {id: coursePath, icon: <MenuBookRoundedIcon />, title: 'Courses' },
      {id: studentPath, icon: <PeopleIcon />, title: 'Students' },
      {id: departmentPath, icon: <DnsRoundedIcon />, title: 'Departments' },    
      {id: collegePath, icon:<AccountBalanceRoundedIcon />, title:'Colleges'},
      {id: universityPath, icon:<SchoolRoundedIcon />, title:'University'},
      {id: cityPath, icon:<LocationCityRoundedIcon />, title:'City'},
      {id: aspirationPath, icon:<SportsHandballRoundedIcon />, title:'Aspiration'},
      {id: questionSetPath, icon:<HelpRoundedIcon />, title:'Question Set'},
      {id: videoPath, icon:<VideocamRoundedIcon />, title:'Video'},
      {id: productPath, icon:<AddShoppingCartRoundedIcon />, title:'Product'},
      {id: webinarPath, icon:<SupervisorAccountIcon />, title:'Webinar'},
      {id: careerTrackPath, icon:<TrendingUpRoundedIcon />, title:'Career Track'},
      {id: notificationPath, icon:<NotificationsIcon /> , title:'Notification'},
       { id: testimonialsPath, icon: <RateReviewRoundedIcon />, title: 'Testimonials' },
      {id: reportsPath, icon:<AssessmentRoundedIcon />, title:'Reports'},
      {id:'schedule',icon:<CallIcon/>,title:'Call Schedule'},
      {id: productPunchingPath, icon:<SupervisorAccountIcon />, title:'Product Punching'},
      {id: clientDetailsPath , icon:<SupervisorAccountIcon />, title:'Client Details'},
      // {id: starterPackPath, icon:<AssessmentRoundedIcon />, title:'Starter Pack'},
      // {id: productBasedPath, icon:<AssessmentRoundedIcon />, title:'Based'},
      
    ];


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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
  arrowButton: {
    color: 'unset',
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
  ListItemIcon: {
    minWidth: 42,
    color: 'unset',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
  spacer: {
    flex: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  overrides: {
    MuiFormControl : {
      marginNormal : {
        marginTop : 0,
        marginBottom : 0,
      },
    },
    MuiListItem : {
      root : {
        "&$selected" : {
          backgroundColor : '#009be5'
        },
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: 48,
      },
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
    MuiTypography: {
      body1: {
        fontSize: 'unset',
      },
    },
    MuiSvgIcon: {
      root: {
        // color: 'white',
      },
    },
  },
});

export default function RootContainer(props) {
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedMenu, setSelectedMenu] = React.useState(null)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    window.sessionStorage.setItem('token', 'false');
    window.sessionStorage.clear();
    props.history.push(rootLoginPath);
  };

  console.log("........",history)

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <img
              className={classes.homelogo}
              src='https://mernlmsassets.s3.ap-south-1.amazonaws.com/img/Careerlabs.png'
              alt='CareerLabs'
            />
            <div className={classes.spacer}></div>
            <IconButton color='inherit'>
              <NotificationsIcon />
            </IconButton>
            {/* <GoogleBtn {...props} />       */}
            <IconButton color='inherit' onClick={logout}>
              <ExitToAppRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
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
              <ListItemText>Overview</ListItemText>
            </ListItem>
            <IconButton onClick={handleDrawerClose} className={classes.arrowButton}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {NavbarList.map((Item,index) => (
              <ListItem
              selected={selectedMenu === index}
                button
                key={Item.id}
                onClick={() => {
                  setSelectedMenu(index)
                  props.history.push(Item.id);
                }}
              >
                <ListItemIcon  className={classes.ListItemIcon}>{Item.icon}</ListItemIcon>
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
          <Routes {...props} />
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
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      {new Date().getFullYear() + ' '}
      CareerLabs
      {'.'}
    </Typography>
  );
}
