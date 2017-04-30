import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class Notification extends React.Component {

  constructor(props) {
    super(props);
    
  }


  handleRequestClose = () => {

  };

  render() {

    return (
      <div>
        {/*<Snackbar
          open={this.state.open}
          message={this.props.message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />*/}
        {this.props.message}
      </div>
    );
  }
}