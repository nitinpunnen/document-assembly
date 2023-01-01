import React, {useRef, useState} from 'react';
import './AuditCompliance.css';
import {Button, Card, CheckboxField, Flex, Heading, SearchField, SelectField, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faFileCircleCheck, faThumbsDown, faThumbsUp, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import SelectS3Objects from "../dialogs/SelectS3Objects/SelectS3Objects";
import {DataGrid} from "@mui/x-data-grid";

const AuditProgram = () => {
    const [selectDialogOpen, setSelectDialogOpen] = useState(false);
    const [validationDialogOpen, setValidationDialogOpen] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const childRef = useRef();

    const columns = [
        {field: 'Key', headerName: 'File Name', width: 500},
        {field: 'Size', headerName: 'Size', width: 70},
        {field: 'LastModified', headerName: 'Last Modified', width: 200}];

    const handleSelectDialogOpen = () => {
        setSelectDialogOpen(true);
    };

    const handleValidationDialogOpen = () => {
        setValidationDialogOpen(true);
    };

    const handleStartValidation = () => {
        handleValidationDialogOpen();
    };

    const handleSelectDialogClose = () => {
        setSelectDialogOpen(false);
    };

    const handleValidationDialogClose = () => {
        setValidationDialogOpen(false);
    };

    const handleSelectedDocuments = () => {
        setSelectDialogOpen(false);
        const selectedDocuments = childRef.current.getSelectedDocuments();
        setSelectedDocuments(selectedDocuments)
        console.log("Audit Program ", selectedDocuments);
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%">
            <Flex
                direction={{base: 'row'}} width="100%">
                <Text style={{color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Audit Documents</Text>
                <Button variation="link" className='card-button' onClick={handleSelectDialogOpen}>
                    <FontAwesomeIcon icon={faFileCircleCheck} color="#1a1a1a"/>
                    <span>Select</span>
                </Button>
            </Flex>
            {selectedDocuments.length > 0 && <Flex
                direction={{base: 'row', large: 'row'}} width="100%">
                <Flex
                    direction={{base: 'row'}} width="80%">
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={selectedDocuments}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick={true}
                        />
                    </div>
                </Flex>
                <Flex
                    direction={{base: 'column'}}
                    style={{textAlign: "center"}} width="20%">
                    <span style={{color: "rgb(245, 102, 0)"}}>Select required validations on the file</span>
                    <Flex
                        direction={{base: 'column'}} style={{paddingLeft: "30px", textAlign: "center"}} width="100%">
                        <CheckboxField label="Validate Signatures" name="checkSignature" value="yes"/>
                        <CheckboxField label="Check Document Quality" name="checkSignature" value="yes"/>
                        <CheckboxField label="Print Document Headers" name="checkSignature" value="yes"/>
                    </Flex>
                    <div>
                    <Button className='card-button' onClick={handleStartValidation}>
                        <span>Run Validations</span>
                    </Button>
                    </div>
                </Flex>
            </Flex>}
            <Dialog open={selectDialogOpen} onClose={handleSelectDialogClose} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>Select Files</DialogTitle>
                <DialogContent>
                    <SelectS3Objects ref={childRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelectedDocuments}>Ok</Button>
                    <Button onClick={handleSelectDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={validationDialogOpen} onClose={handleValidationDialogClose} fullWidth={true} maxWidth={'lg'}>
                <DialogTitle>Validation Results</DialogTitle>
                <DialogContent>
                    <SelectS3Objects ref={childRef}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelectedDocuments}>Ok</Button>
                    <Button onClick={handleValidationDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Flex>
    );
};
export default AuditProgram;