import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'

import './App.css'
import Home from './components/Home'
import About from './components/About'
import StateDetails from './components/StateDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/states/:stateCode" component={StateDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
