import fetch from "node-fetch"
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import apiKey from "../newsapi.config"

function fetchNews(){
   return fetch(`http://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=`+apiKey)
                 .then(res => res.json())
                 .then(json => {
                  //  console.log(json)
                   return json
                  })
                 .catch(err => console.log(err))
}

var article = new GraphQLObjectType({
  name: 'article',
  description: 'Each news article',
  fields: () => ({
    title: {
      type: (GraphQLString),
      description: 'Title',
    },
    description: {
      type: (GraphQLString),
      description: 'Description',
    },
    urlToImage: {
      type: (GraphQLString),
      description: 'url for image',
    },
  })
})

var news = new GraphQLObjectType({
  name: 'news',
  description: 'Top news',
  fields: () => ({
    status: {
      type: (GraphQLString),
      description: 'Status',
    },
    source: {
      type: (GraphQLString),
      description: 'Source of the new-feed',
    },
    articles: {
      type: new GraphQLList(article),
      description: 'Articles List '
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      news: {
          type: news,
          resolve: (root,args,context) => {
            return fetchNews()
          }
        }
    }
  })
  
});

export default schema;