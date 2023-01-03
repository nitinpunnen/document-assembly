import React, {useState} from 'react';
import './AssembleDocuments.css';
import {Button, Expander, ExpanderItem, Flex, Heading, SelectField, Text} from "@aws-amplify/ui-react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditTextContent from "../dialogs/EditTextContent/EditTextContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExport, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {TextField} from "@aws-amplify/ui-react";

const AssembleDocuments = () => {

    const [open, setOpen] = useState(false);
    const [documentType, setDocumentType] = useState('');
    const [documentAttributes, setDocumentAttributes] = useState({});

    const handleEditedContent = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormEdit = (event) => {
        setDocumentAttributes({...documentAttributes, [event.target.name]: event.target.value});
    }

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
            <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px", marginBottom: "20px"}}>Assemble
                Documents</Text>
            <Flex
                direction={{base: 'row', large: 'row'}} width="100%" height="800px" minHeight="800px"
                style={{border: "1px solid lightgray", gap: "0"}}>
                <Flex
                    direction={{base: 'column'}} width="30%"
                    style={{backgroundColor: "#f9f9f9", fontSize: "0.9em", padding: "10px"}}>
                    <Flex
                        direction={{base: 'row'}} style={{padding: "10px 0", alignItems: "center"}}>
                        <Text>Select Document Type</Text>
                        <SelectField
                            label="Document Type" labelHidden
                            onChange={(e) => {
                                setDocumentAttributes({});
                                setDocumentType(e.target.value)
                            }}>
                            <option value=""></option>
                            <option value="offerLetter">Offer Letter</option>
                            <option value="employmentContract">Employment Contract</option>
                        </SelectField>
                    </Flex>
                    {documentType === 'offerLetter' &&
                        <Expander type="single" isCollapsible={true} height="700px" overflow="auto">
                            <Heading level={6} style={{textAlign: "center"}}>Offer Letter</Heading>
                            <ExpanderItem title="Properties" value="demo-item-1">
                                <TextField name="dataSource" value={documentAttributes.dataSource}
                                           onChange={handleFormEdit}/>
                            </ExpanderItem>
                        </Expander>}
                    {documentType === 'employmentContract' &&
                        <Expander type="multiple" defaultValue={['generalInformation', 'commencementOfEmployment']}
                                  isCollapsible={true} height="700px" overflow="auto">
                            <Heading level={6} style={{textAlign: "center"}}>Employment Contract</Heading>
                            <ExpanderItem title="General Information" value="generalInformation">
                                <Flex
                                    direction={{base: 'column'}} padding="10px 80px 10px 0" gap="5px">
                                    <TextField
                                        placeholder="Employer Name" value={documentAttributes.employerName}
                                        onChange={handleFormEdit}
                                        label="Employer Details" name="employerName"/>
                                    <TextField
                                        name="employerAddress" placeholder="Employer address" value={documentAttributes.employerAddress}
                                        onChange={handleFormEdit}
                                    />
                                    <Flex
                                        direction={{base: 'row'}}>
                                        <TextField
                                            name="employerCity" placeholder="City" value={documentAttributes.employerCity}
                                            onChange={handleFormEdit}
                                        />
                                        <TextField
                                            name="employerPostalCode" placeholder="Postal Code"
                                            value={documentAttributes.employerPostalCode}
                                            onChange={handleFormEdit}
                                        />
                                    </Flex>
                                    <TextField
                                        placeholder="Employee Name" value={documentAttributes.employeeName}
                                        onChange={handleFormEdit}
                                        label="Employee Details" name="employeeName"/>
                                    <TextField
                                        name="employeeAddress" placeholder="Employee address" value={documentAttributes.employeeAddress}
                                        onChange={handleFormEdit}
                                    />
                                    <Flex
                                        direction={{base: 'row'}}>
                                        <TextField
                                            name="employeeCity" placeholder="City" value={documentAttributes.employeeCity}
                                            onChange={handleFormEdit}
                                        />
                                        <TextField
                                            name="employeePostalCode" placeholder="Postal Code"
                                            value={documentAttributes.employeePostalCode}
                                            onChange={handleFormEdit}
                                        />
                                    </Flex>
                                </Flex>
                            </ExpanderItem>
                            <ExpanderItem title="Commencement of Employment" value="commencementOfEmployment">
                            </ExpanderItem>
                        </Expander>}
                </Flex>
                {/*Pre Formatted Text Area*/}
                <Flex
                    direction={{base: 'column'}} width="70%" style={{borderLeft: "1px solid lightgrey"}}>
                    <Flex
                        direction={{base: 'row'}} width="100%" className='card-header'
                        style={{borderRadius: "0"}}>
                        <Text
                            style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Document
                            Content</Text>
                        <Button variation="link" className='card-button' onClick={handleEditedContent}>
                            <FontAwesomeIcon icon={faPenToSquare} color="#1a1a1a"/>
                            <span>Edit Content</span>
                        </Button>
                        <Button variation="link" className='card-button' onClick={handleEditedContent}>
                            <FontAwesomeIcon icon={faFileExport} color="#1a1a1a"/>
                            <span>Export Document</span>
                        </Button>
                    </Flex>
                    <Flex
                        direction={{base: 'column'}} style={{padding: "10px 30px"}}>
                        {documentType === 'offerLetter' && <pre>
                        Offer Letter
                        Hello <span>{documentAttributes.dataSource}</span>
                        </pre>}
                        {documentType === 'employmentContract' && <pre>
                            <h3 style={{textAlign: "center"}}>Employment Contract</h3>
                            Between
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employerName}</span>
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employerAddress}</span>
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employerCity}, {documentAttributes.employerPostalCode}</span>

                            And
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employeeName}</span>
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employeeAddress}</span>
                            <span style={{display: "block", fontSize: "0.8em"}}>{documentAttributes.employeeCity}, {documentAttributes.employeePostalCode}</span>
                    </pre>}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default AssembleDocuments;