import "./App.css";
import { Fragment } from "react";
import HomePage from "./components/Home/Index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Animator from "./components/Animator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Animator' element={<Animator/>} />
      </Routes>
    </Router>
  );
}

export default App;
