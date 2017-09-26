import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, Text, Card, CardContent, TextInput, Button } from 'bjageman-react-toolkit'

class StoryEditorForm extends React.Component {
    state = {
        name: "",
        description: ""
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.story.name,
            description: nextProps.story.description,
        });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    saveStory(){
        this.props.saveStory({
            access_token: this.props.user.access_token,
            story_id: this.props.story ? this.props.story.id : null,
            name: this.state.name,
            description: this.state.description,
        })
    }

    render() {
        return(
            <Grid>
                <Card>
                    <Text h1>Editor</Text >
                    <CardContent>
                        <TextInput onChange={this.handleInputChange} name="name" label="name" value={this.state.name} />
                        <TextInput onChange={this.handleInputChange} name="description" label="description" value={this.state.description} />
                    </CardContent>
                    <Button onClick={() => this.saveStory()} raised>Save Story</Button>
                </Card>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditorForm)
