import React from 'react';

import immutable from "object-path-immutable";
import objectPath from "object-path";
import AlertifyManager from './AlertifyManager.jsx'
import ModalManager from './ModalManager.jsx';
import SweetAlertManager from './SweetAlertManager.jsx';

import $ from 'jquery';
const Context = React.createContext();

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
//let _isDisableBackButton = _isDisableBackButton || false;
const backToPreviousPage = () => {
    window.history.go(-1);
}


class BasePage extends React.Component {
    constructor(props) {
        super(props);
        // Static 
        $('head').append('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />');
        let _self = this;
        let _baseModalManager = React.createRef();
        let _alertifyManager = React.createRef();
        let _modalManager = React.createRef();
        let _sweetAlertManager = React.createRef();
        let _setState = function (callback, newState) {
            _self.setState(newState, callback);
        };
        window.onClickBack = function () {

            let lastModal = _self.getLastModal();
            if (lastModal && lastModal.canBack) {
                _self.closeModal(lastModal.index);
                return true;
            } else if (!window._isDisableBackButton) {
                backToPreviousPage();
                return true;
            } else {
                return false;
                //Do something to show "close App popup"
            }
        }

        let privateFunctions = {
            baseModalManager: _baseModalManager,
            alertifyManager: _alertifyManager,
            modalManager: _modalManager,
            sweetAlertManager: _sweetAlertManager,
            executeFunction: function (listFunc, callback) {
                listFunc.map(func => {
                    func();
                });
                _setState(callback);
            },
            cloneObjectToState: function (stateName, stateData, callback) {
                if (_self.state[stateName] !== undefined) {
                    throw "this state has already been used. Please change state name.";
                } else {
                    var tempData = {};
                    if (Array.isArray(stateData)){
                        tempData = $.extend(true, [], stateData);

                    }else{
                        tempData = $.extend(true, {}, stateData);
                    }
                    var addedState = immutable.set(_self.state, stateName, tempData);
                    _setState(callback, addedState);
                }
                return stateName;
            },
            deleteCloneObject: function (key) {
                delete _self.state[key];
            },
            getCloneStateByKey: function (key) {
                if (_self.state[key] !== undefined) {
                    return _self.state[key];
                } else {
                    throw "this state has not been defined";
                }
            },
            updateObject: function (old, newx, callback, willSetState = true) {
                var path = _findPath(old, _self.state);
                var newState = immutable.merge(_self.state, path, newx);
                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                } else {
                    typeof callback === "function" && callback();
                }
            },
            overwriteObject: function (old, newx, callback) {
                var path = _findPath(old, _self.state);
                var newState = immutable.set(_self.state, path, newx);
                _setState(callback, newState);
            },

            updateElementInValueList: function (newValue, index, list, callback) {
                if (index >= list.length) {
                    throw "index is out of range";
                }
                var path = _findPath(list, _self.state) + "." + index;
                var newState = immutable.set(_self.state, path, newValue);
                _setState(callback, newState);
            },
            removeElement: function (listObj, object, callback, willSetState = true) {
                let index = listObj.indexOf(object);
                if (index < 0) {
                    throw "object is not found";
                }
                var path = _findPath(listObj, _self.state) + "." + index;
                var newState = immutable.del(_self.state, path);
                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                }
            },
            addElement: function (listObj, newObj, index, callback, willSetState = true) {
                console.log(index);
                var path = _findPath(listObj, _self.state);
                var newState = {};
                if (index != null || index != undefined) {
                    newState = immutable.insert(_self.state, path, newObj, index);
                }
                else {
                    newState = immutable.push(_self.state, path, newObj);
                }
                console.log(newState);
                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                }
            },
            sortList: function (listObj, comparer, callback, willSetState = true) {
                if (!Array.isArray(listObj)) {
                    throw "list Object should be an array";
                }
                if (typeof (comparer) !== "function")
                    throw "comparer is not a function";
                else {
                    var path = _findPath(listObj, _self.state);
                    var newState = immutable.update(_self.state, path, l => l.sort(comparer).map(i => { return i; }));
                    if (willSetState === true || true /*TODO*/) {
                        _setState(callback, newState);
                    }
                }
            },

            mergeList: function (listObj, newListObj, comparer, callback, willSetState = true) {
                if (typeof comparer !== "function") {
                    throw "comparer is not a function";
                } else {
                    var path = _findPath(listObj, _self.state);
                    var newState = immutable.update(_self.state, path, (l) => {
                        newListObj.map(newObj => {
                            var index = l.findIndex(oldObj => comparer(oldObj, newObj) === true);
                            if (index >= 0) {
                                var temp = immutable.merge(l, index, newObj);
                                l = temp;
                            } else {
                                l = immutable.push(l, '', newObj);
                            }
                        })
                        return l;
                    });


                    if (willSetState === true || true /*TODO*/) {
                        _setState(callback, newState);
                    }
                }
            },
            swapItemInList(listObj, index1, index2, callback, willSetState = true) {
                let listLength = listObj.length;
                if (index1 < 0 || index1 >= listLength || index2 < 0 || index2 >= listLength) {
                    throw "index is out of array";
                }
                var path = _findPath(listObj, _self.state);
                var obj1 = listObj[index1];
                var obj2 = listObj[index2];

                var newState = immutable.update(_self.state, path, (l) => {
                    l[index1] = immutable.set(l[index1], '', obj2);
                    l[index2] = immutable.set(l[index2], '', obj1);
                    return l;
                })

                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                }
            },
            moveItemInList(listObj, oldIndex, newIndex, callback, willSetState = true) {
                if (oldIndex == newIndex) {
                    return;
                }
                if (oldIndex >= listObj.length || newIndex >= listObj.length) {
                    throw ("index out of range");
                }
                var path = _findPath(listObj, _self.state);
                var newState = immutable.update(_self.state, path, (l) => {
                    var temp = [];
                    if (oldIndex < newIndex) {
                        temp = immutable.update(l, '', (t) => {
                            var x = t.filter((item, index) => { return (index <= newIndex && index != oldIndex); });
                            return x;

                        });
                        temp = immutable.push(temp, '', l[oldIndex]);
                        temp = immutable.update(temp, '', (t) => {
                            t.push(...l.filter((item, index) => { return (index > newIndex); }));
                            return t;
                        });
                    } else if (oldIndex > newIndex) {
                        temp = immutable.update(l, '', (t) => {
                            var x = t.filter((item, index) => { return (index < newIndex); });
                            return x;

                        });
                        temp = immutable.push(temp, '', l[oldIndex]);
                        temp = immutable.update(temp, '', (t) => {
                            t.push(...l.filter((item, index) => { return (index >= newIndex && index != oldIndex); }));
                            return t;
                        });
                    }
                    return temp;
                })

                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                }
            },
            clearListAndPushNewItems(oldList, newList, callback, willSetState = true) {
                var path = _findPath(oldList, _self.state);
                var newState = immutable.set(_self.state, path, newList);
                if (willSetState === true || true /*TODO*/) {
                    _setState(callback, newState);
                }
            },
            findPathFromStateByObject(obj) {
                var path = _findPath(obj, _self.state);
                return path;
            },
            getObjectByPathFromState(path) {
                return objectPath.get(_self.state, path);
            }
        };

        _self.alertify = {
            warning: (content) => {
                return _alertifyManager.current.addNewAlertify.warning(content);
            },
            success: (content) => {
                return _alertifyManager.current.addNewAlertify.success(content);
            },
            error: (content) => {
                return _alertifyManager.current.addNewAlertify.error(content);
            },
            confirm: (title, body, footer) => {
                return _modalManager.current.openModal(title, body, footer, "confirm");
            }

        }
        _self.openModal = function (title, body, footer, otherProps) {
            return _modalManager.current.openModal(title, body, footer, "modal", otherProps);
        }
        _self.closeModal = function (modalIndex) {
            _modalManager.current.closeModal(modalIndex);
        }

        _self.clearAllModal = function (callback) {
            _modalManager.current.clearAllModal(callback);
        }
        _self.sweetAlert = {
            success: (title, subtitle, callback) => {
                return _sweetAlertManager.current.sweetAlert(title, subtitle, "success", callback);
            },
            error: (title, subtitle, callback) => {
                return _sweetAlertManager.current.sweetAlert(title, subtitle, "error", callback);
            }
        }

        _self.getLastModal = function () {
            return _modalManager.current.getLastModal();
        }

        _self.executeFunction = function (listFunc, callback) {
            privateFunctions.executeFunction(listFunc, callback);
        }
        _self.updateObject = function (old, newx, callback, willSetState) {
            privateFunctions.updateObject(old, newx, callback, willSetState);
        }
        _self.removeElement = function (listObj, object, callback, willSetState) {
            privateFunctions.removeElement(listObj, object, callback, willSetState);
        }
        _self.addElement = function (listObj, newObj, index, callback, willSetState) {
            privateFunctions.addElement(listObj, newObj, index, callback, willSetState);
        }
        _self.overwriteObject = function (old, newx, callback) {
            privateFunctions.overwriteObject(old, newx, callback);
        }
        _self.updateElementInValueList = function (newValue, index, list, callback) {
            privateFunctions.updateElementInValueList(newValue, index, list, callback);
        }
        _self.sortList = function (listObj, comparer, callback, willSetState) {
            privateFunctions.sortList(listObj, comparer, callback, willSetState);
        }
        _self.clearListAndPushNewItems = function (oldList, newList, callback, willSetState = true) {
            privateFunctions.clearListAndPushNewItems(oldList, newList, callback, willSetState);
        }
        _self.mergeList = function (listObj, newListObj, comparer, callback, willSetState) {
            privateFunctions.mergeList(listObj, newListObj, comparer, callback, willSetState);
        }
        _self.swapItemInList = function (listObj, index1, index2, callback, willSetState) {
            return privateFunctions.swapItemInList(listObj, index1, index2, callback, willSetState);
        }
        _self.moveItemInList = function (listObj, oldIndex, newIndex, callback, willSetState) {
            return privateFunctions.moveItemInList(listObj, oldIndex, newIndex, callback, willSetState);
        }

        let _findPath = (node, root) => {
            if (node === root) {
                return true;
            }
            var path = [];
            _findNode(node, root, path);
            if (path.length === 0) {
                return false;
            }
            return path.reverse().join(".");
        }

        let _findNode = (node, root, path) => {
            // console.log(node,root, path);
            if (typeof root === "object") {
                for (var n in root) {
                    if (root[n] === node) {
                        path.push(n);
                        return true;
                    } else {
                        var right = _findNode(node, root[n], path);
                        if (right) {
                            path.push(n);
                            return true;
                        }
                    }
                }
            }

            // return path.reverse().join(".");
        }

        _self.render = function () {
            return (
                <Context.Provider value={privateFunctions}>
                    {
                        _self.childrenRender()
                    }
                    {/* <BaseModalManager ref={_baseModalManager} /> */}
                    <AlertifyManager innerRef={_alertifyManager} />
                    <ModalManager innerRef={_modalManager} />
                    <SweetAlertManager innerRef={_sweetAlertManager} />
                </Context.Provider>
            )
        }

    }
    childrenRender() { throw new ("childrenRender is not overwritten") };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
    }
}

export { Context, BasePage };

/*************************************************************
*
*                       _oo0oo_
*                      o8888888o
*                      88" . "88
*                      (| -_- |)
*                      0\  =  /0
*                    ___/`---'\___
*                  .' \|     |// '.
*                 / \|||  :  |||// \
*                / _||||| -:- |||||- \
*               |   | \\  -  /// |   |
*               | \_|  ''\---/''  |_/ |
*               \  .-\__  '-'  ___/-. /
*             ___'. .'  /--.--\  `. .'___
*          ."" '<  `.___\_<|>_/___.' >' "".
*         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
*         \  \ `_.   \_ __\ /__ _/   .-` /  /
*     =====`-.____`.___ \_____/___.-`___.-'=====
*                       `=---='
*
*     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*
*               Buddha Bless:  "No Bugs"
*
* ========================================================= */
