import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, Text, Card, CardContent, TextInput, Button } from 'bjageman-react-toolkit'
import Form from './Form'

class StoryEditor extends React.Component {
    componentWillMount(){
        const story_id = this.props.match.params.story_id
        console.log('STORY ID', story_id)
        if (story_id && story_id !== "new"){
            this.props.getStory({
                access_token: this.props.user.access_token,
                story_id: story_id,
            })
        }
    }
    render() {
        const story = this.props.story || null
        if (story) {
            return (<div><Form story={story} /></div>)
        }else{
            return <Form />
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor)
