import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Checkbox } from 'bjageman-react-toolkit'

import { Button, Text } from 'bjageman-react-toolkit'

class HostSettings extends React.Component {
    state = {
        private: false,
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCreateGame = () => {
        this.props.createSession({
            access_token: this.props.user.access_token,
            story_id: this.props.match.params.story_id,
            private: this.state.private,
        })
    }

    render() {
        return (
            <Container center>
                <Text h1>Settings</Text>
                <Checkbox name="private" onClick={this.handleInputChange} value={this.state.private} label="Private Game" />
                <Button raised onClick={this.handleCreateGame}>Create Game</Button>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSettings)
