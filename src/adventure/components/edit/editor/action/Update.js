import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Button } from 'bjageman-react-toolkit'

class UpdateActionForm extends React.Component {
    state = { command: "" }
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

    handleCommandChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.props.updateAction({
            index: this.props.index,
            page_index: this.props.page.index,
            choice_index: this.props.choice.index,
            action: {
                ...this.props.choice.actions[this.props.index],
                command: {
                    ...this.props.choice.actions[this.props.index].command,
                    [event.target.name]: event.target.value,
                }
            }
        })
    }


    render() {
        var page = this.props.editor.story.pages[this.props.page.index]
        var choice = page.choices[this.props.choice.index]
        var action = choice.actions[this.props.index]
        var command = action.command ? action.command : {}
        var commands = this.props.editor.tools ? this.props.editor.tools.commands : []
        return(
            <div>
                <select value={command.slug} style={styles.select} onChange={this.handleCommandChange} name="slug">
                    { commands.map((command, i ) =>
                        <option key={i} value={command.slug} >{command.name}</option>
                    )}
                </select>
                <select value={action.target} style={styles.select} onChange={this.handleInputChange} name="target">
                { command.slug === "goto-page" ?
                    this.props.editor.story.pages.map((page, i) =>
                        <option key={i} value={page.id}>{page.name}</option>
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
