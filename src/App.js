import React from 'react';
import './App.css';
import './assets/floating-labels.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import Index from './components/Index'
import Quiz from './components/Quiz'
import Results from './components/Results'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/question/:id" component={Quiz} />
        <Route path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
