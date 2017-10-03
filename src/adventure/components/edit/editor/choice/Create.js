import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button } from 'bjageman-react-toolkit'

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
        if (page){
        this.props.addChoice({
            index : index,
            choice: {
                name: page.choice ? page.choice.name : "",
                description: page.choice ? page.choice.description : "",
                actions: [],
            },
        })
        }
    }

    render() { return <Button onClick={() => this.addChoice()}>Add New Choice</Button> }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChoiceForm)
