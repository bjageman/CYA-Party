import React from 'react'
//Router
import { Route, Switch } from 'react-router'

import Home from './index'
import Play from './play/'
import Edit from './edit/'
import Editor from './edit/editor/'

import Security from 'base/components/Security'

const StoryRouter = ({ match }) => (
    <Security>
    <Switch>
        <Route exact path={match.url} component={Home}/>
        <Route exact path={match.url + "/edit"} component={Edit}/>
        <Route path={match.url + "/edit/:story_id"} component={Editor}/>
        <Route path={match.url + "/play"} component={Play}/>
    </Switch>
    </Security>
)

export default StoryRouter
