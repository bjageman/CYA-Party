import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, Text, Button } from 'bjageman-react-toolkit'

class NewPageForm extends React.Component {
    handleInputChange = (event) => {
        this.props.editNewPage(
            { page: {
                ...this.props.editor.page,
                [event.target.name]: event.target.value
                }
            }
        )
    }

    addPage(){
        if (this.props.editor.page){
        this.props.addPage({
            index: -1,
            page: {
                name: this.props.editor.page.name,
                description: this.props.editor.page.description,
                choices: [],
                choice: { name: "", description: "" }
            },
        })
        }
    }

    render() {
        var page = this.props.editor.page
        return(
            <div>
                { page ?
                <div>
                {/*<Text h3>New Page</Text>
                <TextInput onChange={this.handleInputChange} name="name" label="name" value={page.name} />
                <TextInput onChange={this.handleInputChange} name="description" label="description" value={page.description} />
                */}
                <Button raised onClick={() => this.addPage()}>Add Page</Button>
                </div>
                : null }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPageForm)
