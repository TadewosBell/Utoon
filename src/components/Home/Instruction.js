import React from "react";
import classes from "./Instruction.module.css";
import DrawInstructionImage from "../../assets/Draw instruction 3.png";
import WhaleAnimateImage from "../../assets/Animations/astro_dab.gif";
import Send1Image from "../../assets/send 1.png";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const instructionSteps = [
  {
    image: DrawInstructionImage,
    title: "Color",
    description: "Color each character or draw anything you want to animate",
  },
  {
    image: WhaleAnimateImage,
    title: "Animate",
    description: "Upload your creation and watch them come to life.",
  },
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
                <div className="max-w-sm bg-white border rounded-lg shadow dark:bg-[#F4E0B9] dark:border-[#FAD723]">
                  <div className="flex justify-center">
                    <img src={step.image} alt="" />
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className={classes["work-title-box"]}>
                        {step.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-black text-center">
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
            Animate
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
