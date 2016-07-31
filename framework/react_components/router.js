import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import React from 'react'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'


export const Routes = (
  <Route name="app" component={App}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
  </Route>
)

const AppRouter = () => {
  return (<Router history={browserHistory}>
            {Routes}
        </Router>)
}

export default AppRouter