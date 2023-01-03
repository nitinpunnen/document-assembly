import * as React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Button, Flex, Text} from "@aws-amplify/ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import UploadFile from "../UploadFile/UploadFile";
import {forwardRef, useImperativeHandle, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {Storage} from "aws-amplify";

const FolderObjects = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        updateDocuments(files, folderName) {
            if(files[folderName]) {
                const documents = [];
                files[folderName].map((document, index) => {
                    if(!document.Key.includes('metadata.json')) {
                        document.id = index;
                        documents.push(document);
                    }
                })
                setDocuments(documents);
                setFolderName(folderName);
            }
        }
    }));

    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [folderName, setFolderName] = useState([]);

    const columns = [
        {field: 'Key', headerName: 'File Name', width: 600},
        {field: 'Size', headerName: 'Size', width: 70}];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRowClick = (event) => {
        props.onDocumentSelected(event.row.Key);
    };

    async function onUploadComplete() {
        setOpen(false);
        await props.onFilesUploaded();
        // setDocuments(props.allfiles[folderName]);
    }

    async function deleteNote({id, fileName}) {
        await Storage.remove(fileName);
        await Storage.remove(fileName + '.metadata.json');
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}>
            <Flex
                direction={{base: 'row'}} width="100%" className='card-header'>
                <Text style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Documents - {folderName}</Text>
                <Button variation="link" className='card-button' onClick={handleClickOpen}>
                    <FontAwesomeIcon icon={faUpload} color="#1a1a1a"/>
                    <span>Upload</span>
                </Button>
            </Flex>
            <Flex
                direction={{base: 'column', large: 'column'}}
                style={{padding: "10px"}}>
                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
                    <DialogTitle>Upload Files</DialogTitle>
                    <DialogContent>
                        <UploadFile folderName={folderName} onUploadComplete={() => onUploadComplete()}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {documents && <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={documents}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick={true}
                        onRowClick={handleRowClick}
                    />
                </div>}
            </Flex>
        </Flex>
    );
});
export default FolderObjects;
