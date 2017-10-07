import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, TextInput, TextArea } from 'bjageman-react-toolkit'

import AddPage from './page/Add'
import UpdatePage from './page/Update'

class StoryForm extends React.Component {
    handleInputChange = (event) => {
        this.props.updateStory(
            { story : {
                ...this.props.editor.story,
                [event.target.name]: event.target.value
            }
        }
        )
    }

    renderDebug = (editor) => {
        return(
            <div style={{ marginRight: "15px" }}>
                <p>Story: {editor.story.name} : {editor.story.description}</p>
                { editor.story.pages.map((page, i) =>
                    <div key={i}>
                        <hr />
                        <p>Page: {page.name} - {page.description}</p>
                        <div>
                            Choices: { page.choices.map((choice, i) =>
                                <p key={i}>{choice.name}) {choice.description}</p>
                                )}
                        </div>
                    </div>
                )}

            </div>
        )
    }

    render() {
        const editor = this.props.editor
        const debug = this.props.debug
        return(
            <Container>
                {debug ? this.renderDebug(editor) : null}
                <TextInput style={styles.name} onChange={this.handleInputChange} placeholder="Story Name" name="name" value={editor.story.name} />
                <TextArea
                    onChange={this.handleInputChange}
                    name="description" placeholder="Description..."
                    value={editor.story.description} />
                <h4>PAGES</h4>
                { editor.story.pages.map((page, i) =>
                    <div key={i}>
                        <hr />
                        <UpdatePage index={i} page={page}/>
                    </div>
                )}
                <AddPage />
            </Container>
        )
    }
}

const styles = {
    name: {
        width: "100%"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
