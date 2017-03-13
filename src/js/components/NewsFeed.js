import React from "react";
import ReactDOM from "react-dom"

import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// import injectTapEventPlugin from 'react-tap-event-plugin'

// injectTapEventPlugin()

let cardStyle = {
   //  maxWidth:"100%",
     minHeight:100
}

let cardHeaderStyle = {
   //  maxWidth:"100%",
     maxHeight:10
}

let col6 = {
    width: "40%",
    float: "left",
    padding: "15px",
    maxHeight:300,
}

export default class NewsFeed extends React.Component{
   constructor(props)
   {
	   super(props)
	   const {dispatch,news} = this.props
       console.log(news)
   }

   componentWillUnmount() {

   }
// display:"inline",float:"none",textAlign: "initial",
   render(){	
       const {dispatch,news} = this.props
		return (
            <div style={{ marginLeft:"15%",}}>
                &nbsp;
                {news.map((newsItem,index)=>{
                    return <div key={index} style={col6}>
										<Card  style={cardStyle}  >
											<CardHeader titleStyle={cardHeaderStyle} title={newsItem.title} />
											<CardMedia >
													<img height={250} src={newsItem.urlToImage} />
											</CardMedia>
										</Card>
									</div>
               		}
					 )}
			</div>
		);
	}
}
