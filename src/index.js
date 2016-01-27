import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { LoginContainer } from './containers/LoginContainer'
import { Signup } from './components/Signup'
import { AskQuestion } from './components/AskQuestion'
import { NoMatch } from './components/NoMatch'
import { LearningRoom } from './components/LearningRoom'
import { GiveHelp } from './components/GiveHelp'
import { WantToHelp } from './components/WantToHelp'
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

// Redirects user if not tutor
function requireAuth(nextState, replace) {
  if (!store.getState().auth.user.tutor) {
    replace(null, '/denied')
  }
}

render((
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/user" component={LoginContainer} >
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>
        <Route path="/app" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="/ask" component={AskQuestion} />
          <Route path="/help" component={GiveHelp} onEnter={requireAuth}/>
          <Route path="/denied" component={WantToHelp}/>
          <Route path="/question/:id" component={LearningRoom} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Router>
      { debugPanel }
    </div>
  </Provider>
), document.getElementById('root'))
