import Nav from "./Nav";
import Hero from "./Hero";
import { Fragment, useEffect } from "react";
import Panels from "./Panels";
import Description from "./Description";
import Instruction from "./Instruction";
import Footer from "./Footer";
import { wake_up_backend } from "../../Utility/Api";


function HomePage() {

    useEffect(() => {
        wake_up_backend({}, (res) => {
            // check if response status is 200
            if(res.status === 200){
                console.log("Backend is awake");
            } 
            else {
                console.log("Backend is not awake");
            }
        })
    }, [])
    return (
        <Fragment>
        <Nav />
        <Hero />
        <Panels />
        <section className="home-center-box">
            <Description />
            <Instruction />
        </section>
        <Footer />
        </Fragment>
    );
}

export default HomePage;