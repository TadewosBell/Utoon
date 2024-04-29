import "./App.css";
import { Fragment } from "react";
import HomePage from "./components/Home/Index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Animator from "./components/Animator";
import GameSetup from "./components/Games";
import GenerarateSprite from "./components/GenerateSprite"
import GameSelection from "./components/Games/GameSelection";
import CharacterSelection from "./components/Games/CharacterSelection";
import Game from "./components/Games/Platformer";
// import JumperGame from "./components/Games/Jumper"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Animator' element={<Animator/>} />
        <Route path='/GameSetup' element={<GameSetup/>} />
        <Route path='/GameSelection' element={<GameSelection/>} />
        {/* <Route path='/CharacterSelection' element={<CharacterSelection/>} /> */}
        <Route path='/SpaceAdventure' element={<Game/>} />
        {/* <Route path='/JumperGame' element={<JumperGame/>} /> */}
        <Route path='/GenerateSprite' element={<GenerarateSprite/>} />
      </Routes>
    </Router>
  );
}

export default App;