import React from 'react'
import BaseConsumer from '../../BaseComponent/BaseConsumer.jsx';
import { withStyles } from '@material-ui/core';

import PropTypes, { arrayOf } from "prop-types";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SuperSelectField from 'material-ui-superselectfield';



class I3Select extends BaseConsumer {
    constructor(props) {
        super(props)
    }


    _handleSelect = (values) => {

        let temp;
        if (values != null) {
            if (this.props.multi) {
                temp = values.map(val => (
                    this.props.options.find(i => (i[this.props.valueKey] === val.value))
                ))
            }
            else {
                temp = this.props.options.find(i => (i[this.props.valueKey] === values.value))
            }
            this.props.onChange(temp);
        }else{
            this.props.onChange(null);
        }
    }



    consumerContent = () => {
        let { classes,
            labelKey,
            valueKey,
            value,
            options,
            multi,
            label,
            selectProps,
            render
        } = this.props;



        let optionList = options.map((val, index) => (
            <div key={'i3Option' + val[valueKey]} value={val[valueKey]} label={val[labelKey]}>
                {val[labelKey]}
            </div>
        ))
        let valueTemp = multi ? value.map(i => ({ value: i[valueKey], label: i[labelKey] })) : (value !== null) ? { value: value[valueKey], label: value[labelKey] } : null
        return (
            <div
                style={{
                    display: this.props.display ? this.props.display :'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <MuiThemeProvider>
                    <SuperSelectField
                        multiple={multi}
                        checkPosition='right'
                        unCheckedIcon={null}
                        hintText={label}
                        value={valueTemp}
                        {...selectProps}
                        onChange={this._handleSelect}
                        selectionsRenderer={render}
                    >
                        {optionList}
                    </SuperSelectField>
                </MuiThemeProvider>
            </div>
        )
    }
}

I3Select.defaultProps = {
    multi: true,
    render: (values, hintText) => {
        if (!values) return hintText
        const { value, label } = values
        if (Array.isArray(values)) {
            return values.length
                ? values.map(({ value, label }) => label || value).join(', ')
                : hintText
        }
        else if (label || value) return label || value
        else return hintText
    }
};

I3Select.propTypes = {
    multi: PropTypes.bool,
    selectProps: PropTypes.object,
    label: PropTypes.string,
    render: PropTypes.func,
    //Required
    classes: PropTypes.object.isRequired,
    //vd mẫu
    // selected => (
    //     <div className={classes.chips}>
    //         {
    //             selected.sort().map((val, index) => (
    //                 <Chip key={"ChipSelect" + val}
    //                     color="secondary" label={value[index][labelKey]}
    //                 />
    //             ))
    //         }
    //     </div>
    // )
    options: PropTypes.arrayOf(PropTypes.object).isRequired, //options
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]), //value
    valueKey: PropTypes.string.isRequired, //valueKey
    labelKey: PropTypes.string.isRequired, //labelKey
    onChange: PropTypes.func.isRequired //onChange
};

const containerStyle = {
    padding: 40,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //height: 'calc(100% - 40px)',
};

export default withStyles(containerStyle)(I3Select)