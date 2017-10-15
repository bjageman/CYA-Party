import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Menu, MenuItem, Icon } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components//links/Redux'

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
            <Menu title={<div style={styles.menu}><Icon name="person" />{this.props.user.name}</div> }>
                <ReduxLink to="/profile">
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                </ReduxLink>
                <hr />
                <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
            </Menu>
        )
    }
}

const styles ={
    menu: {
        textTransform: "capitalize",
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu)
