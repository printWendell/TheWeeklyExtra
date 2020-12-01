import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import Categories from './Components/NewsCategories/Categories';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/business"
              component={() => <Categories category={'business'} />}
            />
            <Route
              exact
              path="/health"
              component={() => <Categories category={'health'} />}
            />
            <Route
              exact
              path="/science"
              component={() => <Categories category={'science'} />}
            />
            <Route
              path="/sports"
              component={() => <Categories category={'sports'} />}
            />
            <Route
              exact
              path="/entertainment"
              component={() => <Categories category={'entertainment'} />}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
