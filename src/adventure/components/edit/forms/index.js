import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, Button, TextInput } from 'bjageman-react-toolkit'

import NewPage from './page/Create'
import UpdatePage from './page/Update'

class StoryForm extends React.Component {
    state = { addPage: false }
    componentWillMount(){
        let story_id = this.props.match.params.story_id
        if (story_id && story_id !== "new"){
            this.props.getStory({
                access_token: this.props.user.access_token,
                story_id: story_id,
            })
        }
    }

    handleInputChange = (event) => {
        this.props.editStory(
            { story : { ...this.props.editor.story, [event.target.name]: event.target.value } }
        )
    }

    saveStory(){
        this.props.saveStory({
            access_token: this.props.user.access_token,
            story: this.props.editor.story,
        })
    }
    render() {
        const editor = this.props.editor
        return(
            <Grid>
                <div style={{ marginRight: "15px" }}>
                    <p>Story: {editor.story.name} : {editor.story.description}</p>
                    { editor.story.pages.map((page, i) =>
                        <div>
                            <hr />
                            <p>Page: {page.name} - {page.description}</p>
                            <div>
                                Choices: {page.choices.map((choice, i) =>
                                    <p key={i}>{choice.name}) {choice.description}</p>
                                    )}
                            </div>
                        </div>
                    )}

                </div>
                <div>
                    <Button raised onClick={() => this.saveStory()}>SAVE</Button>
                    <TextInput onChange={this.handleInputChange} name="name" label="name" value={editor.story.name} />
                    <TextInput onChange={this.handleInputChange} name="description" label="description" value={editor.story.description} />
                    <h4>PAGES</h4>
                    <NewPage />
                    { editor.story.pages.map((page, i) =>
                        <UpdatePage key={i} index={i} page={page}/>
                    )}
                </div>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
