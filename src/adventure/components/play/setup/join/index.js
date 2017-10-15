import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, List, Button } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'
import JoinItem from './Item'

class Join extends React.Component {
    componentWillMount(){
        this.props.getSessions({ })
    }

    render() {
        const listing = this.props.session.listing
        return (
            <Container>
                <ReduxLink to=".."><Button>BACK</Button></ReduxLink>
                { listing ?
                    <div>
                        <List>
                            {listing.map((session, i) =>
                                <JoinItem key={i} item={session}  />
                            )}
                        </List>
                    </div>
                    :
                    <h1>No Game Data Found</h1> }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
