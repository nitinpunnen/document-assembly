import React, {useState} from 'react';
import './AuditCompliance.css';
import {Card, CheckboxField, Flex, Heading, SearchField, SelectField, Text} from "@aws-amplify/ui-react";
import {API} from "aws-amplify";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const DocumentScan = () => {
    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%">
            <span>Document Scan</span>
        </Flex>
    );
};
export default DocumentScan;