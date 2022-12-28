import React, {useState} from 'react';
import './AssembleDocuments.css';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {Flex, Text} from "@aws-amplify/ui-react";
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

const AssembleDocuments = () => {

    const [docEditorState, setDocEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="80%"
            style={{display: "block", margin: "10px auto"}}
        >
            <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px"}}>Assemble Documents</Text>
            <div className='editor-pane'>
                <Editor
                    editorState={docEditorState}
                    onEditorStateChange={setDocEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
            </div>
        </Flex>
    );
};
export default AssembleDocuments;