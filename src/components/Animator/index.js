import { useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import Upload from './Upload';
import Animate from './Animate';
import Background from './Background';
import Sound from './Sound';
import Share from './Share';

function Payment() {
  return <h2>Payment information</h2>;
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}

function Animator() {
  const [ activeStep, setActiveStep ] = useState(0);

  const steps = [
    { title: 'Upload' },
    { title: 'Animate' },
    { title: 'Background' },
    { title: 'Add Sound' },
    { title: 'Share' },
  ];
  

  function getSectionComponent(StepForward, StepBackward) {
    switch(activeStep) {
        case 0: return <Upload StepForward={StepForward} />;
        case 1: return <Animate StepForward={StepForward} StepBackward={StepBackward} />;
        case 2: return <Background StepForward={StepForward} StepBackward={StepBackward} />;
        case 3: return <Sound StepForward={StepForward} StepBackward={StepBackward}/>;
        case 4: return <Share  StepBackward={StepBackward} />;
      default: return null;
    }
  }

    const StepForward = () => {
        if(activeStep !== steps.length - 1){
            setActiveStep(activeStep + 1)
        }
    }

    const StepBackward = () => {
        if(activeStep !== 0){
            setActiveStep(activeStep - 1)
        }
    }

  return (
    <div>
      <Stepper
        steps={steps}
        activeStep={activeStep}/>
      <div style={{padding: '20px'}}>
        { getSectionComponent(StepForward, StepBackward)  }
      </div>
    </div>
  );
}


export default Animator;