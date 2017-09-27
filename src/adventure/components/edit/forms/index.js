import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, Text, Card, CardContent, TextInput, Button } from 'bjageman-react-toolkit'

import StoryForm from './Story'

class MainForm extends React.Component {
    state = {
        story: {},
        name: "",
        description: ""
    }

    componentWillMount(){
        const story_id = this.props.match.params.story_id
        console.log('STORY ID', story_id)
        if (story_id && story_id !== "new"){
            this.props.getItem({
                access_token: this.props.user.access_token,
                story_id: story_id,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.adventure.story){
            this.setState({
                story: nextProps.adventure.story,
            });
        }
    }

    handleInputChange = (event) => {
        this.setState({
            story: { ...this.state.story, [event.target.name]: event.target.value }
        })
    }

    saveStory(){
        this.props.saveItem({
            update: this.props.adventure.story ? true: false,
            access_token: this.props.user.access_token,
            story_id: this.props.adventure.story ? this.props.adventure.story.id : null,
            name: this.state.story.name,
            description: this.state.story.description,
        })
    }

    render() {
        return(
            <Grid>
                <Card>
                    <Text h1>Editor</Text >
                    <CardContent>
                        <StoryForm story={this.state.story} onChange={this.handleInputChange}/>
                    </CardContent>
                    <Button onClick={() => this.saveStory()} raised>Save Story</Button>
                </Card>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm)
