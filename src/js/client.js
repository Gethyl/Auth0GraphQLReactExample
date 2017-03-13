import React from "react";
import ReactDOM from "react-dom";
import {Router, hashHistory} from "react-router"

import makeMainRoutes from "./route"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const routes = makeMainRoutes()


const app = document.getElementById('app')

ReactDOM.render(
			<MuiThemeProvider>
				<Router history={hashHistory} routes={routes}/>				
			</MuiThemeProvider>
			, app)