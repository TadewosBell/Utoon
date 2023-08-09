import "./App.css";
import Nav from "./components/Home/Nav";
import Hero from "./components/Home/Hero";
import { Fragment } from "react";
// import Panels from "./components/Home/Panels";
import Description from "./components/Home/Description";
import Instruction from "./components/Home/Instruction";
import Footer from "./components/Home/Footer";

function App() {
  return (
    <Fragment>
      <Nav />
      <Hero />
      <section className="home-center-box">
        <Description />
        <Instruction />
      </section>
      <Footer />
    </Fragment>
  );
}

export default App;
