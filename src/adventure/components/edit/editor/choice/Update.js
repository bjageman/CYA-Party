import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

class UpdateChoiceForm extends React.Component {
    handleInputChange = (event) => {
        this.props.updateChoice({
            index: this.props.index,
            page_index: this.props.page.index,
            choice: {
                ...this.props.editor.story.pages[this.props.page.index].choices[this.props.index],
                [event.target.name]: event.target.value
            }
        })
    }

    handleDelete = () => {
        this.props.deleteChoice({
            index: this.props.index,
            page_index: this.props.page.index,
        })
    }


    render() {
        var choice = this.props.editor.story.pages[this.props.page.index].choices[this.props.index]
        return(
            <div>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={choice.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={choice.description} />
                <Button onClick={this.handleDelete}>Delete</Button>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateChoiceForm)
