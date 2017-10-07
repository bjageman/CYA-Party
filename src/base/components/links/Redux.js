import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
import { push } from 'react-router-redux'
import  store  from 'redux/store'

//Material-UI


class ReduxLink extends React.Component {
    render(){
        var style = this.props.style ? { ...styles.link, ...this.props.style } : styles.link
        var to = this.props.to
        return(
        <a style={style} onClick={ () => store.dispatch(push(to)) }>{this.props.children}</a>
        )
    }
}

const styles = {
    link: {
      textDecoration: "none",
      cursor: "pointer",
    },
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxLink);
