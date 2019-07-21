import BaseConsumer from './BaseConsumer.jsx';
import React from 'react';
export default class BaseCloneConsumer extends BaseConsumer {
    constructor(props) {
        super(props);
        this.firstClone = false;
    }

    consumerContent() {
        console.log(this.firstClone);
        if (!this.firstClone) {
            return null;
        } else {
            return (
                <React.Fragment>
                    {this.childrenCloneContent()}
                </React.Fragment>
            );
        }
    }

    componentDidMount() {
        this.cloneObjectToState(this.getCloneStateName(), this.getCloneStateData(), () => { this.firstClone = true; this.onChange(); });

    }
    getCloneStateName() {
        throw "getCloneStateName() has not been implemented";
    }

    getCloneStateData() {
        throw "getCloneStateData() has not been implemented";
    }

    childrenCloneContent() {
        throw "abc";
    }

    getCloneStateByKey() {
        return this.consumerFunction.getCloneStateByKey(this.getCloneStateName());
    }

    onChange = (callBack) => {
        this.forceUpdate(callBack);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.consumerFunction.deleteCloneObject(this.getCloneStateName());
    }

    commitData = (commitCallback) => {
        this.consumerFunction.updateObject(this.getCloneStateData(), this.consumerFunction.getCloneStateByKey(this.getCloneStateName()));
        typeof commitCallback === "function" && commitCallback();
    }
}