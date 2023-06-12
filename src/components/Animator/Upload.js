
import classes from "./Animator.module.css";
import Instruction from "./Instructions";


const Characters = () => {
    return (
        <div>
            <h2>Characters</h2>
            <div className={classes["outer-grid"]}>
            <div className={classes["inner-grid"]}>
            <img src="https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </div>
            <div className={classes["inner-grid"]}>
            <img src="https://images.pexels.com/photos/3805102/pexels-photo-3805102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/3805102/pexels-photo-3805102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/3805102/pexels-photo-3805102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </div>
            <div className={classes["inner-grid"]}>
            <img src="https://images.pexels.com/photos/3863778/pexels-photo-3863778.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/3863778/pexels-photo-3863778.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <img src="https://images.pexels.com/photos/3863778/pexels-photo-3863778.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </div>
            </div>
        </div>
    );
}

// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const  Upload = (props) => {
    const { StepForward } = props;
    const instructions = {
        Title: "Upload a character/Pick one",
        PreText: "Upload drawing of ONE humanlike character. Make sure to not make the arms and legs overlap in the drawing.",
        Directions: [
            "Draw your character on a white background, like a piece of paper or white board. Make sure the background is as clean and smooth as possible.",
            "Make sure to take the picture of your drawing in a well lit area, and hold the camera further away to minimize shadows.",
            "Keep any identifiable of personal information out of the picture."
        ]
    }
    return (
        <div>
            <Instruction instructions={instructions}>
                <Characters/>
            </Instruction>
            <button onClick={StepForward}>Next</button>
        </div>

    );
}

export default Upload;