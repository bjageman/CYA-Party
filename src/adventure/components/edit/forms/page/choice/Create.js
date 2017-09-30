import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

import Delete from 'base/components/editor/delete'

class NewChoiceForm extends React.Component {
    handleInputChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.props.editNewChoice({
            index: this.props.page.index,
            choice: { ...this.props.page.choice, [event.target.name]: event.target.value } }
        )}

    addChoice(){
        var index = this.props.page.index
        var page = this.props.editor.story.pages[index]
        console.log(index, page)
        if (page && page.choice){
        this.props.addChoice({
            index : index,
            choice: {
                name: page.choice.name,
                description: page.choice.description,
            },
        })
        }
    }

    render() {
        var page = this.props.page
        var choice = page.choice || {}
        return(
            <div>
                { page ?
                <div>
                <Text h3>New Choice</Text>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={choice.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={choice.description} />
                <Button onClick={() => this.addChoice()}>Add New Choice</Button>
                </div>
                : null }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChoiceForm)
