import React from 'react'

import LoginDialog from './Dialog/Login'
import RegistrationDialog from './Dialog/Registration'

import { AppBarButton } from 'bjageman-react-toolkit'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openLogin: false,
            openRegistration: false
        }
    }

    handleLoginRequestClose = value => {
        this.setState({ openLogin: false })
    }

    handleRegistrationRequestClose = value => {
        this.setState({ openRegistration: false })
    }

    render(){
        return(
        <div id="login">
            <AppBarButton right onClick={() => this.setState({ openLogin: true })}>
                Login/SignUp
            </AppBarButton>
            <LoginDialog
                open={this.state.openLogin}
                openRegistration ={() => this.setState({ openRegistration: true, openLogin: false })}
                onRequestClose={this.handleLoginRequestClose}
                />
            <RegistrationDialog
                open={this.state.openRegistration}
                onRequestClose={this.handleRegistrationRequestClose}
                />
        </div>
        )
    }
}

export default Login
