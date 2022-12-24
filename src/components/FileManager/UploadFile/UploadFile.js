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

const UploadFile = (props) => {
    const [files, setFiles] = useState([]);

    async function uploadFiles(event) {
        event.preventDefault();
        for (const item of files) {
            const itemDepartment = item.department != null ? item.department : 'Corporate';
            const itemClassification = item.classification != null ? item.classification : 'None';
            let itemFilename;
            if (itemClassification === 'None') itemFilename = itemDepartment + "/" + item.name;
            else itemFilename = itemDepartment + "/" + itemClassification + "/" + item.name;

            const data = {
                name: item.documentName == null ? item.name : item.documentName,
                description: item.description != null ? item.description : 'Anycompany Artifact',
                department: itemDepartment,
                classification: itemClassification,
                fileName: itemFilename,
            };
            try {
                let response = await API.graphql({
                    query: createArtifactMutation,
                    variables: {input: data},
                });
            } catch (error) {
                console.error(error);
            }
            if (!!data.fileName) {
                try {
                    const result = await Storage.put(data.fileName, item, {
                        metadata: data,
                        contentType: item.type
                    });
                    const documentId = 's3://documentassembly-gama-landingzone203749-dev/public/' + result.key
                    const metadataJson = {
                        "DocumentId": documentId, "Attributes": {
                            "s3_document_id": documentId,
                            "_language_code": "en",
                            "department": itemDepartment,
                            "classification": itemClassification
                        }
                    }
                    // Bad Code. But this is a demo
                    try {
                        await Storage.put(data.fileName + '.metadata.json', metadataJson);
                    } catch (error) {
                        console.error(error);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        event.target.reset();
        setFiles([]);
        props.onUploadComplete();
    }

    function removeFile(index) {
        const newFiles = files.filter((item, i) => i !== index);
        setFiles(newFiles);
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="90%"
            style={{display: "block", margin: "10px auto"}}
        >
            <View as="form" style={{margin: "15px 0", padding: "15px", border: "1px solid lightgrey"}}
                  onSubmit={uploadFiles}>
                <Flex direction="row" alignItems="center" justifyContent="center"
                      style={{width: "70%", margin: "10px auto"}}>
                    <View
                        name="fileName"
                        as="input"
                        type="file"
                        multiple
                        onChange={(event) => {
                            const chosenFiles = Array.prototype.slice.call(event.target.files);
                            setFiles(chosenFiles);
                        }}
                    />
                    <Button type="submit" variation="primary">
                        Upload Files
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
                                        defaultValue="AnyCompany Artifact"
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