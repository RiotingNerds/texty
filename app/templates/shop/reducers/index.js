import TopNavReducer from '../topNav/topNavReducer' 
import SearchFormReducer from '../home/SearchFormReducer'
import StepsReducer from '../home/StepsReducer';
import ListingPageReducer from '../listingPage/ListingPageReducer';
import ProductSingleReducer from '../product-single/ProductSingleReducer';
import NewsletterReducer from '../footer/NewsletterReducer';
import { combineReducers } from 'redux'

const workWithApp = combineReducers({
  TopNavReducer,
  SearchFormReducer,
  StepsReducer,
  ListingPageReducer,
  ProductSingleReducer,
  NewsletterReducer
})

export default workWithApp