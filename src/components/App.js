import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Home from './Home/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Grid>
          <Switch>
            <Route exact name="home" component={Home}/>
          </Switch>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
