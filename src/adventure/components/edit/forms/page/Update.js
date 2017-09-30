import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

import Delete from 'base/components/editor/delete'

import ChoiceCreate from './choice/Create'

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
        let page = this.props.page
        page.index = this.props.index
        return(
            <div>
                { page ?
                <div>
                <Text h3>{page.name}</Text>
                <Button onClick={ () => this.props.deletePage({ index: this.props.index }) }>Delete</Button>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={page.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={page.description} />
                <ChoiceCreate page={page}/>
                </div>
                : null }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePageForm)
