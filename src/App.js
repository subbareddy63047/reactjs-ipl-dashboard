import {BrowserRouter, Switch, Route} from 'react-router-dom'

import NotFound from './components/NotFound'
import Home from './components/Home'
import MatchCard from './components/MatchCard'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team-matches/:id" component={MatchCard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
