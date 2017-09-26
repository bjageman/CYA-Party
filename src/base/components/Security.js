import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

class Security extends React.Component {

    render(){
        if (this.props.user) {
            return(this.props.children)
        }else{
            return(<p>You need to be logged in to view this page</p>)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security)
