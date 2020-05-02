//Library
import React from 'react';

//Styles
import './styles/main.sass';
import './custom_bootstrap.scss';

//Ts scripts
import someFunc from './configurations';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1 className="">React app</h1>
        <h2>{someFunc('conf is work')}</h2>
        <button className="btn btn-fish">Custom button</button>
      </header>
    </div>
  );
}

export default App;
