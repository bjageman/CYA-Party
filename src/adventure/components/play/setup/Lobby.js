import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container } from 'bjageman-react-toolkit'

class Lobby extends React.Component {
    render() {
        const session = this.props.session
        return (
            <Container>
                { session ?
                    <div>
                        <h1>{session.story.name}</h1>
                        <ul>
                            {session.players.map((player, i) =>
                                <li key={i}>
                                    {player.user.name}
                                </li>
                            )}
                        </ul>
                    </div>
                :
            <h1>No Game Data Found</h1> }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
