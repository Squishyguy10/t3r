import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SupermarketHub from './components/SupermarketHub';
import RecyclingHub from './components/RecyclingHub';
import Login from './components/Login';
import BottomBar from './components/BottomBar'
import SupermarketSignup from './components/SupermarketSignup';
import CustomerSignup from './components/CustomerSignup';
import Map from './components/Map';
import SupermarketCatalogue from './components/SupermarketCatalogue';
import AccountPortalSupermarket from './components/AccountPortalSupermarket';
import AccountPortalCustomer from './components/AccountPortalCustomer';
import CustomerCatalogue from './components/CustomerCatalogue';
import AddItems from './components/AddItems';
import PostPurchase from './components/PostPurchase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className='bg-green-100'>
      
      <NavBar />

      <Router>
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <Route exact path='/supermarket-hub'>
            <SupermarketHub />
          </Route>

          <Route exact path='/recycling-hub'>
            <RecyclingHub />
          </Route>

          <Route exact path='/login/supermarket'>
            <Login user='supermarket' />
          </Route>

          <Route exact path='/login/customer'>
            <Login user='customer' />
          </Route>

          <Route exact path='/signup/supermarket'>
            <SupermarketSignup />
          </Route>

          <Route exact path='/signup/customer'>
            <CustomerSignup />
          </Route>

          <Route exact path='/map'>
            <Map />
          </Route>

          <Route exact path='/catalogue/supermarket'>
            <SupermarketCatalogue />
          </Route>

          <Route exact path='/catalogue/customer'>
            <CustomerCatalogue />
          </Route>

          <Route exact path='/portal/supermarket'>
            <AccountPortalSupermarket />
          </Route>

          <Route exact path='/portal/customer'>
            <AccountPortalCustomer />
          </Route>

          <Route exact path='/add-item'>
            <AddItems />
          </Route>

          <Route exact path='/post-purchase'>
            <PostPurchase />
          </Route>

        </Switch>
      </Router>

      <BottomBar />
    </div>
  );
}

export default App;
