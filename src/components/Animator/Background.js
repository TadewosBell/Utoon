import classes from "./Animator.module.css"
import Instructions from "./Instructions";


const Backgrounds = () => {
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

const Background = (props) => {
    const { StepForward, StepBackward } = props;

    const instructions = {
        Title: "Background",
        PreText: "Select a background to set the scene",
    };


    return(
        <div>
        <Instructions instructions={instructions}>
            <Backgrounds />
        </Instructions>
        <button onClick={StepForward}>Next</button>
            <button onClick={StepBackward}>Back</button>
        </div>
    );
}

export default Background;