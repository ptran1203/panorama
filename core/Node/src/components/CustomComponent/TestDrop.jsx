import React from 'react'
import BaseConsumer from '../../BaseComponent/BaseConsumer.jsx';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import { withStyles, Select, MenuItem, InputLabel, FormControl, Button, Chip, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Switch, Grid, Tooltip } from '@material-ui/core';
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Check from "@material-ui/icons/Check";
import Person from "@material-ui/icons/Person"
import TagsInput from "react-tagsinput";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import CustomLinearProgress from '../CustomLinearProgress/CustomLinearProgress';
import Pagination from '../Pagination/Pagination.jsx';




class TestDrop extends BaseConsumer {
    constructor(props) {
        super(props);
        //console.log(this);
        this.state = {
            checkedA: true,
            checkedB: true,
            tags: ["pizza", "pasta", "parmesan"],
            active: false
        }
        this.handleTags = this.handleTags.bind(this);
    }

    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }

    _handleSelect = (event) => {
        // console.log(event);
        // console.log("hehe", event.target.value);
        // event.target.value.forEach(i=>{
        //     console.log(this.props.selectOptions.indexOf(i));
        // })
        //console.log(this.props.control);
        this.clearListAndPushNewItems(this.props.control.simpleSelect, event.target.value);
        //console.log(this.props.control);
    }

    handleChange = event => {
        this.updateObject(this.props.control, { value: event.target.value });
    };

    _handleChange = (val) => (event) => {
        //console.log(event.target.value);
        //console.log(this.props.control);
        this.updateObject(this.props.control.check, { [val]: event.target.checked })
        //console.log(this.props.control);
    }

    _handleSwitch = (name) => (event) => {
        this.setState({ [name]: event.target.checked });
    };

    _change = (event) => {
        //console.log(event.target.value);
    }


    consumerContent = () => {
        //console.log("simpleSelect", this.props.control.simpleSelect);
        let { classes } = this.props;
        const control = this.props.control
        const multi = this.props.multi
        return (
            <div>
                <RadioGroup
                    id="radio"
                    aria-label="Gender"
                    name="gender1"
                    className={classes.group}
                    value={control.value}
                    onChange={this.handleChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label="(Disabled option)"
                    />
                </RadioGroup>
                <FormGroup id="checkbox" name="checkb">
                    <FormControlLabel
                        control={
                            <Checkbox checked={control.check.a}
                                onChange={this._handleChange('a')} value="gilad" />
                        }
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={control.check.b}
                                onChange={this._handleChange('b')} value="jason" />
                        }
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={control.check.c}
                                onChange={this._handleChange('c')}
                                value="antoine"
                            />
                        }
                        label="Antoine Llorca"
                    />
                </FormGroup>

                <FormControlLabel
                    control={
                        <Switch
                            //checkedIcon={<Person/>}   //icon khi check
                            //icon={<Check/>}   //icon lúc thường
                            checked={this.state.checkedB}
                            onChange={this._handleSwitch('checkedB')}
                            value="checkedB"    //string
                            color="primary"
                        />
                    }
                    label="Primary"
                />
                <CustomLinearProgress
                    color="primary"
                    variant="determinate"
                    value={20}

                // color?: 'primary' | 'secondary';
                // value?: number;
                // valueBuffer?: number;    //như phần load của video
                // variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
                />

                <Pagination
                    onChange = {this._change}
                    pages={ //required
                        [
                            { text: "PREV" },//có thể truyền vào onClick, nếu không component tự console log you've clicked {text}
                            { text: 1 },    //text truyền number hoặc PREV,...,NEXT
                            { disabled:true, text: 2 },
                            { active:this.state.active, text: 3, onClick:()=>{this.setState({active:!this.state.active})}},
                            { text: 4 },
                            { text: 5 },
                            { text: "NEXT" }
                        ]
                    }
                />
            </div>
        )
    }
}

export default withStyles(dashboardStyle)(TestDrop)