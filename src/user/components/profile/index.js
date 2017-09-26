import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

class UserProfile extends React.Component {
    render() {
        const user = this.props.user
        if (user) {
            return (
            <div>
                <h1>{user.name}</h1>
            </div>
            )
        }else{
            return (
                <h1>Please Login</h1>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
