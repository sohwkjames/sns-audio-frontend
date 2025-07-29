import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/health`)
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(err => setStatus('Error'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Backend health: {status}</p>
      </header>
    </div>
  );
}

export default App;
