import React from 'react'
//Router
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { history } from 'redux/store'

import ToolBar from 'base/components/ToolBar'
import Footer from 'base/components/Footer'
import Notifications from 'base/components/notifications/'
import NotFound from 'base/components/Error'

import Home from './Home'
import Profile from 'user/components/profile/'

import StoryRouter from 'adventure/components/router'

class App extends React.Component {
  render() {
    return (
    <ConnectedRouter history={history}>
        <div style={styles.page}>
            <ToolBar />
            <Notifications />
            <div style={styles.body} >
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/profile" component={Profile}/>
                <Route path="/story" component={StoryRouter}/>
                <Route component={NotFound} />
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
