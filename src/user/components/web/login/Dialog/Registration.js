import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {Dialog, TextInput, Button} from 'bjageman-react-toolkit';

class RegistrationDialog extends React.Component {
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

    handleRegistration = value => {

        this.props.register({
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
                   marginForm
                 />
                <TextInput
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                  marginForm
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

export const styles = theme => ({
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    paddingLeft: 40,
    margingRight: 20,
    color: "blue",
  },
  container: {
    marginLeft: "5%",
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
      marginRight: 10
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDialog);
