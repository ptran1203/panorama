import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import HeaderLinks from "./HeaderLinks";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";

function HeaderMockup({ ...props }) {
  function makeBrand() {
    var name;
    // props.routes.map((prop, key) => {
    //   if (prop.collapse) {
    //     prop.views.map((prop, key) => {
    //       if (prop.path === props.location.pathname) {
    //         name = prop.name;
    //       }
    //       return null;
    //     });
    //   }
    //   if (prop.path === props.location.pathname) {
    //     name = prop.name;
    //   }
    //   return null;
    // });
    if(name){
      return name;
    } else {
      return "";
    }
  }
  const { classes, color, rtlActive } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize + 
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  return (
    <AppBar style={{background: props.headerColor}} className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
            
          >
            <i style={{color: '#fff'}} className="fas fa-bars"></i>
            {/* <Menu /> */}
          </Button>
        </Hidden>
        <div className={classes.flex}>
          {makeBrand()!=""?
          <Button href="#" className={classes.title} color="transparent">
          {makeBrand()}
          </Button>:<h4 ><a href="/event" style={{color: '#fff', fontWeight: '500'}}>{props.headerText?props.headerText:"Default title"}</a></h4>}
        </div>
        {/* <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggleUser}
            
          >
            <i style={{color: '#fff'}} className="fas fa-user"></i>
          </Button>
        </Hidden> */}
      </Toolbar>
      
    </AppBar>
  );
}

HeaderMockup.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(HeaderMockup);
