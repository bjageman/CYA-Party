import React from 'react'

import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import 'draft-js-hashtag-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();

const { InlineToolbar } = inlineToolbarPlugin;

const plugins = [
  hashtagPlugin,
  linkifyPlugin,
  inlineToolbarPlugin
];

class TextEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = { focus: false }
    }

    focus(){
        this.refs.editor.focus()
    }

    render() {
        const editorStyle = this.state.focus ? {...styles.editor, ...styles.editor.focus } : styles.editor
        return(
        <div
            style={editorStyle}
            onClick={this.focus.bind(this)}
            onFocus={() => this.setState({focus: true})}
            onBlur={() => this.setState({focus: false})}
            >
            <Editor
                editorState={this.props.editorState}
                onChange={this.props.onChange}
                plugins={plugins}
                spellCheck={true}
                ref="editor"
                />
            <InlineToolbar />
        </div>
        )
    }
}

const styles = {
  editor: {
      fontFamily: "roboto",
      webkitTransition: "0.5s",
      transition: "0.5s",
      outline: "none",
      boxSizing: "border-box",
      border: "1px solid #ddd",
      padding: "1%",
      cursor: "text",
      borderRadius: "2px",
      marginBottom: "2em",
      boxShadow: "inset 0px 1px 8px -3px #ABABAB",
      backgroundColor: "#fefefe",
      minHeight:140,
      width: "100%",
      focus: {
          border: "3px solid #555",
      }
    }
}

export default TextEditor
