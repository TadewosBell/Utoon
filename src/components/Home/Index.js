import Nav from "./Nav";
import Hero from "./Hero";
import { Fragment } from "react";
import Panels from "./Panels";
import Description from "./Description";
import Instruction from "./Instruction";
import Footer from "./Footer";


function HomePage() {
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