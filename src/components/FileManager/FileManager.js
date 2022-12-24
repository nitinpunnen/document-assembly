import React, {useState, useEffect} from "react";
import "./FileManager.css";
import "@aws-amplify/ui-react/styles.css";
import {API, Storage} from 'aws-amplify';
import {
    Button,
    Flex,
    Heading, SearchField,
    Table, TableBody, TableCell, TableHead, TableRow,

    View,
} from '@aws-amplify/ui-react';
import {listArtifacts} from "../../graphql/queries";
import {
    deleteArtifact as deleteArtifactMutation,
} from "../../graphql/mutations"
import UploadFile from "./UploadFile/UploadFile";

const FileManager = () => {
    let [artifacts, setArtifacts] = useState([]);

    useEffect(() => {
        fetchArtifacts();
    }, []);

    const onUploadComplete = () => {
        fetchArtifacts();
    }

    async function fetchArtifacts() {
        const apiData = await API.graphql({query: listArtifacts});
        const artifacts = apiData.data.listArtifacts.items;
        await Promise.all(
            artifacts.map(async (artifact) => {
                if (artifact.fileName) {
                    const url = await Storage.get(artifact.name);
                    artifact.fileUrl = url;
                }
                return artifact;
            })
        );
        artifacts.sort((a, b) => {
            if (a.department > b.department) {
                return 1
            }
            if (a.department < b.department) {
                return -1
            }
            return 0;
        });
        setArtifacts(artifacts);
    }

    async function deleteNote({id, fileName}) {
        const newNotes = artifacts.filter((note) => note.id !== id);
        setArtifacts(newNotes);
        await Storage.remove(fileName);
        await API.graphql({
            query: deleteArtifactMutation,
            variables: {input: {id}},
        });
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="100%"
            style={{display: "block", margin: "10px auto"}}
        >
            <Heading level={3} style={{textAlign: "left"}}>Artifacts</Heading>
            <UploadFile onUploadComplete={() => onUploadComplete()}/>
            <Heading margin="3em 0 0 0" level={5}>Uploaded Files</Heading>
            <View margin="2em 0 0 0">
                <SearchField
                    label="Filter"
                    placeholder="Filter..."
                    onChange={(event) => {
                        console.log(event.target.value)
                    }}
                />
                <Table
                    className="upload-table"
                    caption=""
                    cellPadding="30px"
                    variation="striped"
                    highlightOnHover="true">
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">Department</TableCell>
                            <TableCell as="th">Classification</TableCell>
                            <TableCell as="th">File Name</TableCell>
                            <TableCell as="th">Document Name</TableCell>
                            <TableCell as="th">Description</TableCell>
                            <TableCell as="th">Created At</TableCell>
                            <TableCell as="th">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {artifacts.map((item) => (
                            <TableRow key={item.id || item.name}>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>{item.classification}</TableCell>
                                <TableCell><a href={item.fileUrl}>{item.fileName}</a></TableCell>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.createdAt}</TableCell>
                                <TableCell>
                                    <Button variation="link" onClick={() => deleteNote(item)}>
                                        Delete note
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </View>
        </Flex>
    );
};

export default FileManager;