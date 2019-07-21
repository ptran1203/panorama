// ##############################
// // // App styles
// #############################

import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";
// import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
const appStyle = theme => {
  return ({
    wrapper: {
      position: "relative",
      top: "0",
      height: "calc(100vh - 1px)",
      "&:after": {
        display: "table",
        clear: "both",
        content: '" "'
      },
      overflow: 'hidden'
    },
    container1: {
      // height: 500px;
      'overflow': 'auto',
      '-webkit-overflow-scrolling': 'touch',
    },
    mainPanel: {
      transitionProperty: "top, bottom, width",
      transitionDuration: ".2s, .2s, .35s",
      transitionTimingFunction: "linear, linear, ease",
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`
      },
      overflow: "hidden",
      position: "relative",
      float: "right",
      ...transition,
      maxHeight: "100%",
      width: "100%",
      
    },
    content: {
      overflow: 'auto !important',
      overflowScrolling: "touch",
      height: "calc(100vh - 56px)",
      padding: "30px 15px",
      minHeight: "calc(100vh - 123px)",
      marginTop: '56px'
    },
    container: { ...containerFluid },
    map: {
      marginTop: "70px"
    },
    mainPanelSidebarMini: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerMiniWidth}px)`
      }
    },
    mainPanelWithPerfectScrollbar: {
      overflow: "hidden !important"
    },
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  })
};
export default appStyle;
