import React from 'react'
//Router
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { history } from 'redux/store'

import ToolBar from 'base/components/web/ToolBar'
import Home from './Home'

class App extends React.Component {
  render() {
    return (
    <ConnectedRouter history={history}>
        <div style={styles.body}>
        <ToolBar />
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
        </div>
    </ConnectedRouter>
    )
  }
}

const styles = {
    body: {
        position: "absolute",
        minHeight: "600px",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        padding: 0,
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(App)
