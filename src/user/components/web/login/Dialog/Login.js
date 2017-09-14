import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {TextInput, Dialog, Button} from 'bjageman-react-toolkit'

class LoginDialog extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            "username": "",
            "password": ""
        }
    }
    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    handleLogin = value => {

        this.props.login({
            "username": this.state.username,
            "password": this.state.password,
        })
        this.props.onRequestClose();
    };

    render(){
        return(
            <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
                <TextInput
                   required
                   id="username"
                   name="username"
                   label="Username"
                   value={this.state.username}
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
            </Dialog>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
