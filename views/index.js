import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import AppProvider from './app/appProvider'
render(
  <AppProvider />,
  document.getElementById('site')
)