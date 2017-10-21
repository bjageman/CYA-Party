import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

class StartPageSelect extends React.Component {
    handleInputChange = (event) => {
        this.props.updateStory(
            { story : {
                ...this.props.editor.story,
                [event.target.name]: parseInt(event.target.value)
            }
        }
        )
    }

    render(){
        const pages = this.props.editor.story.pages
        const start_page = this.props.editor.story.start_page || 0
        return(
            <div>Start:
                <select style={styles.select} value={start_page} name="start_page" onChange={this.handleInputChange}>
                    <option disabled value> -- select an option -- </option>
                    { pages.map((page, i) =>
                        <option key={i} value={page.id}>{page.name}</option>
                    )}
                </select>
            </div>
        )
    }
}

const styles = {
    name: {
        width: "100%"
    },
    container: {

    },
    select: {
        width: "100%",
        maxWidth: "200px",
        padding: "16px 20px",
        marginLeft: "10px",
        marginBottom: "10px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#f1f1f1",
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPageSelect)
