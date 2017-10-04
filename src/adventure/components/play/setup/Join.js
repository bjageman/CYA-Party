import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container } from 'bjageman-react-toolkit'

class Join extends React.Component {
    componentWillMount(){
        this.props.getSessions({

        })
    }
  render() {
      const listing = this.props.session.listing
      return (
          <Container>
              { listing ?
                  <div>
                      <ul>
                          {listing.map((session, i) =>
                              <li key={i}>
                                  {session.story.name} - Players: {session.players.length}
                              </li>
                          )}
                      </ul>
                  </div>
              :
          <h1>No Game Data Found</h1> }
          </Container>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
