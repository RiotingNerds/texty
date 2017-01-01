import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import React from 'react'
import App from './App'
import Home from '../home/Home'
import ListingPage from '../listingPage/ListingPage'
import ProductSingle from '../product-single/ProductSingle'

export const Routes = (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories" component={ListingPage}>
      <Route path=":mainCat" component={ListingPage} />
      <Route path=":mainCat/:subCat" component={ListingPage} />
      <Route path=":mainCat/:subCat/:subSubCat" component={ListingPage} />
    </Route>
    <Route name="brand" path="/:brand" component={ListingPage} />
    <Route name="product" path="/:brand/:product" component={ProductSingle} />
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