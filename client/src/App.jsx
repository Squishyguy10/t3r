import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
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

        </Switch>
      </Router>

    </div>
  );
}

export default App;
