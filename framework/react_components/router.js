import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import React from 'react'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'


export const Routes = (
  <Route name="app" path="/admin" component={App}>
    <Route path="/post" component={Home} />
    <Route path="/" component={Login} />
  </Route>
)

const AppRouter = () => {
  return (
    <Router history={browserHistory}>
      {Routes}
    </Router>
  )
}

export default AppRouter