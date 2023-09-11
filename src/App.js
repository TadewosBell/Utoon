import "./App.css";
import { Fragment } from "react";
import HomePage from "./components/Home/Index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Animator from "./components/Animator";
import GameSetup from "./components/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Animator' element={<Animator/>} />
        <Route path='/GameSetup' element={<GameSetup/>} />
      </Routes>
    </Router>
  );
}

export default App;