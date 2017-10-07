import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container } from 'bjageman-react-toolkit'

import UpdatePage from './Update'

class PageDetailEditor extends React.Component {

    render() {
        const page_index = parseInt(this.props.match.params.page_index)
        const editor = this.props.editor
        const page = editor.story.pages[page_index]
        return(
            <Container>
                { page ? <UpdatePage page={page} index={page_index} /> : null }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDetailEditor)
