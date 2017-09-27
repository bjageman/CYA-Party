import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, TextInput } from 'bjageman-react-toolkit'

import PageForm from './Page'

class StoryForm extends React.Component {
    state = { addPage: false }
    render() {
        const story = this.props.story || {}
        return(
            <div>
            <TextInput onChange={this.props.onChange} name="name" label="name" value={story.name} />
            <TextInput onChange={this.props.onChange} name="description" label="description" value={story.description} />
            { this.state.addPage ? <PageForm story={story} /> : null }
            { story.pages ? story.pages.map((page, i) =>
                <PageForm story={story} page={page} />
            ): null }
            { !this.state.addPage ? <Button onClick={() => this.setState({addPage: true})}>Add Page</Button>
            : <Button onClick={() => this.setState({addPage: false})}>Hide Page</Button> }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm)
