import React from 'react'
import BaseConsumer from '../../BaseComponent/BaseConsumer.jsx';
import { withStyles, FormControlLabel, Checkbox, FormGroup, RadioGroup, Radio } from '@material-ui/core';
import PropTypes from "prop-types";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

class I3Checkbox extends BaseConsumer {
    constructor(props) {
        super(props)
    }

    // _handleChange = (data) => {
    //     this.props.onChange(data);
    // }

    _radioChange = (event) => {
        console.log(event);
        let data = this.props.options.filter(i => (i[this.props.valueKey] === event.target.value));

        this.props.onChange(data);
    }

    consumerContent = () => {
        const {
            classes,
            value,
            options,
            valueKey,
            labelKey,
            formControlLabelProps,
            multiple,
            checkBoxProps,
            formGroupProps,
            radioProps,
            radioGroupProps,
            disableFlex
        } = this.props;
        return (
            <React.Fragment>
                {multiple ?
                    <FormGroup className={disableFlex?classes.disableFlex:null} {...formGroupProps}>
                        {
                            options.map((val, index) => {
                                return (
                                    <FormControlLabel key={val[valueKey]}
                                        control={
                                            <Checkbox checked={value.findIndex(e => (e[valueKey] === val[valueKey])) > -1}
                                                onChange={() => {this.props.onChange(val) }} value={val[valueKey]}
                                                {...checkBoxProps}
                                            />
                                        }
                                        label={val[labelKey]}
                                        {...formControlLabelProps}
                                    />
                                )
                            })
                        }
                    </FormGroup> :
                    <RadioGroup
                        className={classes.group}
                        value={value.length ? value[0][valueKey]: ''}
                        onChange = {this._radioChange}
                        {...radioGroupProps}
                    >
                        {
                            options.map((val, index) => {
                                return (
                                    <FormControlLabel key={val[valueKey]}
                                    value={val[valueKey]}
                                        control={
                                            <Radio
                                            {...radioProps}
                                            onClick = {()=>{
                                                if (val[valueKey]===(value.length ? value[0][valueKey]: ''))
                                                    this.removeElement(value,value[0])
                                            }} 
                                            />
                                        }
                                        label={val[labelKey]}
                                        {...formControlLabelProps}
                                    />
                                )
                            })
                        }
                    </RadioGroup>
                }
            </React.Fragment>
        )
    }
}

I3Checkbox.defaultProps = {
    multiple: true
}

I3Checkbox.propTypes = {
    formControlLabelProps: PropTypes.object,
    formGroupProps: PropTypes.object,
    checkBoxProps: PropTypes.object,
    multiple: PropTypes.bool,
    radioProps: PropTypes.object,
    radioGroupProps: PropTypes.object,

    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
const styles = {
    disableFlex: {
        'display': 'block !important'
    }
}
export default withStyles({...styles, ...customCheckboxRadioSwitch})(I3Checkbox)