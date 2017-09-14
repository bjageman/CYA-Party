import React from 'react'

export class NotFound extends React.Component {
    render(){
        return(
            <div style={styles.message}>
                <h1>Page Not Found</h1>
            </div>
        )
    }
}

const styles = {
    message: {
        marginTop: "20px",
        textAlign: "center",
  }
}

export default NotFound
