import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Meeting from './components/Meeting';


function App() {
  return (
    <Switch>
      <Route path='/meeting/:id' component={Meeting}/>
      <Route exact path='/' component={Home}/>
    </Switch>
  );
};



export default App;



