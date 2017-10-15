import React from 'react'
import { Container } from 'bjageman-react-toolkit'
import StoryList from './StoryList'

import { Button } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'

class Host extends React.Component {
  render() {
    return (
        <Container>
            <ReduxLink to=".."><Button>BACK</Button></ReduxLink>
            <StoryList />
        </Container>
    )
  }
}

export default Host
