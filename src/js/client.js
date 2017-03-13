import React from "react";
import ReactDOM from "react-dom";
import {Router, hashHistory} from "react-router"
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers/reducer'

import makeMainRoutes from "./route"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const routes = makeMainRoutes()
const store = createStore(reducer, applyMiddleware(thunk))
const app = document.getElementById('app')

ReactDOM.render(
		<Provider store={store}>
			<MuiThemeProvider>
				<Router history={hashHistory} routes={routes}/>				
			</MuiThemeProvider>
		</Provider>
			, app)