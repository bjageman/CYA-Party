import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import {Dialog, Button} from 'bjageman-react-toolkit'

class CharacterDeleteDialog extends React.Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(story_id, page_id, choice_id) {
        this.props.deleteStory({
            story_id: story_id,
        })
        this.props.onRequestClose()
    }

    render(){
        const name = this.props.name
        const story_id = this.props.story_id
        return(
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.onRequestClose} >
                    Are you sure you want to delete {name} ?
                <Button onClick = {() => this.handleDelete(story_id)} color="primary">
                  Delete
                </Button>
                <Button onClick = {this.props.onRequestClose} color="primary">
                  Cancel
                </Button>
            </Dialog>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterDeleteDialog)
