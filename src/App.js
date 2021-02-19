import React from 'react'
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/register';
import Home from "./Pages/Home";
import adminDash from "./admin/pages/AdminDashboard";
import Brands from "./admin/pages/Brand";
import Category from "./admin/pages/Category";
import Products from "./admin/pages/Product";
import ViewBrand from "./Pages/BrandProduct";
import ViewProfile from "./Pages/viewProfile";
import PrivateRoute from './PrivateRoute';
import Cart from './Pages/viewCart';
import Order from "./Pages/viewOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Route exact path='/' component={LandingPage} />
          <Route path='/register' component={Register} />
          <Route path='/home' component={Home} />
          <Route path='/adminDashboard' component={adminDash} />
          <Route path='/brands' component={Brands} />
          <Route path='/categories' component={Category} />
          <Route path='/products' component={Products} />
          <Route path='/viewBrand/:id' component={ViewBrand} />
          <Route path='/viewProfile' component={ViewProfile} />
          <PrivateRoute path='/viewCart' component={Cart} />
          <PrivateRoute path='/viewOrder' component={Order} />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
