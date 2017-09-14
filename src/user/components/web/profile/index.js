import React from 'react'

import Banner from './Banner'

class UserProfile extends React.Component {
    render() {
        const params = this.props.match.params
        const user = params.userId
        return (
        <div>
            <Banner user={user} />
        </div>
        )
    }
}

export default UserProfile
