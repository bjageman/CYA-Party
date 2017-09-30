import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

import Delete from 'base/components/editor/delete'

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


    render() {
        var choice = this.props.editor.story.pages[this.props.page.index].choices[this.props.index]
        return(
            <div>
                <div>
                <Text h3>{choice.name}</Text>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={choice.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={choice.description} />
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateChoiceForm)
