import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Button from './components/Button';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      
      <NavBar />

      <Router>
        <Switch>

          <Route exact path='/'>
            <Main />
            <Button textcolor='black' color='purple'>
              Test
            </Button>
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
