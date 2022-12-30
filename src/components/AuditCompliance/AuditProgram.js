import React, {useRef, useState} from 'react';
import './AuditCompliance.css';
import {Button, Card, CheckboxField, Flex, Heading, SearchField, SelectField, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faThumbsDown, faThumbsUp, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import SelectS3Objects from "../dialogs/SelectS3Objects/SelectS3Objects";

const AuditProgram = () => {
    const [open, setOpen] = useState(false);
    const childRef = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectedDocuments = () => {
        setOpen(false);
        const selectedDocuments = childRef.current.getSelectedDocuments();
        console.log("Audit Program ", selectedDocuments);
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%">
            <Flex
                direction={{base: 'row'}} width="100%" className='card-header'>
                <Text style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Documents</Text>
                <Button variation="link" className='card-button' onClick={handleClickOpen}>
                    <FontAwesomeIcon icon={faUpload} color="#1a1a1a"/>
                    <span>Upload</span>
                </Button>
            </Flex>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>Select Files</DialogTitle>
                <DialogContent>
                    <SelectS3Objects ref={childRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelectedDocuments}>Ok</Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Flex>
    );
};
export default AuditProgram;