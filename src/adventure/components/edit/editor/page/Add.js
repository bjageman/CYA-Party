import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, Icon } from 'bjageman-react-toolkit'

class AddPage extends React.Component {
    addPage(){
        this.props.addPage({
            story: this.props.editor.story,
            page: {
                name: "",
                description: "",
                choices: [],
                choice: { name: "", description: "" }
                },
            })
    }


    render() {
        return(
            <Button raised onClick={() => this.addPage()}>Add Page</Button>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
