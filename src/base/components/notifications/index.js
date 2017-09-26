import React, { Component } from 'react';
//redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import Notification from './NotificationBar'


class Notifications extends Component {

  render() {
      const error = this.props.response.error
      const success = this.props.response.success
      return (
          <div>
            <Notification open={error ? true: false} message={error} />
            <Notification open={success ? true: false} message={success} />
          </div>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
