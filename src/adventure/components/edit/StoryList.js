import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, GridItem, Card, CardContent, Text } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'
import Delete from 'base/components/editor/delete'

class StoryListItem extends React.Component {
    render() {
        const story = this.props.story
        return(
            <Card>
                <CardContent>
                    <Text h1> {story.name} </Text>
                    <Text p> {story.description} </Text>
                    <ReduxLink to={"/story/edit/" + story.id }><Button raised>Edit</Button></ReduxLink>
                    <Delete story_id={story.id} type="story" >Delete</Delete>
                </CardContent>
            </Card>
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
                <div>
                {story_listing.map((story, i) =>
                    <GridItem key={i}><StoryListItem story={story} /></GridItem>
                )}
                </div>
            )
        }else{
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
