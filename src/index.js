import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Login } from './components/Login'
import { LoginContainer } from './containers/LoginContainer'
import { Signup } from './components/Signup'
import { AskQuestion } from './components/AskQuestion'
import { NoMatch } from './components/NoMatch'
import { LearningRoom } from './components/LearningRoom'
import { GiveHelp } from './components/GiveHelp'
import { WantToHelp } from './components/WantToHelp'
import { Profile } from './components/Profile'
import { Admin } from './components/Admin'
import { About } from './components/About'
import { Router, Route, IndexRoute, Link } from 'react-router'
import store from './store'
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Provider } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

const history = createHistory()

syncReduxAndRouter(history, store)

let debugPanel = null
if (process.env.NODE_ENV !== 'production') {
  debugPanel = (
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  )
}

render((
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/user" component={LoginContainer} >
          <Route path="/(:org/)login" component={Login} />
          <Route path="/(:org/)signup" component={Signup} />
        </Route>
        <Route path="/app" component={App}>
          <Route path="/:org/ask" component={AskQuestion} />
          <Route path="/:org/help" component={GiveHelp}/>
          <Route path="/:org/denied" component={WantToHelp}/>
          <Route path="/:org/question/:id" component={LearningRoom} />
          <Route path="/:org/user/:username" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Router>
      {debugPanel}
    </div>
  </Provider>
), document.getElementById('root'))
