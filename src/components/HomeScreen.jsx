
import React, { useState } from 'react';
import GameScreen from './GameScreen';
import './HomeScreen.css'; 
import gicon from '../assets/icons/rock-paper-scissors.png'; 

const App = () => {
  const [mode, setMode] = useState(null); 

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode(null);
  };

  return (
    <div className="container">
      {!mode ? (
        <div className="mode">
          <h1>Stone Paper Scissors</h1>
          <img src={gicon} alt="rock-paper-scissors" />
          <p>Lets enjoy together</p>
          <div className="btn">
          <button onClick={() => handleModeSelect('single')}> Play with Computer</button>
          <button  onClick={() => handleModeSelect('multi')}>Play with Friend</button>
          </div>
          
        </div>
      ) : (
        <GameScreen mode={mode} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
