import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, Grid, Icon } from 'bjageman-react-toolkit'
import StoryList from './StoryList'
import ReduxLink from 'base/components/links/Redux'

class EditHome extends React.Component {

    render() {
        return(
            <Grid>
                <ReduxLink to ="/story/edit/new"><Button float><Icon name="add" /></Button></ReduxLink>
                <StoryList />
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHome)
