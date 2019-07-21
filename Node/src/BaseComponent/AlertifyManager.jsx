import React from 'react';
import Snackbar from '../components/Snackbar/Snackbar.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import ehealth from '../general/i3app.js'
class AlertifyManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            confirmations: []

        }
        this.addNewAlertify = {
            warning: (content) => {
                this.state.notifications.unshift(
                    {
                        content: content,
                        color: "warning",
                        isOpen: false
                    }
                )
                this.setState({ notifications: this.state.notifications }, this._showNotification())
            },
            success: (content) => {
                this.state.notifications.unshift(
                    {
                        content: content,
                        color: "success",
                        isOpen: false
                    }
                )
                this.setState({ notifications: this.state.notifications }, this._showNotification())
            },
            error: (content) => {
                this.state.notifications.unshift(
                    {
                        content: content,
                        color: "danger",
                        isOpen: false
                    }
                )
                this.setState({ notifications: this.state.notifications }, this._showNotification())
            }
            
        }

    };


    _showNotification = () => {
        this.state.notifications[0].isOpen = true;
        this.setState({ notifications: this.state.notifications });
        setTimeout(
            function() {
                if (this.state.notifications.length > 0){
                    this.state.notifications[this.state.notifications.length - 1].isOpen = false;
                    this.setState({notifications: this.state.notifications},()=>{this.state.notifications.splice(this.state.notifications.length - 1, 1);});
                }
            }.bind(this),
                4000
        );
    }

    render() {
        let { classes } = this.props;
        let isMobile = ehealth.isMobile;
        return (
            <React.Fragment>

                {this.state.notifications.map((value, index) => {
                    value.key = value.key ? value.key : Math.random().toString(36).substring(2);
                    let _bottom = `${74*index}px`;
                    return (
                        <div
                            key={value.key}
                            style={{ top: isMobile?_bottom:'auto',bottom: isMobile?'auto':_bottom, position: "fixed", width: ehealth.isMobile ? '100%' : 'auto', right: ehealth.isMobile ? 'auto' : '15px',zIndex: '9999' }} 
                            className={classes.snackWrapper}
                        >
                            <Snackbar
                                anchorOrigin={ehealth.isMobile?{ vertical: "top", horizontal: "center"  }:{vertical: "bottom", horizontal: "right"}}
                                color={value.color}
                                message={(<span style={{fontSize: '11pt'}}>{value.content}</span>)}
                                open={value.isOpen}
                                closeNotification={() => {
                                    this.state.notifications[index].isOpen = false;
                                    this.state.notifications.splice(index, 1);
                                    this.setState({ notifications: this.state.notifications });
                                }}
                                close
                            />

                        </div>
                    );
                })}

            </React.Fragment>
        )
    }
}

const alertifyManagerStyles = {
    snackWrapper: {
        "& div:first-child": {
            position: "relative !important"
        }
    }
}

export default withStyles(alertifyManagerStyles)(AlertifyManager);