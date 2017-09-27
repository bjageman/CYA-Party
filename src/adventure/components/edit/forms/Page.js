import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

class PageForm extends React.Component {
    state = {
        "name": this.props.page ? this.props.page.name: "",
        "description": this.props.page ? this.props.page.description: "",
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    savePage(){
        this.props.saveItem({
            update: this.props.page ? true: false,
            access_token: this.props.user.access_token,
            story_id: this.props.story.id,
            page_id: this.props.page ? this.props.page.id : null,
            name: this.state.name,
            description: this.state.description,
        })
    }

    render() {
        const page = this.props.page || {}
        return(
            <div>
            <hr />
            <Text h3>{page.title ? page.title : "New Page"}</Text>
            <TextInput onChange={this.handleInputChange} name="name" label="name" value={page.name} />
            <TextInput onChange={this.handleInputChange} name="description" label="description" value={page.description} />
            <Button onClick={() => this.savePage()}>Save Page</Button>
            <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageForm)
