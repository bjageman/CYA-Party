import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import Login from 'user/components/login/index'
import AccountMenu from 'user/components/tools/AccountMenu'
import ReduxLink from 'base/components/links/Redux'

import { Drawer, AppBar, AppBarButton} from 'bjageman-react-toolkit'
import myConfig from 'config.js'

class ToolBar extends React.Component {
    state = { open: false }
    onRequestClose() {
        this.setState({ open: false })
    }
    toggleDrawer = () => {
        this.setState({ open: !this.state.open })
    }

    render(){
        const brandName = myConfig.APPNAME
        const user = this.props.user
        return(
            <div>
            <AppBar>
                <ReduxLink to="/story">
                    <AppBarButton> { brandName } </AppBarButton>
                </ReduxLink>
                { user.id ? <AccountMenu  /> : <Login /> }
            </AppBar>
            <Drawer
                open={this.state.open}
                onClick={this.toggleDrawer}
                onRequestClose={this.toggleDrawer} >
            </Drawer>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
