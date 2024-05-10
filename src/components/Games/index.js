// rander excalibur game in react component 
import { useState } from "react";
import Stepper from "react-stepper-horizontal";
import Upload from "../Animator/UploadDrawing";
import EditBoundingBox from "../Animator/EditBoundingBox";
import EditMask from "../Animator/EditMask";
import EditSkeleton from "../Animator/EditSkeleton";
import classes from "../Animator/index.module.css";
import Footer from "../Animator/Footer";
import GenerateSprites from "./GenerateSprites";


const GameSetup = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
      { title: "Upload" },
      { title: "Bounding Box"},
      { title: "Mask" },
      // { title: "Skeleton"},
      { title: "Play!"}
    ];
  
    function getSectionComponent(StepForward, StepBackward) {
      switch (activeStep) {
        case 0:
          return <Upload StepForward={StepForward} />;
        case 1:
          return (
            <EditBoundingBox StepForward={StepForward} StepBackward={StepBackward} />
          );
        case 2:
          return (
            <EditMask StepForward={StepForward} StepBackward={StepBackward} Game={true} />
          );
        // case 3:
        //   return (
        //     <EditSkeleton StepForward={StepForward} StepBackward={StepBackward} Game={true} />
        //   );
        case 3:
            return (
                <GenerateSprites />
            );
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
        <div
          className={classes["stepper"]}
        >
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
        </div>
        <div className={classes["container"]}>
          <div className={classes["u-toon-box-wrap"]}>
            <div className={classes["u-toon-box-row"]} style={{ zIndex: "99" }}>
              {getSectionComponent(StepForward, StepBackward)}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
};
export default GameSetup;