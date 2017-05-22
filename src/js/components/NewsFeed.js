import React from "react";
import ReactDOM from "react-dom"

import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// import injectTapEventPlugin from 'react-tap-event-plugin'

// injectTapEventPlugin()

let cardStyle = {
   //  maxWidth:"100%",
     height:400
}

let cardHeaderStyle = {
   //  maxWidth:"100%",
     height:'30%',
     paddingRight:'0%'
}

let col6 = {
    width: "40%",
    float: "left",
    padding: "15px",
    maxHeight:500,
}

export default class NewsFeed extends React.Component{
   constructor(props)
   {
	   super(props)
   }

   componentWillUnmount() {

   }
   render(){	
       const {news} = this.props
		return (
            <div style={{ margin:"10% 15% 0% 0%"}}>
                &nbsp;
                {news.map((newsItem,index)=>{
                    return <div key={index} style={col6}>
                        <Card style={cardStyle}  >
                            <CardHeader titleStyle={cardHeaderStyle}
                                title={newsItem.title}
                                textStyle={{ paddingRight: '0%' }} />
                            <CardMedia >
                                <img style={{ height: '250px' }} src={newsItem.urlToImage} />
                            </CardMedia>
                        </Card>
                    </div>
               		}
					 )}
			</div>
		);
	}
}
