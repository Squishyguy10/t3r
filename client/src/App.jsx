import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SupermarketHub from './components/SupermarketHub';
import Login from './components/Login';
import BottomBar from './components/BottomBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      
      <NavBar />

      <Router>
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <Route exact path='/supermarket-hub'>
            <SupermarketHub />
          </Route>

          <Route exact path='/login/supermarket'>
            <Login user='supermarket' />
          </Route>

          <Route exact path='/login/customer'>
            <Login user='customer' />
          </Route>

        </Switch>
      </Router>

      <BottomBar />
    </div>
  );
}

export default App;
