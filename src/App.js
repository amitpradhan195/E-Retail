import React from 'react'
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/register';
import Home from "./Pages/Home";
import adminDash from "./admin/pages/AdminDashboard";
import Restaurant from "./admin/pages/Restuarant";
import FoodCategory from "./admin/pages/FoodCategory";
import Food from "./admin/pages/Food";
import PrivateRoute from './PrivateRoute';
import Cart from './Pages/viewCart';
import Order from "./Pages/viewOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/register' component={Register} />
          <Route path='/home' component={Home} />
          <Route path='/adminDashboard' component={adminDash} />
          <Route path='/restaurant' component={Restaurant} />
          <Route path='/foodCategory' component={FoodCategory} />
          <Route path='/food' component={Food} />
          <PrivateRoute path='/viewCart' component={Cart} />
          <PrivateRoute path='/viewOrder' component={Order} />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
