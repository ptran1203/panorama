import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// import Popper from "@material-ui/core/Popper";
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import './header.css';
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";
import $ from 'jquery'
import ehealth from "../../general/i3app";
function HeaderWithUser({ ...props }) {
    function makeBrand() {
        var name;
        if (name) {
            return name;
        } else {
            return "";
        }
    }

    const { classes, color, rtlActive, scrollStatus, openNotification } = props;
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
        <AppBar
            style={{ background: props.headerColor,/* position: 'relative'*/ }}
            className={classes.appBar + appBarClasses}
            position={"fixed"}
        >
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
                {
                    props.hideLeftMenu == true
                        ? null
                        :
                        <Hidden mdUp implementation="css">
                            <Button
                                className={classes.appResponsive}
                                color="transparent"
                                justIcon
                                aria-label="open drawer"
                                onClick={props.handleDrawerToggle}
                                style={{ zIndex: '1' }}
                            >
                                <i style={{ color: '#fff' }} className="fas fa-bars"></i>

                                {/* <Menu /> */}
                            </Button>
                        </Hidden>
                }
                <div style={props.hideLeftMenu == true ? { textAlign: 'center' } : {}} className={classes.flex}>
                    <div>
                        {/* <h5 style={{textAlign: 'center'}}>
                          <span style={{color: 'white'}}><i className="fas fa-bell"></i> </span>
                        </h5> */}
                        <h4>
                            {
                                window.innerWidth <= 370
                                    ? <a href="javascript:;" style={{ color: '#fff', fontWeight: '500', fontSize: '12pt' }}>{props.headerText ? props.headerText : ""}</a>
                                    : <a href="javascript:;" style={{ color: '#fff', fontWeight: '500', }}>{props.headerText ? props.headerText : ""}</a>
                            }

                        </h4>
                    </div>
                </div>
                <Hidden mdUp implementation="css">
                    <div onClick={props.handleDrawerToggleUser} style={{ height: '70%', top: '7px', right: '7px', lineHeight: '50%' }}>
                        {window.isLogin
                            ? <img style={{ height: '35px', borderRadius: '50%', float: 'right' }} src={props.user.avatarUrl} />
                            : null}
                    </div>

                </Hidden>
                {/* <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggleUser}

          >
          
            <i style={{ color: '#fff' }} className="fas fa-user"></i>
          </Button> */}
            </Toolbar>

        </AppBar>
    );
}

HeaderWithUser.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    rtlActive: PropTypes.bool
};
const styles = {
    menuBtn: {
        'z-index': '10'
    }

}
var getStyles = (theme) => {
    var s = headerStyle(theme)
    return { ...s, ...styles }
}
export default withStyles(getStyles)(HeaderWithUser);
