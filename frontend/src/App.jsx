import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [dbStatus, setDbStatus] = useState('Checking...');

  useEffect(() => {
    // Backend health check
    fetch('http://localhost:5000/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch((err) => setMessage('Backend not reachable'));

    // Backend database test
    fetch('http://localhost:5000/db-test')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDbStatus(`Connected — ${data.time.now}`);
        } else {
          setDbStatus('DB connection failed');
        }
      })
      .catch((err) => setDbStatus('DB not reachable'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>DevOps 3-Tier App</h1>
      <p><strong>Backend Status:</strong> {message}</p>
      <p><strong>Database Status:</strong> {dbStatus}</p>
    </div>
  );
}

export default App;