import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import AppRouter from './router'
import workWithApp from './reducers'


const initialState = window.__INITIAL_STATE__
let appStore = createStore(workWithApp,initialState )


const AppProvider = () => {
  return (
  	<Provider store={appStore}>
    	<AppRouter />
  	</Provider>
	)
}

export default AppProvider