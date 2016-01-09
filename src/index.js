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
import { Router, Route, IndexRoute, Link } from 'react-router'
import store from './store'
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Provider } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import Parse from 'parse'

Parse.initialize("oPNuENwQtcw2ZRB7Z8197Q8IFZNmGVdmGBfVxkl4", "JdduHMvuKGaxr46csy5IjaPkncSfKwAyV9IWNEio")

const history = createHistory()

syncReduxAndRouter(history, store)

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
          <Route path="/question" component={AskQuestion} />
          <Route path="/question/:id" component={LearningRoom} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Router>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  </Provider>
), document.getElementById('root'))
