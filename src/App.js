import React from 'react'
//Router
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { history } from 'redux/store'

import ToolBar from 'base/components/web/ToolBar'
import Footer from 'base/components/web/Footer'

import Home from './Home'
import Profile from 'user/components/web/profile/'

class App extends React.Component {
  render() {
    return (
    <ConnectedRouter history={history}>
        <div style={styles.page}>
            <ToolBar />
            <div style={styles.body} >
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/profile" component={Profile}/>
            </Switch>
            </div>
            <Footer />
        </div>
    </ConnectedRouter>
    )
  }
}

const styles = {
    page: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        padding: 0,
    },
    body: {
        minHeight: "500px",
    }

}


export default App
