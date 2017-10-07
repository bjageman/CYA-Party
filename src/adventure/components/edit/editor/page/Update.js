import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { TextInput, TextArea, Button } from 'bjageman-react-toolkit'

import ChoiceCreate from '../choice/Create'
import ChoiceUpdate from '../choice/Update'

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
        let index = this.props.index
        page.index = index
        return(
            <div>
                {page.name} - {index}
                <TextInput style={{ width: "100%" }} onChange={this.handleInputChange} name="name" placeholder="Page Name" value={page.name} />
                <TextArea onChange={this.handleInputChange} name="description" placeholder="Enter Content..." value={page.description} />
                <Button onClick={ () => this.props.deletePage({ index: index }) }>Delete Page</Button>
                <ChoiceCreate page={page}/>
                { page.choices.map((choice, i) =>
                    <ChoiceUpdate key={i} page={page} index={i} />
                )}
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePageForm)
