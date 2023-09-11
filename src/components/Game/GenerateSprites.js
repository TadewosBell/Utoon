import { useDispatch, useSelector } from "react-redux";
import './GenerateSprite.css'
import ProgressBar from "@ramonak/react-progress-bar";
import { GenerationQueue } from './GenerationQueue'; 
import React, { useState, useEffect } from 'react';

const CustomModal = ({ steps, charId }) => {
  const [progress, setProgress] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const queue = new GenerationQueue(charId);

    const incrementProgress = async () => {
      if (currentStep < steps.length) {
        // Start the appropriate generation function based on the current step
        switch (currentStep) {
          case 0:
            await queue.generateRunningSprite();
            break;
          case 1:
            await queue.generateJumpingSprite();
            break;
          case 2:
            await queue.generateIdleSprite();
            break;
          // Add more cases for additional steps/animations if needed

          default:
            break;
        }

        setProgress(((currentStep + 1) / steps.length) * 100);
        setCurrentStep(currentStep + 1);
      } else {
        // All steps are completed
        if (!isDone) {
          setTimeout(() => {
            setIsDone(true);
          }, 1000);
        }
      }
    };

    incrementProgress();
  }, [currentStep, steps, charId, isDone]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="genrateSpriteTitle">Give us a moment so we can bring your character to life.</h2>
        <div className="progressbar-container">
            <ProgressBar 
            completed={progress} 
            maxCompleted={100}
            className="wrapper"
            />
            {currentStep < steps.length && (
            <p classname="currentStepDescription">{steps[currentStep]}</p>
            )}
        </div>
      </div>
    </div>
  );
};


const GenerateSprites = (props) => {
    const steps = [
        'Generating running animation',
        'Generating Jumping animation',
        'Generating background',
        'Finalizing game',
    ];
  return (
    <div style={{
        width: '100%',
        minHeight: '60vh',
    }}>
        <CustomModal steps={steps} />
    </div>
  );
};

export default GenerateSprites;