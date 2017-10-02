import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { Route, Switch } from 'react-router'

import { Grid, Button, TextInput, Text } from 'bjageman-react-toolkit'

import UpdatePage from './Update'

class PagesEditor extends React.Component {

    render() {
        const editor = this.props.editor
        return(
            <div>
            <Text h1>Story: {editor.story.name} : {editor.story.description}</Text>
            { editor.story.pages.map((page, i) =>
                <div key={i}>
                    <hr />
                    <p>Page: {page.name} - {page.description}</p>
                    <UpdatePage index={i} page={page}/>
                    <div>
                        Choices: {page.choices.map((choice, i) =>
                            <p key={i}>{choice.name} {choice.description}</p>
                            )}
                    </div>
                </div>
            )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditor)
