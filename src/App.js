import {Switch, Route} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import About from './components/About'
import StateDetails from './components/StateDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/states/:stateCode" component={StateDetails} />
  </Switch>
)

export default App
