import React from 'react'
import { Container } from 'bjageman-react-toolkit'
import StoryList from './StoryList'

class Host extends React.Component {
  render() {
    return (
        <Container>
            <StoryList />
        </Container>
    )
  }
}

export default Host
