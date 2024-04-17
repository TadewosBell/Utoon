import { useDispatch, useSelector } from "react-redux";
// import react router
import { useNavigate } from "react-router-dom";
import './GenerateSprite.css'
import ProgressBar from "@ramonak/react-progress-bar";
import { GenerationQueue } from './classes/GenerationQueue'; 
import React, { useState, useEffect } from 'react';

import { setRunningSpritesheetUrl, setJumpSpritesheetUrl, setIdleSpritesheetUrl, setPainSpritesheetUrl } from "../../redux/GameStore";

const CustomModal = ({ steps, history }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const { with_background_url, drawingID, backgroundUrl,  } = useSelector((state) => state.image);
    const [queue, setQueue] = useState(null);

    const incrementProgress = async () => {
        if (currentStep < steps.length) {
            // Start the appropriate generation function based on the current step
            switch (currentStep) {
            case 0:
                const running_spritesheet_url = await queue.generateSprite("Running");
                dispatch(setRunningSpritesheetUrl(running_spritesheet_url));
                break;
            case 1:
                const jump_spritesheet_url =  await queue.generateSprite("Game_Jump");
                dispatch(setJumpSpritesheetUrl(jump_spritesheet_url));
                break;
            case 2:
                const idle_spritesheet_url =  await queue.generateSprite("Idle");
                dispatch(setIdleSpritesheetUrl(idle_spritesheet_url));
                break;
            // Add more cases for additional steps/animations if needed
            case 3:
                const pain_spritesheet_url =  await queue.generateSprite("Pain");
                dispatch(setPainSpritesheetUrl(pain_spritesheet_url));
                break;
            default:
                break;
            }
            const progress = ((currentStep + 1) / steps.length) * 100
            // round to 0 decimal places
            setProgress(Math.round(progress));
            setCurrentStep(currentStep + 1);
        } else {
            // All steps are completed
            if (!isDone) {
                // route to /Game
                setIsDone(true);
                // route should be GameSelection with query param of drawingID
                let url = `GameSelection?drawingID=${drawingID}`;
                navigate(`/${url}`);
            
                
            }
        }
        console.log("incrementProgress");
    };

    const start_sprite_generation = async () => {
        
        await incrementProgress();

    };

    useEffect(() => {
        if(queue)start_sprite_generation();
    }, [queue]);


    useEffect(() => {
        const queue = new GenerationQueue(drawingID);
        setQueue(queue);
    }, [currentStep, steps, drawingID, isDone]);

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
        'Generating Idle animation',
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