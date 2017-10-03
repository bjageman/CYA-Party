import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button } from 'bjageman-react-toolkit'

class NewActionForm extends React.Component {
    addAction(){
        var page_index = this.props.page.index
        var choice_index = this.props.choice.index
        this.props.addAction({
            page_index : page_index,
            choice_index : choice_index,
            action: {
                name: "",
                description: "",
            },
        })
    }

    render() {
        return(
            <div>
                <Button onClick={() => this.addAction()}>Add New Action</Button>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActionForm)
