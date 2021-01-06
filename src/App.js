import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/register'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/register' component={Register} />
      </Router>
    </div>
  );
}

export default App;
