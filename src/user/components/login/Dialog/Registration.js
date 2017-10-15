import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {Dialog, TextInput, Button} from 'bjageman-react-toolkit';

class RegistrationDialog extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            "name": "",
            "password": ""
        }
    }
    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    handleRegistration = value => {
        this.props.register({
            "name": this.state.name,
            "password": this.state.password,
        })
        this.props.onRequestClose();
    };

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
            <Button raised onClick={this.handleRegistration} color="primary">
                Register
              </Button>
              <Button onClick={this.handleRequestClose} color="primary">
                Cancel
              </Button>
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDialog);
