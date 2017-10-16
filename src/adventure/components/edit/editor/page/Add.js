import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { push } from 'react-router-redux'

import { Button, Icon } from 'bjageman-react-toolkit'

class AddPage extends React.Component {
    addPage(){
        let story = this.props.editor.story
        let redirect = this.props.redirect ? "/story/edit/" + story.slug + "/pages/" + (story.pages.length) : null
        this.props.addPage({
            story: story,
            page: {
                name: "New Page",
                description: "",
                choices: [],
                choice: { name: "", description: "" }
            },
            redirect: redirect,
        })
    }


    render() {
        return(
            <Button raised onClick={() => this.addPage()}>Add Page</Button>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
