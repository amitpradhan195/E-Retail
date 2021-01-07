import React from 'react'
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/register';
import Home from "./Pages/Home";
import adminDash from "./admin/pages/AdminDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/register' component={Register} />
          <Route path='/home' component={Home} />
          <Route path='/adminDashboard' component={adminDash} />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
