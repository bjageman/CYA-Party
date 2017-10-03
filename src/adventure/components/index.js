import React from 'react'
import { Container, Button } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class Story extends React.Component {
  render() {
    return (
        <Container>
            <ReduxLink to="/story/edit"><Button raised>Go to Editor</Button></ReduxLink>
            <ReduxLink to="/story/play"><Button raised>Play a Game</Button></ReduxLink>
        </Container>
    )
  }
}

export default Story
