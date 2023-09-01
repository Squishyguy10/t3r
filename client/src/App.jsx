import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      
      <Navbar />

      <Router>
        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
