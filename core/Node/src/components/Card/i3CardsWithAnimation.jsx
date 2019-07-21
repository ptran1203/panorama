import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { completedTasksChart } from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import BaseConsumer from "../../BaseComponent/BaseConsumer";

class CardsWithAnimation extends BaseConsumer {
    childrenRender() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card chart className={classes.cardHover}>
                            <CardHeader color="rose" className={classes.cardHeaderHover}>
                                <ChartistGraph
                                    className="ct-chart-white-colors"
                                    data={completedTasksChart.data}
                                    type="Line"
                                    options={completedTasksChart.options}
                                    listener={completedTasksChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <div className={classes.cardHoverUnder}>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Refresh"
                                        placement="bottom"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <Button simple color="info" justIcon>
                                            <Refresh className={classes.underChartIcons} />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Change Date"
                                        placement="bottom"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <Button color="transparent" simple justIcon>
                                            <Edit className={classes.underChartIcons} />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <h4 className={classes.cardTitle}>Daily Sales</h4>
                                <p className={classes.cardCategory}>
                                    <span className={classes.successText}>
                                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                      </span>{" "}
                                    increase in today sales.
                    </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime /> updated 4 minutes ago
                    </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

CardsWithAnimation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(CardsWithAnimation);