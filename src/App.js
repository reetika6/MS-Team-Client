import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
//import Call from './components/Call';
import Meeting from './components/Meeting';


function App() {
  return (
    <Switch>
      <Route path='/meeting/:id' component={Meeting}/>
      {/*<Route exact path='/call' component={Call}/>*/}
      <Route exact path='/' component={Home}/>
    </Switch>
  );
};



export default App;



