import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import Categories from './Components/NewsCategories/Categories';
import Results from './Components/SearchResults/Results';

function App() {
  return (
    <div className="App">
      {/* Helmet Title */}
      <Helmet>
        <title>TheWeeklyExtra - Breaking News | Top Stories</title>
        <meta charset="utf-8" />
        <meta
          name="description"
          content="The one stop shop in all things news. Aggregates from many of the major news sites"
        />
      </Helmet>

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
            {/* search route */}
            <Route exact path="/search" component={Results} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
