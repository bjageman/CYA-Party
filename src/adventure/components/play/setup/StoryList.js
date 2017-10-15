import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class StoryListItem extends React.Component {
    render() {
        const story = this.props.story
        return(
            <ReduxLink to={"/story/play/host/" + story.slug }>
            <div style={styles.item}>
                <Text h1> {story.name} </Text>
                {story.owner ? <Text p style={styles.owner}> Created By: {story.owner.name} </Text> : null }
                <Text p> {story.description} </Text>
            </div>
            </ReduxLink>
        )
    }
}

class StoryList extends React.Component {
    constructor(props){
        super(props)
        this.props.getStories({
            access_token: this.props.user.access_token,
        })
    }

    render() {
        const story_listing = this.props.editor.listing
        if (story_listing) {
            return(
                <Container>
                {story_listing.map((story, i) =>
                    <StoryListItem key={i} story={story} />
                )}
                </Container>
            )
        }else{
            return null
        }
    }
}

const styles = {
    item: {
        border: "1px solid black",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "10px",
    },
    owner:{
        textTransform: "capitalize",
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
