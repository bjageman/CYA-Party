import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

class WebSocket extends React.Component {
    componentWillMount(){
        this.props.socketStart()
    }

    componentWillUnmount(){
        this.props.socketStop()
    }
    render() {
        return this.props.children
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebSocket)
