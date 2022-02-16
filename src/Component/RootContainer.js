import { Badge, Breadcrumbs, Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import CallIcon from "@material-ui/icons/Call";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import HomeIcon from "@material-ui/icons/Home";
import Track from "@material-ui/icons/ArtTrack";
import NewspaperIcon from "@material-ui/icons/Wallpaper";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import LocationCityRoundedIcon from "@material-ui/icons/LocationCityRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import MenuIcon from '@material-ui/icons/Menu';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewRoundedIcon from "@material-ui/icons/RateReviewRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import SportsHandballRoundedIcon from "@material-ui/icons/SportsHandballRounded";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import { connect } from "react-redux";
import { checkTokenStatus } from "../Actions/AdminAction";
import BackButton from "../Asset/Images/backbutton.svg";
import MenuIcon from "../Asset/Images/menu.svg";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import {
  aspirationPath,
  callSchedulePath,
  careerTrackPath,
  premiumUsersPath,
  cityPath,
  collegePath,
  coursePath,
  degreePath,
  departmentPath,
  intakePath,
  lmsTest,
  lms_course_landing,
  lms_course_taken,
  lms_study_plans,
  notificationPath,
  obOperationPath,
  productPath,
  productPunchingPath,
  questionSetPath,
  reportsPath,
  rootLoginPath,
  studentPath,
  testimonialsPath,
  universityPath,
  videoPath,
  testPath,
  wallPath,
  webinarPath,
  appVersion,
} from "./RoutePaths";
import Routes from "./Routes";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TreeItem from "@material-ui/lab/TreeItem";
import { menu } from "../Constant/Variables";
import { getAdminLinkedProduct } from "../Actions/AdminAction";
import { getProductByFamilyId } from "../Actions/ProductAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LandingAdmin from "./LandingAdmin";

const drawerWidth = 240;
const NavbarList = [
  { id: coursePath, icon: <MenuBookRoundedIcon />, title: "Courses" },
  { id: studentPath, icon: <PeopleIcon />, title: "Students" },
  { id: departmentPath, icon: <DnsRoundedIcon />, title: "Departments" },
  { id: collegePath, icon: <AccountBalanceRoundedIcon />, title: "Colleges" },
  { id: universityPath, icon: <SchoolRoundedIcon />, title: "University" },
  { id: cityPath, icon: <LocationCityRoundedIcon />, title: "City" },
  {
    id: aspirationPath,
    icon: <SportsHandballRoundedIcon />,
    title: "Aspiration",
  },
  { id: questionSetPath, icon: <HelpRoundedIcon />, title: "Question Set" },
  { id: videoPath, icon: <VideocamRoundedIcon />, title: "Video" },
  { id: productPath, icon: <AddShoppingCartRoundedIcon />, title: "Product" },
  { id: webinarPath, icon: <SupervisorAccountIcon />, title: "Webinar" },
  { id: wallPath, icon: <InstagramIcon />, title: "Wall" },
  {
    id: careerTrackPath,
    icon: <TrendingUpRoundedIcon />,
    title: "Career Track",
  },
  {
    id: premiumUsersPath,
    icon: <TrendingUpRoundedIcon />,
    title: "Premium Users",
  },
  { id: notificationPath, icon: <NotificationsIcon />, title: "Notification" },
  {
    id: testimonialsPath,
    icon: <RateReviewRoundedIcon />,
    title: "Testimonials",
  },
  { id: reportsPath, icon: <AssessmentRoundedIcon />, title: "Reports" },
  { id: "schedule", icon: <CallIcon />, title: "Call Schedule" },
  {
    id: productPunchingPath,
    icon: <SupervisorAccountIcon />,
    title: "Product Punching",
  },
  {
    id: obOperationPath,
    icon: <SupervisorAccountIcon />,
    title: "OB Operation",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  homelogo: {
    height: "3.1rem",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  arrowButton: {
    color: "unset",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "#18202c",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#232f3e",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: 55,
    background: "#fff",
    flex: 1,
    padding: theme.spacing(4, 4),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
  ListItemIcon: {
    minWidth: 42,
    color: "unset",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
  spacer: {
    flex: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  overrides: {
    MuiBadge: {
      colorPrimary: {
        backgroundColor: "#FDBF44",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#009be5",
        },
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: 48,
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
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
        fontSize: "unset",
      },
    },
    MuiSvgIcon: {
      root: {
        // color: 'white',
      },
    },
  },
});

function RootContainer(props) {
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const [state, setState] = React.useState({ open: {} });
  const [sideNav, setSideNav] = React.useState([]);
  const [selectedValue, setSeletectedValue] = useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    window.sessionStorage.setItem("token", "false");
    window.sessionStorage.clear();
    window.location.pathname = "/admin/login";
    // props.history.push(rootLoginPath);
  };

  const mounted = useRef();

  var flag = false;

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      props.getAdminLinkedProduct();
      mounted.current = true;
      let accessToken = window.sessionStorage.getItem("accessToken");
      if (accessToken === null) {
        //
        window.sessionStorage.clear();
        props.history.push(rootLoginPath);
      } else {
        props.checkTokenStatus();
      }
    } else {
      // do componentDidUpdate logic

      if (props.tokenStatus !== null && props.tokenStatus.expired) {
        //
        window.sessionStorage.clear();
        props.history.push(rootLoginPath);
      }
    }
  });

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevProps = usePrevious(props);
  useEffect(() => {
    //

    if (
      props.adminLinkedProductDetails.length !== 0 &&
      props.getProductByFamilyIdList.length === 0 &&
      props.adminLinkedProductDetails.department !== "sales" &&
      props.adminLinkedProductDetails.department !== "elev8_super_admin" &&
      props.adminLinkedProductDetails.department !== "elev8" &&
      props.adminLinkedProductDetails.department !== "SUPERADMIN"
    ) {
      if (props.adminLinkedProductDetails) {
        if (props.adminLinkedProductDetails.products.length !== 0) {
          props.getProductByFamilyId(
            props.adminLinkedProductDetails.products[0].productFamily.id
          );
        }
      }
    }
    //
    // let newListArr = []
    // props.getProductByFamilyIdList.map((eachItem,index)=>{
    //  newListArr.push({
    //   id: eachItem.id,
    //   key: eachItem.id,
    //   label : eachItem.shortName,
    //   icon: StarBorder
    //  })
    // })
    // setSideNav([{
    //   id: "1",
    //   key: "operations",
    //   icon: InboxIcon,
    //   label : "Operations",
    //   items: newListArr,
    // }])

    if (props.adminLinkedProductDetails.department === "Acsoperations") {
      let myArr = [];
      props.getProductByFamilyIdList
        // .filter(
        //   eachProd =>
        //     eachProd.variantSKU === "ACS_MS" ||
        //     eachProd.variantSKU === "ACS_MBA" ||
        //     eachProd.variantSKU === "ACS_MIM" ||
        //     eachProd.variantSKU === "ACS_MBA_PB" ||
        //     eachProd.variantSKU === "ACS_MIM_PB"
        // )
        .map((eachItem, index) => {
          myArr.push({
            title: eachItem.shortName,
            path: obOperationPath + "/" + eachItem.id,
          });
        });
      setSideNav([
        {
          icon: <HomeOutlinedIcon />,
          title: "Operations",
          items: myArr,
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Aspiration",
          path: aspirationPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Templates",
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Master Grad list",
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Call Scheduler",
          path: callSchedulePath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Reports",
          path: reportsPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Notification",
          path: notificationPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Career Track",
          path: careerTrackPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Resources",
          items: [
            {
              title: "Webinar",
              path: webinarPath,
            },
            {
              title: "Testmonial",
              path: testimonialsPath,
            },
            {
              title: "Role Videos",
              path: videoPath,
            },
          ],
        },
      ]);
    } else if (props.adminLinkedProductDetails.department === "Pboperations") {
      let myArr = [];
      props.getProductByFamilyIdList
        // .filter(
        //   (prodItems) =>
        //     prodItems.variantSKU === "PBP" ||
        //     prodItems.variantSKU === "PBM" ||
        //     prodItems.variantSKU === "PBP_2023"
        // )
        .map((eachItem, index) => {
          myArr.push({
            title: eachItem.shortName,
            path: obOperationPath + "/" + eachItem.id,
          });
        });
      setSideNav([
        {
          icon: <HomeOutlinedIcon />,
          title: "Aspiration",
          path: aspirationPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Career Track",
          path: careerTrackPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Reports",
          path: reportsPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Notification",
          path: notificationPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Operations",
          items: myArr,
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Resources",
          items: [
            {
              title: "Webinar",
              path: webinarPath,
            },
            {
              title: "Testmonial",
              path: testimonialsPath,
            },
            {
              title: "Role Videos",
              path: videoPath,
            },
          ],
        },
      ]);
    } else if (props.adminLinkedProductDetails.department === "sales") {
      setSideNav([
        {
          icon: <HomeOutlinedIcon />,
          title: "City",
          path: cityPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Product Punching",
          path: productPunchingPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Products",
          path: productPath,
          items: [],
        },
        {
          icon: <HomeOutlinedIcon />,
          title: "Student",
          path: studentPath,
          items: [],
        },
      ]);
    } else if (props.adminLinkedProductDetails.department === "elev8") {
      setSideNav([
        {
          icon: <NewspaperIcon />,
          title: "Wall",
          path: wallPath,
          items: [],
        },
        {
          icon: <AssignmentIcon />,
          title: "Tests",
          path: testPath,
          items: [],
        },
        {
          icon: <Track />,
          title: "Career Track",
          path: careerTrackPath,
          items: [],
        },
        {
          icon: <Track />,
          title: "Premium Users Data",
          path: premiumUsersPath,
          items: [],
        },
      ]);
    } else if (
      props.adminLinkedProductDetails.department === "elev8_super_admin"
    ) {
      setSideNav([
        {
          icon: <NewspaperIcon />,
          title: "Wall",
          path: wallPath,
          items: [],
        },
        {
          icon: <AssignmentIcon />,
          title: "Tests",
          path: testPath,
          items: [],
        },
        {
          icon: <Track />,
          title: "Career Track",
          path: careerTrackPath,
          items: [],
        },
        {
          icon: <TrendingUpRoundedIcon />,
          title: "App Version Change",
          path: appVersion,
          items: [],
        },
      ]);
    } else if (
      props.adminLinkedProductDetails.department === "testprepoperations"
    ) {
      let myArr = [];
      props.getProductByFamilyIdList
        // .filter(
        //   (prodItems) =>
        //     prodItems.variantSKU === "PBP" ||
        //     prodItems.variantSKU === "PBM" ||
        //     prodItems.variantSKU === "PBP_2023"
        // )
        .map((eachItem, index) => {
          myArr.push({
            title: eachItem.shortName,
            path: obOperationPath + "/" + eachItem.id,
          });
        });
      setSideNav([
        {
          icon: <HomeOutlinedIcon />,
          title: "Operations",
          items: myArr,
        },
      ]);
    } else if (props.adminLinkedProductDetails.department === "SUPERADMIN") {
      setSideNav([
        {
          icon: <HomeOutlinedIcon />,
          title: "Testmonial",
          path: testimonialsPath,
          items: [],
        },
      ]);
    } else if (
      window.sessionStorage.getItem("role") === "LMSCHECKER" ||
      window.sessionStorage.getItem("role") === "LMSEDITOR"
    ) {
      setSideNav([
        {
          icon: <></>,
          title: "Student",
          path: studentPath,
          items: [],
        },
        {
          icon: <></>,
          title: "Course Material",
          path: lms_course_landing,
          items: [],
        },
        {
          icon: <></>,
          title: "Study plan",
          path: lms_study_plans,
          items: [],
        },
        {
          icon: <></>,
          title: "Test",
          path: lmsTest,
          items: [],
        },
        {
          icon: <></>,
          title: "Webinars",
          path: wallPath,
          items: [],
        },
      ]);
    } else if (window.sessionStorage.getItem("role") === "SUPER ADMIN") {
      setSideNav([
        {
          icon: <></>,
          title: "Student",
          path: studentPath,
          items: [],
        },
        {
          icon: <></>,
          title: "Course",
          path: coursePath,
          items: [],
        },
        {
          icon: <></>,
          title: "College",
          path: collegePath,
          items: [],
        },
        {
          icon: <></>,
          title: "Degree",
          path: degreePath,
          items: [],
        },
        {
          icon: <></>,
          title: "Department",
          path: departmentPath,
          items: [],
        },
        {
          icon: <></>,
          title: "InTake",
          path: intakePath,
          items: [],
        },
      ]);
    }
  }, [props.adminLinkedProductDetails, props.getProductByFamilyIdList]);

  //
  //

  const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
  };

  const SingleLevel = ({ item }) => {
    return (
      <ListItem
        button
        style={{
          backgroundColor:
            selectedValue && selectedValue.title === item.title
              ? "#5584AC"
              : "",
        }}
        onClick={(e) => {
          setSeletectedValue(item);
          props.history.push(item.path);
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    );
  };

  const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [menuOpen, setMenuOpen] = useState(true);
    const handleClick = () => {
      setSeletectedValue(null);
      setMenuOpen((prev) => !prev);
    };

    return (
      <React.Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            {menuOpen ? (
              <ExpandLessIcon style={{ marginLeft: "20px" }} />
            ) : (
              <ExpandMoreIcon style={{ marginLeft: "20px" }} />
            )}
          </ListItemIcon>
          <ListItemText style={{ fontSize: "16px" }} primary={item.title} />
        </ListItem>
        <Box>
          <Collapse
            style={{ minHeight: "70px" }}
            in={menuOpen}
            timeout="auto"
            unmountOnExit
          >
            <List style={{ marginLeft: "25px" }} component="div" disablePadding>
              {children.map((child, key) => (
                <MenuItem key={key} item={child} />
              ))}
            </List>
          </Collapse>
        </Box>
      </React.Fragment>
    );
  };

  const hasChildren = (item) => {
    const { items: children } = item;

    if (children === undefined) {
      return false;
    }

    if (children.constructor !== Array) {
      return false;
    }

    if (children.length === 0) {
      return false;
    }

    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
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
              {/* <MenuIcon /> */}
              <img src={MenuIcon}></img>
            </IconButton>
            {/* <img
              className={classes.homelogo}
              src='https://mernlmsassets.s3.ap-south-1.amazonaws.com/img/Careerlabs.png'
              alt='CareerLabs'
            /> */}
            <div className={classes.spacer}></div>
            <IconButton color="primary" style={{ marginRight: "10px" }}>
              <Badge color="primary">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <Divider
              style={{ height: "30px", backgroundColor: "#cacaca" }}
              orientation="vertical"
            />
            {/* <GoogleBtn {...props} />       */}
            <IconButton color="primary" style={{ marginRight: "10px" }}>
              <Badge color="primary">
                <InsertInvitationOutlinedIcon />
              </Badge>
            </IconButton>
            <Divider
              style={{ height: "30px", backgroundColor: "#cacaca" }}
              orientation="vertical"
            />
            <IconButton color="primary" onClick={logout}>
              <ExitToAppRoundedIcon />
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
                {/* <HomeIcon /> */}
              </ListItemIcon>
              <ListItemText>CareerLabs</ListItemText>
            </ListItem>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.arrowButton}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          {/* <List>
            {NavbarList.map((Item, index) => (
              <ListItem
                selected={selectedMenu === index}
                button
                key={Item.id}
                onClick={() => {
                  setSelectedMenu(index);
                  props.history.push(Item.id);
                }}
              >
                <ListItemIcon className={classes.ListItemIcon}>
                  {Item.icon}
                </ListItemIcon>
                <ListItemText primary={Item.title} />
              </ListItem>
            ))}
          </List> */}
          {sideNav.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}

          {/* <Divider /> */}
        </Drawer>
        <main
          id="main-container"
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={BackButton}
              style={{ marginRight: "20px", cursor: "pointer" }}
            ></img>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" color="primary" />}
              aria-label="breadcrumb"
            >
              <Typography style={{ cursor: "pointer" }}>Home</Typography>
              <Typography style={{ cursor: "pointer" }}>Product</Typography>
            </Breadcrumbs>
          </div> */}

          <Routes {...props} />
          {/* <LandingAdmin {...props} /> */}
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
      {"Copyright © "}
      {new Date().getFullYear() + " "}
      CareerLabs
      {"."}
    </Typography>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenStatus: state.AdminReducer.tokenStatus,
    adminLinkedProductDetails: state.AdminReducer.adminLinkedProductDetails,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    adminLoginDetails: state.ProductReducer.adminLoginDetails,
  };
};

export default connect(mapStateToProps, {
  checkTokenStatus,
  getAdminLinkedProduct,
  getProductByFamilyId,
})(RootContainer);
