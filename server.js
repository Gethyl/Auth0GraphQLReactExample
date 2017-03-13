import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
// import session from "express-session"
// import cookieParser from "cookie-parser"
import jwt from "express-jwt"

import fetch from "node-fetch"
import apiKey from "./newsapi.config"
import {AUTH_CLIENT_ID,AUTH_SECRET} from "./auth.config"

import {graphql} from 'graphql'
import graphqlHTTP from 'express-graphql';
import { graphqlExpress } from 'graphql-server-express'
import schema from './graphql/Schema'

const app = express();

// app.use(cookieParser());
// app.use(session({
//   secret: 'shhhhhhh',
//   saveUninitialized: true,
//   resave: true,
// //   store: new MongoStore({ mongooseConnection: db })
// }))

const secureAuthenticate = jwt({
  secret: AUTH_SECRET,
  audience: AUTH_CLIENT_ID
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// middleware to use for all requests
// app.use((req, res, next) => {
// 	// Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     console.log('+++Gethyl entering the middleware');
//     next(); // make sure we go to the next routes and don't stop here
// })

app.get('/api/nonsecure/newsfeed',  (req, res) => {
    fetch(`http://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=`+apiKey)
                 .then(res => res.json())
                 .then(json => {
                  //  console.log(json)
                //    res.send(json)
                   res.json(json)
                  })
                 .catch(err => res.send(err))
    
})

app.get('/api/secure/newsfeed', secureAuthenticate, (req, res) => {
    fetch(`http://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=`+apiKey)
                 .then(res => res.json())
                 .then(json => {
                  //  console.log(json)
                //    res.send(json)
                   res.json(json)
                  })
                 .catch(err => res.send(err))
    
})

app.use('/graphql', graphqlHTTP (req => ({
	schema
	,graphiql:true
})))

app.listen(3000,()=> {console.log("+++Express Server is Running!!!")})