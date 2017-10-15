import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Button, Icon } from 'bjageman-react-toolkit'

import ActionCreate from '../action/Create'
import ActionUpdate from '../action/Update'

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
        var page = this.props.editor.story.pages[this.props.page.index]
        let choice = page.choices[this.props.index]
        choice.index = this.props.index
        return(
            <div style={styles.container}>
                <Button onClick={this.handleDelete}><Icon name="delete" /></Button>
                <TextInput style={{width: "100%"}} onChange={this.handleInputChange} name="name" placeholder="Choice Name" value={choice.name} />
                <ActionCreate page={page} choice={choice} />
                <hr />
                { choice.actions.map((action, i) =>
                    <ActionUpdate key={i} page={page} choice={choice} index={i} />
                )}
            </div>

        )
    }
}

const styles = {
    container: {
        border: "1px solid black",
        borderRadius: 10,
        padding: 10,
        marginLeft: "2%",
        marginRight: "2%",
        marginBottom: 10,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateChoiceForm)
