import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import cx from "classnames";
import ehealth from 'general/i3app'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

var ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapperUser, {
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
      <div className={className} ref="sidebarWrapperUser">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class SidebarUser extends React.Component {
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

    return this.props.open != nextProps.open || this.props.user != nextProps.user;
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
      classes.photo +
      " " +
      cx({
        [classes.photoRTL]: rtlActive
      });
    const { user } = this.props;
    var _user = (
      <div className={userWrapperClass}>
        <List className={classes.list}>

          <ListItem className={classes.parentItem + " " + classes.userItem}>
            <div
              href={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <div>
                <table>
                  <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '75%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <div className={photo}>
                          <img src={user.avatarUrl} className={classes.avatarImg} alt="..." />
                        </div>
                      </td>
                      <td style={{  }}>
                        <div>
                          <p style={{fontSize: '14pt', margin: '0'}}>{user.name}</p>
                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>


                {/* <ListItemText
                  primary={user.name}
                  // secondary={
                  //   <b
                  //     className={
                  //       caret +
                  //       " " +
                  //       classes.userCaret +
                  //       " " +
                  //       (this.state.openAvatar ? classes.caretActive : "")
                  //     }
                  //   />
                  // }
                  disableTypography={true}
                  className={itemText + " " + classes.userItemText}
                /> */}
              </div>

            </div>
            <div style={{ borderTop: "1px solid lightgray", marginLeft: '25px', marginTop: '20px' }}>
              <List className={classes.list + " " + classes.collapseList}>
                {
                  this.props.tabs.map((value, index) => {

                    return (
                      <ListItem key={ehealth.guid.get()} className={classes.collapseItem}>
                        {React.createElement(value.icon)}
                        <a
                          style={{ display: 'inline-block', paddingRight: '0px' }}
                          href={"javascript:;"}
                          onClick={value.onClick}
                          className={
                            classes.itemLink + " " + classes.userCollapseLinks
                          }
                        >

                          <ListItemText
                            primary={value.title}
                            disableTypography={true}
                            className={collapseItemText}
                            style={{ marginLeft: '-10px', fontWeight: 'normal' }}
                          />
                        </a>
                      </ListItem>
                    );
                  })
                }

              </List>
            </div>
          </ListItem>
        </List>
      </div>
    );
    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          if (prop.collapse) {
            const navLinkClasses =
              classes.itemLink +
              " " +
              cx({
                [" " + classes.collapseActive]: this.activeRoute(prop.path)
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
            const itemIcon =
              classes.itemIcon +
              " " +
              cx({
                [classes.itemIconRTL]: rtlActive
              });
            const caret =
              classes.caret +
              " " +
              cx({
                [classes.caretRTL]: rtlActive
              });
            return (
              <React.Fragment>
                <ListItem key={key} className={classes.item}>
                  <a
                    // href={"#"}
                    className={navLinkClasses}
                    onClick={() => this.openCollapse(prop.state)}
                  >
                    <ListItemIcon className={itemIcon}>
                      <i style={{ color: '#fff' }} className="fas fa-bars"></i>
                      {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                          <prop.icon />
                        )}
                    </ListItemIcon>
                    <ListItemText
                      style={{ fontSize: '15px', fontWeight: '450' }}
                      primary={prop.name}
                      secondary={
                        <b
                          className={
                            caret +
                            " " +
                            (this.state[prop.state] ? classes.caretActive : "")
                          }
                        />
                      }
                      disableTypography={true}
                      className={itemText}
                    />
                  </a>
                </ListItem>
                <Divider variant="middle" />
              </React.Fragment>
            );
          }
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
            <ListItem key={key} className={classes.item}>
              <a href={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
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
                />
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
    var brand = logo == undefined && logoText == undefined ? <div></div> : (
      <div className={logoClasses}>
        {logo == undefined ? null : <a href="#" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>}
        {logoText == undefined ? null : <a href="#" className={logoNormal}>
          {logoText}
        </a>}
      </div>
    );
    const drawerPaperUser =
      classes.drawerPaperUser +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapperUser +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: drawerPaperUser + " " + "XXX " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
          >
            <SidebarWrapper
              className={sidebarWrapper}
              user={_user}
              headerLinks={null}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : { backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden lgDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="right"
            variant="permanent"
            open
            classes={{
              paper: drawerPaperUser + " " + classes[bgColor + "Background"]
            }}
          >
            {/* {brand} */}
            <SidebarWrapper
              className={sidebarWrapper}
              user={_user}
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

SidebarUser.defaultProps = {
  bgColor: "blue"
};

SidebarUser.propTypes = {
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

export default withStyles(sidebarStyle)(SidebarUser);
