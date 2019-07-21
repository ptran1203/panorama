
import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";

import Table from './Table.jsx'
import PropTypes from "prop-types";
import BaseConsumer from '../../BaseComponent/BaseConsumer.jsx'
import Pagination from '../Pagination/Pagination.jsx'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class I3Table extends BaseConsumer {
    constructor(props) {
        super(props);
        this.sortStates = ['none', 'ascending', 'descending'];
        this.currentStateIndex = 0;
        this.state = {
            columnSortRules: Array(this.props.tableHead.length).fill(this.sortStates[0])
        }

    }
    goTo = (index) => {
        if (index != this.props.paging.current) {
            let x = this.props.paging.active;
            x[this.props.paging.current] = false;
            x[index] = true;
            this.updateObject(this.props.paging, { current: index, active: x }, this.props.updateData(index))
        }
    }

    handleClickHeader = (key) => {
        if (Array.isArray(this.props.sortableIndices) == true && this.props.sortableIndices.includes(key)) {
            if (this.currentStateIndex == 2) {
                this.currentStateIndex = 0;
            } else {
                this.currentStateIndex += 1;
            }
            this.state.columnSortRules[key] = this.sortStates[this.currentStateIndex];
            this.setState({ columnSortRules: this.state.columnSortRules });
        }
        if (typeof (this.props.onClickHeader) === 'function') {
            this.props.onClickHeader(key, this.state.columnSortRules[key]);
        }

    }

    consumerContent() {
        return (
            <React.Fragment>
                <GridContainer >
                    <GridItem md={12} style={{textAlign: 'center'}}>
                    {
                        this.props.paging !== undefined
                        ?
                        <Pagination
                            color={"info"}
                            pages={this.props.paging.active.map((value, index) => {
                                return ({ active: value, text: index, onClick: () => { this.goTo(index) } })
                            })}
                        />
                        : null
                    }
                    </GridItem>
                    <GridItem md={12}>
                        <Table
                            // sortRule = {this.state.isAscending}
                            handleSort={this.props.onClickHeader !== undefined ? this.handleClickHeader : null}
                            {...this.props}
                        />
                    </GridItem>
                </GridContainer>

            </React.Fragment>

        );

    }


}
I3Table.propTypes = {
    onClickHeader: PropTypes.func,
    sortableIndices: PropTypes.arrayOf(PropTypes.number),
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.array/*Of(PropTypes.string)*/,
    // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
    tableData: PropTypes.array,
    hover: PropTypes.bool,
    coloredColls: PropTypes.arrayOf(PropTypes.number),
    gridColls: PropTypes.arrayOf(PropTypes.number),
    // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
    colorsColls: PropTypes.array,
    customCellClasses: PropTypes.arrayOf(PropTypes.string),
    customClassesForCells: PropTypes.arrayOf(PropTypes.number),
    customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
    customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
    striped: PropTypes.bool,
    // this will cause some changes in font
    tableShopping: PropTypes.bool
};
const style = {

}

export default withStyles(style)(I3Table);