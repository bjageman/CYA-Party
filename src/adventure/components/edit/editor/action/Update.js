import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, TextArea, Text, Button } from 'bjageman-react-toolkit'

class UpdateActionForm extends React.Component {
    state = {
        action_type: ""
    }
    handleInputChange = (event) => {
        this.props.updateAction({
            index: this.props.index,
            page_index: this.props.page.index,
            choice_index: this.props.choice.index,
            action: {
                ...this.props.choice.actions[this.props.index],
                [event.target.name]: event.target.value
            }
        })
    }

    handleDelete = () => {
        this.props.deleteAction({
            index: this.props.index,
            page_index: this.props.page.index,
            choice_index: this.props.choice.index,
        })
    }

    handleActionTypeChange = (event) => {
        this.handleInputChange(event)
        this.setState({ action_type: event.target.value })
    }


    render() {
        var page = this.props.editor.story.pages[this.props.page.index]
        var choice = page.choices[this.props.choice.index]
        var action = choice.actions[this.props.index]
        var action_types = this.props.editor.tools ? this.props.editor.tools.action_types : []
        return(
            <div>
                <TextInput style={{width: "100%"}} onChange={this.handleInputChange} name="name" placeholder="Action Name" value={action.name} />
                <select value={action.type_slug} style={styles.select} onChange={this.handleActionTypeChange} name="type">
                    { action_types.map((action_type, i ) =>
                        <option key={i} value={action_type.slug} >{action_type.name}</option>
                    )}
                </select>
                <select style={styles.select} onChange={this.handleInputChange} name="target">
                { action.type_slug == "goto-page" ?
                    this.props.editor.story.pages.map((page, i) =>
                        <option key={i} value={page.slug}>{page.name}</option>
                    )
                : <option></option> }
                </select>
                <Button onClick={this.handleDelete}>Delete</Button>
            </div>

        )
    }
}

const styles = {
    select: {
        width: "100%",
        maxWidth: "200px",
        padding: "16px 20px",
        marginLeft: "10px",
        marginBottom: "10px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#f1f1f1",
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateActionForm)
