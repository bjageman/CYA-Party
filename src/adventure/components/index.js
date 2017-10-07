import React from 'react'
import { Container, Button } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class Story extends React.Component {
  render() {
    return (
        <Container center>
            <ReduxLink to="/story/edit"><Button style={styles.button} raised>Go to Editor</Button></ReduxLink>
            <ReduxLink to="/story/play/host"><Button style={styles.button} raised>Host a Game</Button></ReduxLink>
            <ReduxLink to="/story/play/join"><Button style={styles.button} raised>Join a Game</Button></ReduxLink>
        </Container>
    )
  }
}
const styles = {
    button: {
        minWidth: "200px",
        height: "50px",
        marginLeft: "10px",
        marginTop: "30px",
    }
}


export default Story
