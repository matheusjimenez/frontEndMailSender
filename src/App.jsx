import { useState } from 'react';
import { AuthProvider } from './context/context';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';

function App() {
  return (
      <div className="App">
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </div>
  )
}

export default App
