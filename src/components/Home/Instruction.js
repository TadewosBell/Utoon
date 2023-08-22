import React from "react";
import classes from "./Instruction.module.css";
import DrawInstructionImage from "../../assets/Draw instruction 3.png";
import Background1Image from "../../assets/Background 1.png";
import WhaleAnimateImage from "../../assets/whale animate 1.png";
import VoiceOver1Image from "../../assets/voiceover 1.png";
import Send1Image from "../../assets/send 1.png";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const instructionSteps = [
  {
    image: DrawInstructionImage,
    title: "Draw",
    description: "Draw your favorite character or anything you want to animate",
  },
  {
    image: WhaleAnimateImage,
    title: "Animate",
    description: "Upload your creation and watch them come to life.",
  },
  {
    image: Background1Image,
    title: "Edit",
    description: "Add backgrounds and text to make it special.",
  },
  // {
  //   image: VoiceOver1Image,
  //   title: "Add Voices",
  //   description: "Record voice overs, music or sound effects.",
  // },
  {
    image: Send1Image,
    title: "Share",
    description: "Share your creation with your loved once. ",
  },
];
const Instruction = () => {
  return (
    <div className={classes["work-sec"]} id="howthisworks">
      <div className={classes["container"]}>
        <div className={classes["work-inner-title"]}>
          <h2 className={`${classes["work-title"]} w-[100%] text-center`}>
            How It works
          </h2>
        </div>
        <div
          className={`${classes["work-row"]} flex lg:px-20 w-[100%] md:items-center`}
        >
          {instructionSteps.map((step) => {
            return (
              <div className={classes["work-col"]}>
                <div class="max-w-sm bg-white border rounded-lg shadow dark:bg-[#F4E0B9] dark:border-[#FAD723]">
                  <div className="flex justify-center">
                    <img src={step.image} alt="" />
                  </div>
                  <div class="p-5">
                    <a href="#">
                      <h5 className={classes["work-title-box"]}>
                        {step.title}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-black text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={`${classes["work-create-btn"]} w-[110%] text-center`}>
          <Link to="/Animator">
          <Button classes={classes["work-memory-btn"]} type="submit">
            Create
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
