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

const Iframe = (props) =>{
  return <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <iframe src="/index" title="quizOne" frameBorder="0" width="100%" height="650px"></iframe>
      </div>
      <div className="col-md-6">
        <iframe src="/index" title="quizTwo" frameBorder="0" width="100%" height="650px"></iframe>
      </div>
    </div>
  </div>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Iframe} />
        <Route path="/index" component={Index} />
        <Route path="/question/:id" component={Quiz} />
        <Route path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
