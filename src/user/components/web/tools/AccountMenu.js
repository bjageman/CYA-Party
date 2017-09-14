import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Menu, MenuItem, Icon } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/web/links/Redux'

class AccountMenu extends React.Component {
    state = { open: false }
    handleClick = event => {
        this.setState({ open: true })
    }

    handleRequestClose = () => {
        this.setState({ open: false })
    }

    handleLogOut = () => {
        this.props.logout()
        this.setState({ open: false })
    }

    render() {
        return(
            <Menu title={<Icon name="person" />}>
                <ReduxLink to="/profile">
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                </ReduxLink>
                <ReduxLink to="/campaign">
                    <MenuItem onClick={this.handleRequestClose}>My Campaigns</MenuItem>
                </ReduxLink>
                <hr />
                <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
            </Menu>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu)
