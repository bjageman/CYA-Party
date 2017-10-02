import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { Route, Switch } from 'react-router'

import { Container, Grid, Button, TextInput } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'
import Story from './Story'
import Pages from './page/'

class EditorRouter extends React.Component {
    componentWillMount(){
        let story_id = this.props.match.params.story_id
        if (story_id && story_id !== "new"){
            this.props.getStory({
                access_token: this.props.user.access_token,
                story_id: story_id,
            })
        }
    }

    saveStory(){
        this.props.saveStory({
            access_token: this.props.user.access_token,
            story: this.props.editor.story,
            redirect: true,
        })
    }

    render() {
        const match = this.props.match
        return(
            <div>
                <Container>
                    <Button raised onClick={() => this.saveStory()}>SAVE</Button>
                    <ReduxLink to="/story/edit"><Button>BACK</Button></ReduxLink>
                </Container>
            <Switch>
                <Route exact path={match.url} component={Story}/>
                <Route exact path={match.url + "/pages"} component={Pages}/>
                <Route path={match.url + "/pages/:page_id"} component={Pages}/>
            </Switch>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorRouter)
