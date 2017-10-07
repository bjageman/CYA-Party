import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Drawer, Button, MenuItem, Text } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class TableofContentsDrawer extends React.Component {
    state = { open: false }

    toggleDrawer = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const story = this.props.editor.story
        return(
            <div>
            <Button onClick={this.toggleDrawer}>Table of Contents</Button>
            <Drawer open={this.state.open} onClick={this.toggleDrawer} onOutsideClick={this.toggleDrawer}>
                <div style={styles.header}>
                    <Text h2>Pages</Text>
                </div>
                <hr />
                {story.pages.map((page, i) =>
                    <ReduxLink key={i} to={"/story/edit/" + story.slug + "/pages/" + i}><MenuItem>{page.name}</MenuItem></ReduxLink>
                )}

            </Drawer>
            </div>
        )
    }
}

const styles = {
    header: {
        paddingLeft: "10px"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableofContentsDrawer)
