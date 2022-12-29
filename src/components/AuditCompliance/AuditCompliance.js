import React, {useState} from 'react';
import './AuditCompliance.css';
import {Card, CheckboxField, Flex, Heading, SearchField, SelectField, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import SearchDocuments from "./SearchDocuments";
import DocumentScan from "./DocumentScan";
import AuditProgram from "./AuditProgram";

const AuditCompliance = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="80%"
            style={{display: "block", margin: "10px auto"}}
        >
            <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px"}}>Audit & Compliance</Text>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Search Documents" value="1"/>
                            <Tab label="Global Audit Program" value="2"/>
                            <Tab label="Document Scan" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SearchDocuments/>
                    </TabPanel>
                    <TabPanel value="2"><AuditProgram/></TabPanel>
                    <TabPanel value="3"><DocumentScan/></TabPanel>
                </TabContext>
            </Box>

        </Flex>
    );
};
export default AuditCompliance;