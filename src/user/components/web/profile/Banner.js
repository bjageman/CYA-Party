import React from 'react'

class UserProfileBanner extends React.Component {
    render() {
        const { user } = this.props
        return (
        <div>
            <img src={user.avatar} alt={user.username}/>
            {user.first_name} {user.last_name} {user.username}
        </div>
        )
    }
}


export default UserProfileBanner
