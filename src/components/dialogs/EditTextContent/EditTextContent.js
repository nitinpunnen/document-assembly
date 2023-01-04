import * as React from 'react';
import {Flex} from "@aws-amplify/ui-react";
import {forwardRef, useEffect, useState} from "react";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "./EditTextContent.css";
import { convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditTextContent = forwardRef((props, ref) => {
    const [docEditorState, setDocEditorState] = useState(
        () => EditorState.createWithText(props.selectedText),
    );

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="100%"
            style={{display: "block", margin: "10px auto"}}
        >
            <div className='editor-pane'>
                <Editor
                    editorState={docEditorState}
                    onEditorStateChange={setDocEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    style={{minHeight: "380px"}}
                />
            </div>
        </Flex>
    );
})
export default EditTextContent;
