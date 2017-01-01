import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import thunk from 'redux-thunk';
import AppRouter from './router'
import texty from '../reducers'


const initialState = JSON.parse(decodeURIComponent(window.__INITIAL_STATE__))

let appStore = createStore(texty,initialState,applyMiddleware(thunk))


const AppProvider = () => {
  return (
  	<Provider store={appStore}>
    	<AppRouter />
  	</Provider>
	)
}

export default AppProvider