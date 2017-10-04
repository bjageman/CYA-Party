import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container } from 'bjageman-react-toolkit'

import { Button } from 'bjageman-react-toolkit'

class HostSettings extends React.Component {
    handleClick = () => {
        console.log("HANDLE CLICK")
        this.props.createSession({
            access_token: this.props.user.access_token,
            story_id: this.props.match.params.story_id,
        })
    }

    render() {
        return (
            <Container>
                <h1>Settings</h1>
                {this.props.match.params.story_id}
                <Button raised onClick={this.handleClick}>Create Game</Button>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSettings)
