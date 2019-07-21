import BaseConsumer from './BaseConsumer.jsx';
import React from 'react';
import $ from 'jquery';
export default class ModalComponent extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            propPaths: {
            },
            propValues: {

            },
            firstLoad: true
        };

    }

    findPathFromStateByObject = (obj) => {
        return this.consumerFunction.findPathFromStateByObject(obj);
    }

    getObjectByPathFromState = (path) => {
        return this.consumerFunction.getObjectByPathFromState(path);
    }

    shouldComponentUpdate(){
        return true;
    }

    consumerContent() {
        if (this.state.firstLoad == true) {
            return null;
        }
        const childrenRender = React.Children.map(this.props.children, child => {
            var {children, ...temp} = this.state.propValues;
            Object.keys(this.state.propPaths).map(pp => {
                temp[pp] = this.getObjectByPathFromState(this.state.propPaths[pp]);
            })
            return React.cloneElement(child, temp);
        })
        return (
            <React.Fragment>
                {childrenRender}
            </React.Fragment>
        );
    }
    componentDidMount() {
        Object.keys(this.props).map(prop => {
            var temp = this.findPathFromStateByObject(this.props[prop]);
            if (!temp) {
                this.state.propValues[prop] = this.props[prop];
            } else {
                if (temp === true) {
                    this.state.propPaths[prop] = "";
                } else {
                    this.state.propPaths[prop] = temp;
                }
            }
        });
        this.setState({ firstLoad: false });
    }
}