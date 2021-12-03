// import {
//   Button,
//   Grid,
//   makeStyles,
//   Menu,
//   MenuItem,
//   Popover,
//   Typography,
//   TextField,
// } from "@material-ui/core";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setFilterAnchorEl,
//   setPoperAnchorEl,
//   getAcademicType,
// } from "../../Actions/HelperAction";
// import Accordian from "./Accordian";
// import { StyledTab, StyledTabs } from "./PopUpTabs";
// import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
// import SubjectInfoTable from "./SubjectInfoTable";
// import { isEmptyString } from "../Validation";
// import Dropdown from "react-multilevel-dropdown";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
// import "../ProfileGapAnalysis/DiplomaForm/DiplomaForm.css";

// function SimilarityPopup(props) {
//   // Setting up dispatch for making an API calls
//   const dispatch = useDispatch();
//   // Setting up styles for this component
//   const useStyles = makeStyles((theme) => ({
//     headingTypo: {
//       padding: "16px 0px 10px 16px",
//       fontWeight: 500,
//     },
//     popoverStyle: {
//       height: "70vh",
//       overflowY: "scroll",
//       borderRadius: "10px",
//       width: "700px",
//     },
//     filterContainer: {
//       display: "flex",
//       alignItems: "center",
//       marginRight: "2%",
//     },
//     searchContainer: {
//       alignSelf: "flex-end",
//       marginBottom: "15px",
//     },
//     containerStyle: {
//       margin: "0px 20px 0px 20px",
//     },
//     menusDiv : {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }
//   }));
//   // Declaring variables for this component
//   const popperAnchorEl = useSelector(
//     (state) => state.HelperReducer.popperState.popperAnchorEl
//   );
//   const filterAnchorEl = useSelector(
//     (state) => state.HelperReducer.popperState.filterAnchorEl
//   );

//   const { department, degree, getStudentMatch } = props;

//   const [searchTerm, setSearchTerm] = React.useState("");

//   console.log(getStudentMatch, "/////////////////////////");

//   // get academicType
//   const { academicType } = useSelector((state) => ({
//     academicType: state.HelperReducer.academicType,
//   }));

//   const semester = [
//     {
//       name: "Semester 1",
//       id: 1,
//     },
//     {
//       name: "Semester 2",
//       id: 2,
//     },
//     {
//       name: "Semester 3",
//       id: 3,
//     },
//     {
//       name: "Semester 4",
//       id: 4,
//     },
//     {
//       name: "Semester 5",
//       id: 5,
//     },
//     {
//       name: "Semester 6",
//       id: 6,
//     },
//     {
//       name: "Semester 7",
//       id: 7,
//     },
//     {
//       name: "Semester 8",
//       id: 8,
//     },
//     {
//       name: "Semester 9",
//       id: 9,
//     },
//     {
//       name: "Semester 10",
//       id: 10,
//     },
//   ];

//   const yearData = (type) => {
//     let endYear = new Date().getFullYear();
//     let startYear = endYear - 10;

//     let yearArr = [];
//     for (let i = startYear; i <= endYear; i++) {
//       yearArr.push({
//         name: i.toString(),
//         id: i.toString(),
//       });
//     }
//     console.log(yearArr);
//     return yearArr;
//   };

//   const menus = [
//     {
//       name: "Department",
//       children: [
//         // department
//         {
//           name: "department",
//           value: "Department",
//           children: department,
//         },
//         // degree
//         {
//           name: "degree",
//           value: "Degree",
//           children: degree,
//         },
//         // semester

//         {
//           name: "semester",
//           value: "Semester",
//           children: semester,
//         },
//         // year
//         {
//           name: "year",
//           value: "Year",
//           children: yearData(),
//         },
//       ],
//     },
//   ];

//   const popperOpen = Boolean(popperAnchorEl);
//   const filterOpen = Boolean(filterAnchorEl);

//   const id = popperOpen ? "simple-popper" : undefined;

//   const [value, setValue] = React.useState(0);

//   // Initiating style variable for this component
//   const classes = useStyles();
//   // This function handles the tab change
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   // This function handle the filter open
//   const handleFilterOpen = (event) => {
//     dispatch(setFilterAnchorEl(event.currentTarget));
//   };
//   // Setting you values for the year dropdown (logic : start year - Current year and end year ten years before start year )
//   const years = () => {
//     let endYear = new Date().getFullYear();
//     let startYear = endYear - 10;

