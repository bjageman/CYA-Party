import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Button, Grid, Card, CardContent, Text } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class StoryListItem extends React.Component {
    render() {
        const story = this.props.story
        return(
            <Card>
                <CardContent>
                    <Text h1> {story.name} </Text>
                    <Text p> {story.description} </Text>
                    <ReduxLink to={"/story/edit/" + story.id }><Button raised>Edit</Button></ReduxLink>
                </CardContent>
            </Card>
        )
    }
}

class StoryList extends React.Component {

    componentWillMount(){
        console.log("GET STORIES")
        this.props.getStories({
            access_token: this.props.user.access_token,
        })
    }

    render() {
        const story_listing = this.props.story ? this.props.story.listing : null
        if (story_listing) {
            return(
                <div>
                {story_listing.map((story, i) =>
                    <StoryListItem key={i} story={story} />
                )}
                </div>
            )
        }else{
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
