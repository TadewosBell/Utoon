import React from "react";
import classes from "./Instruction.module.css";
import DrawInstructionImage from "../../assets/Draw instruction 3.png";
import Background1Image from "../../assets/Background 1.png";
import WhaleAnimateImage from "../../assets/whale animate 1.png";
import VoiceOver1Image from "../../assets/voiceover 1.png";
import Send1Image from "../../assets/send 1.png";
import Button from "../UI/Button";

const Instruction = () => {
  return (
    <div className={classes["work-sec"]}>
      <div className={classes["container"]}>
        <div className={classes["work-inner-title"]}>
          <h2 className={classes["work-title"]}>How It works</h2>
        </div>
        <div className={classes["work-row"]}>
          <div className={classes["work-col"]}>
            <div className={classes["work-col-inner"]}>
              <img src={DrawInstructionImage} alt="Create" />
              <h2 className={classes["work-title-box"]}>Create</h2>
              <p className={classes["work-content"]}>
                Draw character together, or select one of ours.
              </p>
            </div>
          </div>
          <div className={classes["work-col"]}>
            <div className={classes["work-col-inner"]}>
              <img src={WhaleAnimateImage} alt="Animate" />
              <h2 className={classes["work-title-box"]}>Animate</h2>
              <p className={classes["work-content"]}>
                Upload your creation and watch them come to life.
              </p>
            </div>
          </div>
          <div className={classes["work-col"]}>
            <div className={classes["work-col-inner"]}>
              <img src={Background1Image} alt="Edit" />
              <h2 className={classes["work-title-box"]}>Edit </h2>
              <p className={classes["work-content"]}>
                Add backgrounds and text to make it special.
              </p>
            </div>
          </div>
          <div className={classes["work-col"]}>
            <div className={classes["work-col-inner"]}>
              <img src={VoiceOver1Image} alt="Add Voices" />
              <h2 className={classes["work-title-box"]}>Add Voices</h2>
              <p className={classes["work-content"]}>
                Record voice overs, music or sound effects.
              </p>
            </div>
          </div>
          <div className={classes["work-col"]}>
            <div className={classes["work-col-inner"]}>
              <img src={Send1Image} alt="Share" />
              <h2 className={classes["work-title-box"]}>Share</h2>
              <p className={classes["work-content"]}>
                Share your creation with your loved once.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className={classes["work-create-btn"]}>
          {/* <a href="#" className={classes["work-memory-btn"]}>
            Create a memory
          </a> */}
          <Button classes={classes["work-memory-btn"]} type="submit">
            Create a memory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