//     let yearArr = [];
//     for (let i = startYear; i <= endYear; i++) {
//       yearArr.push(i);
//     }
//     console.log(yearArr);
//     return yearArr;
//   };

//   const renderFilterButton = () => {
//     if (isEmptyString(academicType)) {
//       console.log("empty");
//       return (
//         <Button
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           endIcon={<KeyboardArrowDownRoundedIcon />}
//           onClick={handleFilterOpen}
//         >
//           Year
//         </Button>
//       );
//     } else {
//       return (
//         <div
//          className={classes.menusDiv}
//         >
//           {menus.map((menu) => (
//             <Dropdown
//               title={menu.name}
//               menuClassName="text-14 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black"
//             >
//               {menu.children &&
//                 menu.children.map((item) => (
//                   <Dropdown.Item>
//                     <div
//                       onMouseOver={() => props.onMouseOver(item.name)}
//                     >
//                       {item.value}
//                     </div>
//                     <Dropdown.Submenu
//                       position="left"

//                     >
//                       <div className={classes.searchIcon_field_div}>
//                         <InputBase
//                           onChange={(event) => {
//                             setSearchTerm(event.target.value);
//                           }}
//                           placeholder="Search…"
//                           inputProps={{
//                             "aria-label": "search",
//                           }}
//                         />
//                       </div>

//                       {item.children &&
//                         item.children
//                           .filter((val) => {
//                             if (searchTerm === "") {
//                               return val;
//                             } else if (
//                               typeof val.name === "string" &&
//                               val.name
//                                 .toLowerCase()
//                                 .includes(searchTerm.toLowerCase())
//                             ) {
//                               return val;
//                             }
//                           })
//                           .map((submenu) => (
//                             <div>
//                               <Dropdown.Item
//                                 className={classes.Submenu_submenu_1Pcnm}
//                                 //  onClick= { ()=> handleMenuClick(submenu)}
//                                 onClick={() => getStudentMatch(submenu)}
//                               >
//                                 <div
//                                   onClick={() => {
//                                     console.log(submenu);
//                                     props.handleSubMenuClick(submenu.id);
//                                   }}
//                                 >
//                                   {submenu.name}
//                                 </div>
//                               </Dropdown.Item>
//                               {item.children &&
//                                 item.children.map((submenu) => (
//                                   <Dropdown.Submenu position="right">
//                                     <Dropdown.Item>
//                                       <div>{submenu.name}</div>
//                                     </Dropdown.Item>
//                                   </Dropdown.Submenu>
//                                 ))}
//                             </div>
//                           ))}
//                     </Dropdown.Submenu>
//                   </Dropdown.Item>
//                 ))}
//             </Dropdown>
//           ))}
//         </div>
//       );
//     }
//   };

//   // This function returns the tab content based on index
//   const renderTabContent = () => {
//     console.log(years(), ".................");
//     if (value === 0) {
//       return (
//         <Grid
//           item
//           md={12}
//           xs={12}
//           sm={12}
//           lg={12}
//           xl={12}
//           container
//           alignItems={"center"}
//           justifyContent={"flex-end"}
//         >
//           <div className={classes.filterContainer}>
//             <Typography color={"textSecondary"}>Filter By : </Typography>

//             {renderFilterButton()}

//             <Menu
//               id="simple-menu"
//               anchorEl={filterAnchorEl}
//               getContentAnchorEl={null}
//               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//               transformOrigin={{ vertical: "top", horizontal: "center" }}
//               keepMounted
//               open={filterOpen}
//               onClose={() => dispatch(setFilterAnchorEl(null))}
//             >
//               {years().map((item, index) => {
//                 return (
//                   <MenuItem
//                     onClick={() => {
//                       // This function will return student match data based on year
//                       props.handleYearClick(item);
//                       dispatch(setFilterAnchorEl(null));
//                     }}
//                   >
//                     {item}
//                   </MenuItem>
//                 );
//               })}
//             </Menu>
//           </div>
//         </Grid>
//       );
//     } else if (value === 1) {
//       return (
//         <Grid
//           className={classes.containerStyle}
//           container
//           spacing={2}
//           direction={"column"}
//         >
//           {/* Search field */}
//           <div className={classes.searchContainer}>
//             <TextField
//               variant={"standard"}
//               size={"small"}
//               value={props.searchValue}
//               onChange={props.searchHandler}
//               label={"Search"}
//             />
//           </div>
//           {/* Subject info table */}
//           <SubjectInfoTable studentSubjectDetails={props.distinctMatch} />
//         </Grid>
//       );
//     }
//   };
//   console.log(props.data);
//   return (
//     <Popover
//       id={id}
//       classes={{ paper: classes.popoverStyle }}
//       open={popperOpen}
//       anchorEl={popperAnchorEl}
//       onClose={() => dispatch(setPoperAnchorEl(null))}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "center",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "center",
//       }}
//     >
//       <Grid container>
//         <Grid item md={12}>
//           <Typography className={classes.headingTypo}>
//             Profile Similarity Checker
//           </Typography>
//         </Grid>
//         <Grid item md={12}>
//           <StyledTabs
//             value={value}
//             onChange={handleChange}
//             aria-label="styled tabs example"
//           >
//             <StyledTab label="Student Match" />
//             <StyledTab label="Distinct Match" />
//           </StyledTabs>
//         </Grid>
//         {renderTabContent()}
//       </Grid>
//       {/* Render list of accordians based on the data that is passed */}
//       {value === 0 &&
//         props.data.map((data, index) => {
//           console.log(data);
//           return <Accordian data={data} />;
//         })}
//     </Popover>
//   );
// }

