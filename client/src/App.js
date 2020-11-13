import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
