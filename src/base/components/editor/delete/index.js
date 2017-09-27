import React from 'react'
import { Icon, Button } from 'bjageman-react-toolkit'
import Dialog from './Dialog'

class DeleteItem extends React.Component {
    constructor(props){
        super(props)
        this.handleRequestClose = this.handleRequestClose.bind(this)
        this.state = {
            open: false,
        }
    }

    handleRequestClose() {
        this.setState({
            open: false
        })
    }

    render(){
        const name = this.props.name
        const story_id = this.props.story_id
        const page_id = this.props.page_id
        const choice_id = this.props.choice_id
        return(
            <div>
            <Button onClick = {() => this.setState({open: true})}>
                { this.props.children ? this.props.children : <Icon name="delete"  /> }
            </Button>
            <Dialog
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                entry={this.props.entry}
                name={name}
                story_id = {story_id}
                page_id = {page_id}
                choice_id = {choice_id}
                />
            </div>
        )
    }
}

export default (DeleteItem)
