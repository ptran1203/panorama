import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ehealth from 'general/i3app';
import $ from 'jquery';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
    root: {

        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        // height: 175,
        display: 'block',
        overflow: 'hidden',
        width: '100%',
    },
    
    stepper: {
        'justify-content':'center',
        'background':"white",
    }
});

class SwipeableTextMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes, theme, banner, stepper } = this.props;
        const { activeStep } = this.state;
        const maxSteps = banner.length;
        if (maxSteps == 0) {
            return null;
        }
        return (
            <div className={classes.root} style={{ ...this.props.style }}>

                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}  //vị trí step hiện tại
                    onChangeIndex={this.handleStepChange} //xử lý khi step đổi
                    enableMouseEvents
                >
                    {banner.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 1 ? (    //để khi swipe qua có hình liền kề, nhìn mượt hơn
                                <a href={step.redirectUrl && step.redirectUrl.length > 0 ? step.redirectUrl : "javascript:;"}>
                                    <img className={classes.img} src={ehealth.getThumbnailUrl(step.thumbnailUrl)}
                                    />
                                </a>
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                {stepper ? <MobileStepper  //Phần mobile stepper riêng không phải liền hoàn toàn với AutoSwipe
                    steps={maxSteps}
                    position="static" //  position?: 'bottom' | 'top' | 'static';
                    //variant?: 'text' | 'dots' | 'progress';
                    variant='dots'
                    activeStep={activeStep}   //step hiện tại, number
                    className={classes.mobileStepper + ' ' + classes.stepper}
                />
                    : null
                }
            </div>
        );
    }
}

SwipeableTextMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
