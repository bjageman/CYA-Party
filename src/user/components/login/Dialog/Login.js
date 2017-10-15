import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {TextInput, Dialog, Button} from 'bjageman-react-toolkit'

class LoginDialog extends React.Component {
    state = {
        "name": "",
        "password": ""
    }
    handleRequestClose = () => {
        this.props.onRequestClose()
    }
    handleLogin = value => {
        this.props.login({
            "name": this.state.name,
            "password": this.state.password,
        })
        this.props.onRequestClose()
    }

    handleGuestRegistration = () => {
        this.props.register({
            "guest": true,
        })
    }

    render(){
        return(
            <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
                <TextInput
                   required
                   id="name"
                   name="name"
                   label="username"
                   value={this.state.name}
                   onChange={event => this.setState({ [event.target.name]: event.target.value })}
                 />
                <TextInput
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                />
                <Button raised onClick={this.handleLogin} color="primary">
                    Login
                </Button>
                <Button onClick={this.props.openRegistration} color="primary">
                    Sign Up
                </Button>
                <Button onClick={this.handleGuestRegistration}>
                    Guest
                </Button>
            </Dialog>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
