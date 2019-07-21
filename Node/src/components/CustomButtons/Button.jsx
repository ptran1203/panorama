import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

var _detailColor;
function RegularButton({ ...props }) {
  const {
    classes,
    detailColor,
    color,
    round,
    children,
    fullWidth,
    width, // modified
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  _detailColor = detailColor;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes[detailColor]]: detailColor,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button style={{width: width}} {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.defaultProps = {
  width: 'auto'
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object
};
export default withStyles(buttonStyle)(RegularButton);
