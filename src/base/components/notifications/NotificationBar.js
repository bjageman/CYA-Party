import React, { Component } from 'react';
//redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Snackbar } from 'bjageman-react-toolkit';

class ErrorNotification extends Component {
  handleRequestClose = () => {
    this.props.clear()
  };

  render() {
    return (
        <Snackbar
          open={this.props.open}
          onRequestClose={this.handleRequestClose} >
            <span id="message-id">{this.props.message}</span>
        </Snackbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);
