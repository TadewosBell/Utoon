
import { Fragment } from "react";
import classes from "./Instructions.module.css";

// component with one one side showing directions and the other side showing an image of the character
// on the bottom there is a coursel of images of different characters

const  Instructions = (props) => {
    const { Title, PreText, Directions } = props.instructions;
    return (
        <Fragment>
           <div className={classes["card"]}>
            <div className={classes["container"]}>
                <h2 class={classes['Title']}><b>{Title}</b></h2> 
                <p>{PreText}</p> 
                {Directions && <h4>Directions</h4>}
                {
                    Directions?.map((direction, index) => {
                        return <p key={index}>{direction}</p>
                    })
                }
            </div>
            <div>
                {props.children}
            </div>
            </div>
        </Fragment>
    );
}

export default Instructions;