import React, {useState} from "react";
import "./UploadFile.css";
import "@aws-amplify/ui-react/styles.css";
import {API, Storage} from 'aws-amplify';
import {
    Button, CheckboxField,
    Flex,
    SelectField,
    Table, TableBody, TableCell, TableHead, TableRow,
    TextField,
    View,
} from '@aws-amplify/ui-react';
import {
    createArtifact as createArtifactMutation,
} from "../../../graphql/mutations"

import {FileUploader} from "react-drag-drop-files";

const UploadFile = (props) => {
    const [files, setFiles] = useState([]);

    async function uploadFiles(event) {
        console.log("In uploadFiles ", props)
        event.preventDefault();
        for (const item of files) {
            const itemDepartment = item.department != null ? item.department : 'Corporate';
            const itemClassification = item.classification != null ? item.classification : 'None';

            const data = {
                name: item.documentName == null ? item.name : item.documentName,
                description: item.description != null ? item.description : item.name,
                department: itemDepartment,
                classification: itemClassification,
                fileName: props.folderName + "/" + item.name
            };
            await API.graphql({
                query: createArtifactMutation,
                variables: {input: data},
            });
            if (!!data.fileName) {
                try {
                    const origFileName = data.fileName;
                    const result = await Storage.put(data.fileName, item, {
                        contentType: item.type
                    });
                    const documentId = 's3://documentassembly-gama-landingzone203749-dev/public/' + result.key
                    data.fileName = 'public/' + data.fileName;
                    data.s3_document_id = documentId;
                    data._language_code =  "en";

                    const metadataJson = {
                        "EventType": "NewDocument", "DocumentId": documentId, "Attributes": data
                    }
                    console.log("metadataJson ", metadataJson);
                    try {
                        await Storage.put(origFileName + '.metadata.json', metadataJson);
                        await API.post('assemblrBucketDetails', '/assemblr/updateMetadata', {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            response: true,
                            body: metadataJson
                        });
                    } catch (error) {
                        console.error(error);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        // event.target.reset();
        setFiles([]);
        props.onUploadComplete();
    }

    function removeFile(index) {
        const newFiles = files.filter((item, i) => i !== index);
        setFiles(newFiles);
    }

    const handleChange = (selectedFiles) => {
        console.log(selectedFiles);
        setFiles(Array.from(selectedFiles));
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            width="100%"
            style={{display: "block", margin: "10px auto"}}
        >
            <View style={{margin: "15px 0", padding: "15px", border: "1px solid lightgrey"}}>
                <Flex direction="row" alignItems="center" justifyContent="center"
                      style={{width: "100%", margin: "10px auto"}}>
                    <FileUploader multiple={true}
                                  handleChange={handleChange}
                                  name="selectedFiles"
                                  classes="dropZone"/>
                    <Button type="submit" variation="primary" onClick={uploadFiles}>
                        Upload
                    </Button>
                </Flex>
                <Table
                    className="upload-table"
                    caption=""
                    highlightOnHover="true">
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">File Name</TableCell>
                            <TableCell as="th">Document Name</TableCell>
                            <TableCell as="th">Department</TableCell>
                            <TableCell as="th">Classification</TableCell>
                            <TableCell as="th">Description</TableCell>
                            <TableCell as="th">Encrypt?</TableCell>
                            <TableCell as="th"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((item, index) => {
                            return <TableRow key={index}>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="name"
                                        placeholder={item.name}
                                        defaultValue={item.name}
                                        label="Document Name"
                                        labelHidden
                                        variation="quiet"
                                        onBlur={(e) => item.documentName = e.target.value}
                                    />
                                </TableCell>
                                <TableCell>
                                    <SelectField label="Department"
                                                 name="department"
                                                 labelHidden
                                                 variation="quiet"
                                                 defaultValue="Corporate"
                                                 onChange={(e) => item.department = e.target.value}
                                    >
                                        <option value="Corporate">Corporate</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Quality">Quality</option>
                                    </SelectField>
                                </TableCell>
                                <TableCell>
                                    <SelectField label="Classification"
                                                 name="classification"
                                                 variation="quiet"
                                                 labelHidden
                                                 defaultValue="None"
                                                 onChange={(e) => item.classification = e.target.value}
                                    >
                                        <option value="None">None</option>
                                        <option value="Confidential">Confidential</option>
                                        <option value="Internal">Internal Only</option>
                                        <option value="Sensitive">Sensitive</option>
                                        <option value="Classified">Classified</option>
                                    </SelectField>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="description"
                                        placeholder="Add a short description"
                                        label="Short Description"
                                        defaultValue={item.name}
                                        labelHidden
                                        variation="quiet"
                                        onBlur={(e) => item.description = e.target.value}
                                        style={{width: "400px"}}
                                    />
                                </TableCell>
                                <TableCell>
                                    <CheckboxField
                                        name="encrypt"
                                        value="no"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variation="link" onClick={() => removeFile(index)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </View>
        </Flex>
    );
};

export default UploadFile;