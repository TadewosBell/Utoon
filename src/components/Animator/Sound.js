import classes from "./Animator.module.css";
import Instructions from "./Instructions";

const Sounds = () => {
    return (
        <div>
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

const Sound = (props) => {
    const { StepForward, StepBackward } = props;

    const instructions = {
        Title: "Sound",
        PreText: "Record a sound or select a sound from the library",
    };
    return (
        <div>
            <Instructions instructions={instructions}>
                <Sounds />
            </Instructions>
            <button onClick={StepForward}>Next</button>
            <button onClick={StepBackward}>Back</button>
        </div>
    );
}

export default Sound;