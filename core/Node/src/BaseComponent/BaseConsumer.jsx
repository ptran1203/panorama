
import React from 'react'
//import ConfirmModal from './ConfirmModal.jsx';
import { Context } from './BasePage';

const _shallowEqual = function (objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }
    return true;
}

const _shallowCompare = function (instance, nextProps, nextState) {
    var result = !_shallowEqual(instance.props, nextProps) || !_shallowEqual(instance.state, nextState);
    return result;
}

export default class BaseConsumer extends React.Component {
    constructor(props) {
        super(props);
        this.consumerFunction = {};
        this._confirmModals = {};
    }

    registerSignalR = (needs) => {
        this._needs = needs.map(i => { return i });
        if (window.hubManager) {
            this._needs.forEach(need => {
                window.hubManager.registerNeed(need, this, null)
            });
        }
        else {
            throw ("signalR is not set");
        }
    }

    _closeModal = () => {
        this.closeModal(this._confirmModals);
    }

    _renderContent = (consumerFunction) => {
        this.consumerFunction = consumerFunction;
        this.alertify = {
            warning: (content) => {
                return this.consumerFunction.alertifyManager.current.addNewAlertify.warning(content);
            },
            success: (content) => {
                return this.consumerFunction.alertifyManager.current.addNewAlertify.success(content);
            },
            error: (content) => {
                return this.consumerFunction.alertifyManager.current.addNewAlertify.error(content);
            },
            confirm: (title, body, footer) => {
                return this.consumerFunction.modalManager.current.openModal(title, body, footer, "confirm");
            }
        }
        this.sweetAlert = {
            success: (title, subtitle, callback) => {
                return this.consumerFunction.sweetAlertManager.current.sweetAlert(title, subtitle, "success", callback);
            },
            error: (title, subtitle, callback) => {
                return this.consumerFunction.sweetAlertManager.current.sweetAlert(title, subtitle, "error", callback);
            }
        }
        return this.consumerContent();
    }

    closeModal(index) {
        this.consumerFunction.modalManager.current.closeModal(index);
    }

    openModal(title, body, footer, otherProps) {
        return this.consumerFunction.modalManager.current.openModal(title, body, footer, "modal", otherProps);
    }

    clearAllModal(callback){
        this.consumerFunction.modalManager.current.clearAllModal(callback);
    }


    shouldComponentUpdate(nextProps, nextState) {
        var result = _shallowCompare(this, nextProps, nextState);
        // console.log(this.props);
        // console.log(nextProps);
        return result;
    }

    consumerContent() {
        throw ("not implemented exception!");
    }

    _executeFunction(listFunc, callback) {
        this.consumerFunction.executeFunction(listFunc, callback);
    }

    updateObject(old, newx, callback, willSetState) {
        this.consumerFunction.updateObject(old, newx, callback, willSetState);
    }

    removeElement(listObj, object, callback, willSetState) {
        this.consumerFunction.removeElement(listObj, object, callback, willSetState);
    }

    addElement(listObj, newObj, index, callback, willSetState) {
        this.consumerFunction.addElement(listObj, newObj, index, callback, willSetState);
    }

    overwriteObject(old, newx, callback) {
        this.consumerFunction.overwriteObject(old, newx, callback);
    }

    updateElementInValueList(newValue, index, list, callback) {
        this.consumerFunction.updateElementInValueList(newValue, index, list, callback);
    }

    sortList(listObj, comparer, callback, willSetState) {
        this.consumerFunction.sortList(listObj, comparer, callback, willSetState);
    }

    clearListAndPushNewItems(oldList, newList, callback, willSetState = true) {
        this.consumerFunction.clearListAndPushNewItems(oldList, newList, callback, willSetState);
    }

    mergeList(listObj, newListObj, comparer, callback, willSetState) {
        this.consumerFunction.mergeList(listObj, newListObj, comparer, callback, willSetState);
    }
    swapItemInList(listObj, index1, index2, callback, willSetState) {
        return this.consumerFunction.swapItemInList(listObj, index1, index2, callback, willSetState);
    }
    moveItemInList(listObj, oldIndex, newIndex, callback, willSetState) {
        return this.consumerFunction.moveItemInList(listObj, oldIndex, newIndex, callback, willSetState);
    }
    // openModal(modal, props) {
    //     return this.consumerFunction.baseModalManager.current.openModal(modal, props);
    // }

    // closeModal(modalId) {

    //     return this.consumerFunction.baseModalManager.current.closeModal(modalId);
    // }

    cloneObjectToState(stateName, stateData, callback) {
        return this.consumerFunction.cloneObjectToState(stateName, stateData, callback);
    }

    render() {
        return (
            <Context.Consumer>
                {this._renderContent}
            </Context.Consumer>
        );
    }

    componentWillUnmount() {
        if (Array.isArray(this._needs) && window.hubManager) {
            this._needs.forEach(need => {
                window.hubManager.unregisterNeed(need, this)
            });
        }
    }
    componentDidMount(){
        
    }
}