import Instructions from "./Instructions";
import classes from "./Animator.module.css";

const Animations = () => {
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

const Animate = (props) => {
    const { StepForward, StepBackward } = props;

    const instructions = {
        Title: "Animate",
        PreText: "Select an animation and watch your character come to life!",
    }
    return (
        <Instructions instructions={instructions}>
            <Animations />
            <button onClick={StepForward}>Next</button>
            <button onClick={StepBackward}>Back</button>
        </Instructions>
    );
}

export default Animate;