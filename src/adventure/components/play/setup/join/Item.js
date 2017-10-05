import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { ListItem, Button } from 'bjageman-react-toolkit'

class JoinItem extends React.Component {
    joinSession = () => {
        this.props.joinSession({
            session_id: this.props.item.id,
            access_token: this.props.user.access_token,
        })
    }

    render() {
        const item = this.props.item
        const story = item.story || null
        return(
            <ListItem>
            { item && story ?
                <div>
                    <Button onClick={this.joinSession}>
                    {item.story.name} - Players: {item.players.length}
                    </Button>
                </div>
            : null }
            </ListItem>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinItem)
