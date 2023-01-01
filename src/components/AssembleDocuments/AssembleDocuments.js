import React, {useState} from 'react';
import './AssembleDocuments.css';
import {Button, Flex, Text} from "@aws-amplify/ui-react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditTextContent from "../dialogs/EditTextContent/EditTextContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCircleCheck} from "@fortawesome/free-solid-svg-icons";

const AssembleDocuments = () => {

    const [open, setOpen] = useState(false);

    const handleEditedContent = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="80%"
            style={{display: "block", margin: "10px auto"}}
        >
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>Edit Content</DialogTitle>
                <DialogContent>
                    <EditTextContent/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditedContent}>Ok</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px"}}>Assemble Documents</Text>
            <Button variation="link" className='card-button' onClick={handleEditedContent}>
                <FontAwesomeIcon icon={faFileCircleCheck} color="#1a1a1a"/>
                <span>Select</span>
            </Button>
            <Flex
                direction={{base: 'row', large: 'row'}} width="100%" minHeight="600px">
                <Flex
                    direction={{base: 'row'}} width="40%">

                </Flex>
                <Flex
                    direction={{base: 'row'}} width="60%" style={{border: "1px solid lightgrey"}}>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default AssembleDocuments;