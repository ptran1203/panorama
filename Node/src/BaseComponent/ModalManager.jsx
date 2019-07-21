import React from 'react';
import ehealth from '../general/i3app.js'
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

function SlideLeft(props) {
    return <Slide direction={"left"}  {...props} />;
}

function SlideDown(props) {
    return <Slide direction={"down"} {...props} />;
}

function SlideRight(props) {
    return <Slide direction={"right"} {...props} />;
}

function SlideUp(props) {
    return <Slide direction={"up"} in={true}  {...props} />;
}

class ModalManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modals: [],
        }
        this._getSlideDirection = this._getSlideDirection.bind(this);
    }
    getLastModal = () => {
        if (this.state.modals.length > 0) {
            return ({ index: this.state.modals.length - 1, canBack: true });
        } else {
            return { canBack: false };
        }
    }
    openModal = (title, body, footer, mode, otherProps) => {
        var _ref = React.createRef();
        this.state.modals.push(
            {
                title: title,
                body: body,
                footer: footer,
                mode: mode,
                otherProps: otherProps,
                ref: _ref,
                isOpen: true
            }
        )
        this.setState({ modals: this.state.modals });
        return this.state.modals.length - 1;
    }
    closeModal = (index) => {
        this.handleClose(index);
    }

    clearAllModal = (callback) => {
        this.state.modals.forEach(i => {
            i.isOpen = false;
        });
        this.setState({ modals: this.state.modals }, () => {
            setTimeout(() => {
                this.setState({ modals: [] }, callback);
            }, 500);
        });

    }

    handleClose = (index) => {
        this.state.modals[index].isOpen = false;
        this.setState({ modals: this.state.modals }, () => {
            this.state.modals.splice(index, 1);
            setTimeout(() => {
                this.setState({ modals: this.state.modals });
            }, 500);
        });
    }
    shouldComponentUpdate(np, ns) {
        return true;
    }
    _getSlideDirection = function (dir) {
        if (dir == "down") return SlideDown;
        if (dir == "left") return SlideLeft;
        if (dir == "right") return SlideRight;
        if (dir == "up") return SlideUp;
    }
    render() {
        var { classes, ...other } = this.props;
        return (
            <React.Fragment>
                {this.state.modals.map((value, index) => {
                    value.key = value.key ? value.key : ehealth.guid.get();
                    var slideD = value.otherProps && value.otherProps.slideDirection
                        ? this._getSlideDirection(value.otherProps.slideDirection)
                        : value.mode == "confirm"
                            ? SlideDown
                            : SlideLeft;
                    var bodyStyle = {};
                    if (value.otherProps && value.otherProps.bgColor) {
                        bodyStyle.backgroundColor = value.otherProps.bgColor;
                    };
                    if (value.otherProps && value.otherProps.disablePadding) {
                        bodyStyle.padding = '0';
                    };
                    if (value.mode == "confirm") {
                        bodyStyle.margin = ' 10px 0';
                        bodyStyle.fontSize = '13pt';
                        bodyStyle.fontWeight = '400';
                    }
                    return (
                        <Dialog
                            ref={value.ref}
                            key={value.key}
                            fullWidth={true}
                            fullScreen={ehealth.isMobile}
                            maxWidth={false}
                            classes={{
                                paper: value.mode == "confirm" ? classes.modal : classes.paperFullWidth
                            }}
                            open={value.isOpen}
                            TransitionComponent={slideD}
                            keepMounted
                            onClose={() => this.handleClose(index)}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            {...other}
                        >
                            {
                                !value.title ? null :
                                    <DialogTitle
                                        id="alert-dialog-slide-title"
                                        disableTypography
                                        className={classes.modalHeader}
                                        style={{ paddingLeft: '12px' }}
                                    >
                                        {
                                            (!value.otherProps || !value.otherProps.disableBack)
                                                ?
                                                <Button
                                                    justIcon
                                                    className={classes.modalCloseButton}
                                                    key="close"
                                                    aria-label="Close"
                                                    color="transparent"
                                                    onClick={() => this.handleClose(index)}
                                                    style={ehealth.isMobile == false ? { position: 'absolute', right: '10px', opacity: '.7', zIndex: '10' } : null}
                                                >
                                                    {
                                                        ehealth.isMobile == true
                                                            ? <i style={{}} className="fas fa-chevron-left"></i>
                                                            : <Close className={classes.modalClose} />
                                                    }
                                                </Button>
                                                : null
                                        }
                                        <p style={value.mode == "confirm" ? null : { fontSize: '20px', fontWeight: '500', textAlign: 'center', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: '#636466' }} className={classes.modalTitle}>{value.title}</p>
                                    </DialogTitle>
                            }
                            <DialogContent
                                style={bodyStyle}
                                id="alert-dialog-slide-description"
                                className={classes.modalBody}
                            >
                                {value.body}
                            </DialogContent>

                            {!value.footer ? null :
                                <DialogActions className={classes.modalFooter}>
                                    <React.Fragment>
                                        {!value.footer.cancel
                                            ? null
                                            : <Button className={value.mode == "confirm" ? classes.confirmCancelBtn : null} width={'100px'} color="transparent" onClick={() => this.handleClose(index)}>
                                                {value.footer.cancel}
                                            </Button>}
                                        {!value.footer.okay
                                            ? null
                                            : <Button className={value.mode == "confirm" ? classes.confirmOkBtn : null} width={'100px'} color="transparent" onClick={() => {
                                                typeof value.footer.okay.handle !== 'undefined' && value.footer.okay.handle();
                                                this.handleClose(index);
                                            }}>
                                                {value.footer.okay.title}
                                            </Button>}
                                    </React.Fragment>
                                </DialogActions>
                            }

                        </Dialog>
                    )
                })}

            </React.Fragment>
        )
    }

}
export default withStyles(modalStyle)(ModalManager)