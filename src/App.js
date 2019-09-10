import React, { useState } from 'react';

import Counter from './components/Counter';
import logo from './logo.svg';
import './App.css';

function App() {
  const [type, setType] = useState('simple');
  function onSimple() {
    setType('simple');
  }
  function onAdvance() {
    setType('advance');
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: 'flex' }}>
          <button onClick={onSimple}>Simple</button>
          <button onClick={onAdvance}>Advance</button>
        </div>
        <Counter isAdvance={type === 'advance'} />
      </header>
    </div>
  );
}

export default App;
