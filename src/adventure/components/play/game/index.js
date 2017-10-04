import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text, List } from 'bjageman-react-toolkit'

import ChoiceItem from './Choice'

class Game extends React.Component {
    render() {
        const session = this.props.session
        const page = session.page
        return (
            <Container>
                { page ?
                    <div>
                        <Text h1>{page.name}</Text>
                        <List>
                        {page.choices.map((choice, i) =>
                            <ChoiceItem key={i} choice={choice}/>
                        )}
                        </List>
                    </div>
                : <Text h1>No Game Data Found</Text> }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
