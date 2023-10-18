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
import GameSelection from "./components/Game/GameSelection";
import CharacterSelection from "./components/Game/CharacterSelection";
import Game from "./components/Game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Animator' element={<Animator/>} />
        <Route path='/GameSetup' element={<GameSetup/>} />
        {/* <Route path='/GameSelection' element={<GameSelection/>} /> */}
        {/* <Route path='/CharacterSelection' element={<CharacterSelection/>} /> */}
        <Route path='/Game' element={<Game/>} />
      </Routes>
    </Router>
  );
}

export default App;