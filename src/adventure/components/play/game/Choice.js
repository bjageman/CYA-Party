import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { ListItem, Button } from 'bjageman-react-toolkit'

class ChoiceItem extends React.Component {
    joinSession = () => {
        this.props.voteChoice({
            session_id: this.props.session.id,
            choice_id: this.props.choice.id,
            access_token: this.props.user.access_token,
        })
    }

    render() {
        const choice = this.props.choice
        return(
            <ListItem>
                <Button onClick={this.joinSession}>{choice.name}</Button>
                {choice.votes}
            </ListItem>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceItem)
