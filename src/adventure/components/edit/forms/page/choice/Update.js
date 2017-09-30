import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

import Delete from 'base/components/editor/delete'

class UpdatePageForm extends React.Component {
    handleInputChange = (event) => {
        this.props.updatePage({
            index: this.props.index,
            page: {
                ...this.props.editor.story.pages[this.props.index],
                [event.target.name]: event.target.value
            }
        })
    }


    render() {
        var page = this.props.page
        return(
            <div>
                { page ?
                <div>
                <Text h3>{page.name}</Text>
                <Delete story_id={this.props.editor.story.id} page_id={page.id} type="story" >Delete</Delete>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={page.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={page.description} />
                </div>
                : null }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePageForm)