// export default SimilarityPopup;

import {
  Button,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterAnchorEl,
  setPoperAnchorEl,
  getAcademicType,
} from "../../Actions/HelperAction";
import Accordian from "./Accordian";
import { StyledTab, StyledTabs } from "./PopUpTabs";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import SubjectInfoTable from "./SubjectInfoTable";
import { isEmptyString } from "../Validation";
import Dropdown from "react-multilevel-dropdown";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import "../ProfileGapAnalysis/DiplomaForm/DiplomaForm.css";

function SimilarityPopup(props) {
  // Setting up dispatch for making an API calls
  const dispatch = useDispatch();
  // Setting up styles for this component
  const useStyles = makeStyles((theme) => ({
    headingTypo: {
      padding: "16px 0px 10px 16px",
      fontWeight: 500,
    },
    popoverStyle: {
      height: "70vh",
      overflowY: "scroll",
      borderRadius: "10px",
      width: "700px",
    },
    filterContainer: {
      display: "flex",
      alignItems: "center",
      marginRight: "2%",
    },
    searchContainer: {
      alignSelf: "flex-end",
      marginBottom: "15px",
    },
    containerStyle: {
      margin: "0px 20px 0px 20px",
    },
    menusDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));
  // Declaring variables for this component
  const popperAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.popperAnchorEl
  );
  const filterAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.filterAnchorEl
  );

  const { department, degree, getStudentMatch } = props;

  const [searchTerm, setSearchTerm] = React.useState("");

  console.log(getStudentMatch, "/////////////////////////");

  // get academicType
  const { academicType } = useSelector((state) => ({
    academicType: state.HelperReducer.academicType,
  }));

  const semester = [
    {
      name: "Semester 1",
      id: 1,
    },
    {
      name: "Semester 2",
      id: 2,
    },
    {
      name: "Semester 3",
      id: 3,
    },
    {
      name: "Semester 4",
      id: 4,
    },
    {
      name: "Semester 5",
      id: 5,
    },
    {
      name: "Semester 6",
      id: 6,
    },
    {
      name: "Semester 7",
      id: 7,
    },
    {
      name: "Semester 8",
      id: 8,
    },
    {
      name: "Semester 9",
      id: 9,
    },
    {
      name: "Semester 10",
      id: 10,
    },
  ];

  const yearData = (type) => {
    let endYear = new Date().getFullYear();
    let startYear = endYear - 10;

    let yearArr = [];
    for (let i = startYear; i <= endYear; i++) {
      yearArr.push({
        name: i.toString(),
        id: i.toString(),
      });
    }
    console.log(yearArr);
    return yearArr;
  };

  const menus = [
    {
      name: "Department",
      children: [
        // department
        {
          name: "department",
          value: "Department",
          children: department,
        },
        // degree
        {
          name: "degree",
          value: "Degree",
          children: degree,
        },
        // semester

        {
          name: "semester",
          value: "Semester",
          children: semester,
        },
        // year
        {
          name: "year",
          value: "Year",
          children: yearData(),
        },
      ],
    },
  ];

  const popperOpen = Boolean(popperAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);

  const id = popperOpen ? "simple-popper" : undefined;

  const [value, setValue] = React.useState(0);

  // Initiating style variable for this component
  const classes = useStyles();
  // This function handles the tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // This function handle the filter open
  const handleFilterOpen = (event) => {
    dispatch(setFilterAnchorEl(event.currentTarget));
  };
  // Setting you values for the year dropdown (logic : start year - Current year and end year ten years before start year )
  const years = () => {
    let endYear = new Date().getFullYear();
    let startYear = endYear - 10;

    let yearArr = [];
    for (let i = startYear; i <= endYear; i++) {
      yearArr.push(i);
    }
    console.log(yearArr);
    return yearArr;
  };

  const renderFilterButton = () => {
    if (isEmptyString(academicType)) {
      console.log("empty");
      return (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          endIcon={<KeyboardArrowDownRoundedIcon />}
          onClick={handleFilterOpen}
        >
          Year
        </Button>
      );
    } else {
      return (
        <div className={classes.menusDiv}>
          {menus.map((menu) => (
            <Dropdown
              title={menu.name}
              menuClassName="text-14 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black"
            >
              {menu.children &&
                menu.children.map((item) => (
                  <Dropdown.Item>
                    <div onMouseOver={() => props.onMouseOver(item)}>
                      {item.value}
                    </div>
                    <Dropdown.Submenu position="left">
                      <div className={classes.searchIcon_field_div}>
                        <InputBase
                          onChange={(event) => {
                            setSearchTerm(event.target.value);
                          }}
                          placeholder="Search…"
                          inputProps={{
                            "aria-label": "search",
                          }}
                        />
                      </div>

                      {item.children &&
                        item.children
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            } else if (
                              typeof val.name === "string" &&
                              val.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((submenu) => (
                            <div>
                              <Dropdown.Item
                                className={classes.Submenu_submenu_1Pcnm}
                                //  onClick= { ()=> handleMenuClick(submenu)}
                                onClick={() => getStudentMatch(submenu)}
                              >
                                <div
                                  onClick={() => {
                                    console.log(submenu);
                                    props.handleSubMenuClick(submenu.id);
                                  }}
                                >
                                  {submenu.name}
                                </div>
                              </Dropdown.Item>
                              {item.children &&
                                item.children.map((submenu) => (
                                  <Dropdown.Submenu position="right">
                                    <Dropdown.Item>
                                      <div>{submenu.name}</div>
                                    </Dropdown.Item>
                                  </Dropdown.Submenu>
                                ))}
                            </div>
                          ))}
                    </Dropdown.Submenu>
                  </Dropdown.Item>
                ))}
            </Dropdown>
          ))}
        </div>
      );
    }
  };

  // This function returns the tab content based on index
  const renderTabContent = () => {
    console.log(years(), ".................");
    if (value === 0) {
      return (
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          container
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <div className={classes.filterContainer}>
            <Typography color={"textSecondary"}>Filter By : </Typography>

            {renderFilterButton()}

            <Menu
              id="simple-menu"
              anchorEl={filterAnchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              keepMounted
              open={filterOpen}
              onClose={() => dispatch(setFilterAnchorEl(null))}
            >
              {years().map((item, index) => {
                return (
                  <MenuItem
                    onClick={() => {
                      // This function will return student match data based on year
                      props.handleYearClick(item);
                      dispatch(setFilterAnchorEl(null));
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </Grid>
      );
    } else if (value === 1) {
      return (
        <Grid
          className={classes.containerStyle}
          container
          spacing={2}
          direction={"column"}
        >
          {/* Search field */}
          <div className={classes.searchContainer}>
            <TextField
              variant={"standard"}
              size={"small"}
              value={props.searchValue}
              onChange={props.searchHandler}
              label={"Search"}
            />
          </div>
          {/* Subject info table */}
          <SubjectInfoTable studentSubjectDetails={props.distinctMatch} />
        </Grid>
      );
    }
  };
  console.log(props.data);
  return (
    <Popover
      id={id}
      classes={{ paper: classes.popoverStyle }}
      open={popperOpen}
      anchorEl={popperAnchorEl}
      onClose={() => dispatch(setPoperAnchorEl(null))}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography className={classes.headingTypo}>
            Profile Similarity Checker
          </Typography>
        </Grid>
        <Grid item md={12}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Student Match" />
            <StyledTab label="Distinct Match" />
          </StyledTabs>
        </Grid>
        {renderTabContent()}
      </Grid>
      {/* Render list of accordians based on the data that is passed */}
      {value === 0 &&
        props.data.map((data, index) => {
          console.log(data);
          return <Accordian data={data} />;
        })}
    </Popover>
  );
}

export default SimilarityPopup;
