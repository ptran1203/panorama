import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ehealth from '../../general/i3app';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class I3AutoSwipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      renderList: []

    }
    this.props.listImg.forEach(i => {
      let a = {};
      a.img = i;
      this.state.renderList.push(a);
    })
  }
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
    const { classes,
      theme,
      listImg,
      auto,
      interval,
      stepper
    } = this.props;
    const { activeStep, renderList } = this.state;
    const maxSteps = listImg.length;
    if (maxSteps == 0) {
      return null;
    }


    return (
      <div className={classes.root}>

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}  //vị trí step hiện tại
          onChangeIndex={this.handleStepChange} //xử lý khi step đổi
          enableMouseEvents
          autoplay={auto}
          interval={interval}
          containerStyle={{ "alignItems": "center" }}
        >
          {renderList.map((step, index) => {
            step.key = step.key ? step.key : ehealth.guid.get();
            return (
              <div key={step.key}>
                {Math.abs(activeStep - index) <= listImg.length ? (    //để khi swipe qua có hình liền kề, nhìn mượt hơn
                  <img className={classes.img} src={step.img} />
                ) : null}
              </div>
            )

          })}
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

I3AutoSwipe.default = {
  stepper: false,
  auto: true,
  interval: 3000,
}

I3AutoSwipe.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  interval: PropTypes.number,
  auto: PropTypes.bool,
  listImg: PropTypes.arrayOf(PropTypes.string).isRequired,
  stepper: PropTypes.bool,
};

const styles = theme => ({
  stepper: {
    'justify-content': 'center'
  },
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
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
});

export default withStyles(styles, { withTheme: true })(I3AutoSwipe);
