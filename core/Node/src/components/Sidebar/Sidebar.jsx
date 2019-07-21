import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";

// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from '../CustomButtons/Button';
import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
import ehealth from "../../general/i3app";
var avatar = "/dist/assets/img/faces/avatar.jpg";

var ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute("/components"),
      openForms: this.activeRoute("/forms"),
      openTables: this.activeRoute("/tables"),
      openMaps: this.activeRoute("/maps"),
      openPages: this.activeRoute("-page"),
      miniActive: true
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    //return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    return false;
  }
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.open != nextProps.open;
  }
  render() {
    const {
      classes,
      color,
      logo,
      image,
      logoText,
      routes,
      bgColor,
      rtlActive
    } = this.props;
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextRTL]: rtlActive
      });
    const userWrapperClass =
      classes.user +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const caret =
      classes.caret +
      " " +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const collapseItemMini =
      classes.collapseItemMini +
      " " +
      cx({
        [classes.collapseItemMiniRTL]: rtlActive
      });
    const photo =
      classes.photoNoDarius +
      " " +
      cx({
        [classes.photoRTL]: rtlActive
      });
    var user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <a
              href={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={rtlActive ? "تانيا أندرو" : "Tania Andrew"}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </a>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <a
                    href="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "مع" : "MP"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "ملفي" : "My Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </a>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <a
                    href="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "هوع" : "EP"}
                    </span>
                    <ListItemText
                      primary={
                        rtlActive ? "تعديل الملف الشخصي" : "Edit Profile"
                      }
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </a>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <a
                    href="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "و" : "S"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "إعدادات" : "Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </a>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          const navLinkClasses =
            classes.itemLink +
            " " +
            cx({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          const itemText =
            classes.itemText +
            " " +
            cx({
              [classes.itemTextMini]:
                this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive
            });
          const itemIcon =
            classes.itemIcon +
            " " +
            cx({
              [classes.itemIconRTL]: rtlActive
            });
          return (
            <ListItem key={key} className={prop.parent == false ? classes.item : classes.parentItem}>
              <a style={{ paddingBottom: '5px' }} href={prop.path} className={navLinkClasses}>
                <table style={prop.parent == true ? { width: '100%' } : { width: '90%' }}>
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '90%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ marginRight: '3px' }}>
                          <prop.icon />
                        </div>
                      </td>
                      <td style={{}}>
                        <div style={{ marginLeft: '5px' }}>
                          <p style={{ fontSize: '12pt', margin: '0' }}>{prop.name}</p>
                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <ListItemIcon className={itemIcon}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                      <prop.icon />
                    )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.name}
                  disableTypography={true}
                  className={itemText}
                /> */}
              </a>
            </ListItem>
          );
        })}
      </List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.logoNormalSidebarMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.logoNormalRTL]: rtlActive
      });
    const logoMini =
      classes.logoMini +
      " " +
      cx({
        [classes.logoMiniRTL]: rtlActive
      });
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <table className={logoClasses}>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '75%' }} />
        </colgroup>
        <tbody>
          <tr>
            <td onClick={() => { window.open(ehealth.getPath("/"), "_self") }} style={{ textAlign: 'center' }}>
              <div className={photo}>
                <img src={logo} className={classes.avatarImg} alt="..." />
              </div>
            </td>
            <td onClick={() => { window.open(ehealth.getPath("/"), "_self") }} style={{}}>
              <div>
                <p style={{ fontSize: '14pt', margin: '0' }}>{logoText}</p>
              </div>

            </td>
            <td>
              {
                // nếu màn hình bé thì mới mới hiện nút back
                window.innerWidth <= 370
                  ?
                  <Button onClick={() => {
                    this.props.handleDrawerToggle();
                  }} style={{ width: '0pt', backgroundColor: 'unset', boxShadow: 'unset' }}>
                    <i className="fas fa-chevron-left"></i>
                  </Button>
                  : null
              }
            </td>
          </tr>
        </tbody>
      </table>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            // anchor={rtlActive ? "right" : "left"}
            anchor="left"
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              // user={user}s
              headerLinks={null}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              // user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

const getStyle = (theme) => {
  var sb = sidebarStyle(theme);
  var styles = {
    // parentItem: {
    //   marginLeft: "43px !important"
    // }
  }
  return ({
    ...sb,
    ...styles
  });
};
export default withStyles(getStyle)(Sidebar);
