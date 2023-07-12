import { useState } from "react";
import Stepper from "react-stepper-horizontal";
import Upload from "./Upload";
import Animate from "./Animate";
import Background from "./Background";
import Sound from "./Sound";
import Share from "./Share";
import classes from "./index.module.css";
import Footer from "./Footer";

function Payment() {
  return <h2>Payment information</h2>;
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}

function Animator() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Upload" },
    { title: "Animate" },
    { title: "Background" },
    { title: "Add Sound" },
    { title: "Share" },
  ];

  function getSectionComponent(StepForward, StepBackward) {
    switch (activeStep) {
      case 0:
        return <Upload StepForward={StepForward} />;
      case 1:
        return (
          <Animate StepForward={StepForward} StepBackward={StepBackward} />
        );
      case 2:
        return (
          <Background StepForward={StepForward} StepBackward={StepBackward} />
        );
      case 3:
        return <Sound StepForward={StepForward} StepBackward={StepBackward} />;
      case 4:
        return <Share StepBackward={StepBackward} />;
      default:
        return null;
    }
  }

  const StepForward = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const StepBackward = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className={classes["u-toon-box"]}>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        activeColor="#0e2d52"
        activeTitleColor="#0e2d52"
        completeColor="#88d35a"
        completeTitleColor="#88d35a"
        completeBarColor="#88d35a"
        defaultColor="#fed723"
        defaultTitleColor="#fed723"
        defaultBarColor="#fed723"
      />
      <div className={classes["container"]}>
        <div className={classes["u-toon-box-wrap"]}>
          <div className={classes["u-toon-box-row"]} style={{ zIndex: "99" }}>
            {getSectionComponent(StepForward, StepBackward)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Animator;
