import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './Signin'
import Dashboard from './Dashboard'
import Spendings from './Spendings';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Signin}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/spendings' component={Spendings}/>
    </Switch>
  </main>
)

export default Main