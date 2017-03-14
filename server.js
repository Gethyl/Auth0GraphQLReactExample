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

const secureAuthenticate = jwt({
  secret: AUTH_SECRET,
  audience: AUTH_CLIENT_ID
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/api/nonsecure/newsfeed',  (req, res) => {
    fetch(`http://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=`+apiKey)
                 .then(res => res.json())
                 .then(json => {
                  //  console.log(json)
                //    res.send(json)
                   res.json(json)
                  })
                 .catch(err => res.send(err))
    
})

app.get('/api/secure/newsfeed', secureAuthenticate, (req, res) => {
    fetch(`http://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=`+apiKey)
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

app.use('/graphql-secure',secureAuthenticate, graphqlHTTP (req => ({
	schema
	,graphiql:true
})))

app.listen(3000,()=> {console.log("+++Express Server is Running on port 3000!!!")})