import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, List, ListItem, Text, Button } from 'bjageman-react-toolkit'

class Lobby extends React.Component {
    startSession = () => {
        this.props.startSession({
            session_id: this.props.session.id,
        })
    }

    render() {
        const session = this.props.session
        const is_host = this.props.user.id === this.props.session.host.id
        return (
            <Container>
                { session ?
                    <div>
                        <Text h1>{session.story.name}</Text>
                        { is_host ? <Button onClick={this.startSession} raised>Start Game</Button> : null }
                        <List>
                            {session.players.map((player, i) =>
                                <ListItem key={i}>
                                    {player.user.name}
                                </ListItem>
                            )}
                        </List>
                    </div>
                :
            <h1>No Game Data Found</h1> }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
