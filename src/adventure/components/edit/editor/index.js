import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { Route, Switch } from 'react-router'

import { Container, Button, Icon } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'
import Story from './Story'
import Pages from './page/'
import Detail from './page/Detail'

import TableofContentsDrawer from './TableofContentsDrawer'

class EditorRouter extends React.Component {
    componentWillMount(){
        let story_id = this.props.match.params.story_id
        if (story_id && story_id !== "new"){
            this.props.getStory({
                access_token: this.props.user.access_token,
                story_id: story_id,
                edit: true,
            })
        }
        this.props.getTools({
            access_token: this.props.user.access_token,
        })
    }

    saveStory(){
        this.props.saveStory({
            access_token: this.props.user.access_token,
            story: this.props.editor.story,
            redirect: true,
            notification: true,
        })
    }

    render() {
        const match = this.props.match
        return(
            <div>
                <Container>
                    <Button style={{ backgroundColor:"blue" }} float onClick={() => this.saveStory()}><Icon name="save" /></Button>
                    <ReduxLink to=".."><Button>BACK</Button></ReduxLink>
                    <TableofContentsDrawer />
                </Container>
                <Switch>
                    <Route exact path={match.url} component={Story}/>
                    <Route exact path={match.url + "/pages"} component={Pages}/>
                    <Route path={match.url + "/pages/:page_index"} component={Detail}/>
                </Switch>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorRouter)
