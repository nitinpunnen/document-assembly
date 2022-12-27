import React, {useState, useEffect} from "react";
import "./FileManager.css";
import "@aws-amplify/ui-react/styles.css";
import {API, Storage} from 'aws-amplify';
import {
    Button, Card,
    Flex,
    Text,
} from '@aws-amplify/ui-react';
import {listArtifacts} from "../../graphql/queries";
import {
    deleteArtifact as deleteArtifactMutation,
} from "../../graphql/mutations"
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BucketDetails from "./BucketDetails/BucketDetails";
import FolderObjects from "./FolderObjects/FolderObjects";
import ObjectAttribtutes from "./ObjectAttributes/ObjectAttribtutes";

const FileManager = () => {
    let [artifacts, setArtifacts] = useState([]);
    // let [showUpload, setShowUpload] = useState(false)

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
        await Storage.remove(fileName + '.metadata.json');
        await API.graphql({
            query: deleteArtifactMutation,
            variables: {input: {id}},
        });
    }

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}
            padding="1rem"
            width="80%"
            style={{display: "block", margin: "10px auto"}}
        >
            <Flex direction={{base: 'row'}} width="100%"
                  style={{margin: "10px auto"}}>
                <Text style={{flexGrow: 3, color: "#F56600", fontSize: "24px"}}>File Manager</Text>
                <Button variation="link" onClick={() => fetchArtifacts()}>
                    <FontAwesomeIcon icon={faRotate} color="#232F3E"/>
                    <span>Sync</span>
                </Button>
            </Flex>
            {/*{showUpload && <UploadFile onUploadComplete={() => onUploadComplete()}/>}*/}
            <Flex direction={{base: 'row'}} className='file-manager-layout'>
                <Card className='file-manager-card bucket-detail-card'>
                    <BucketDetails/>
                </Card>
                <Card className='file-manager-card folder-objects-card'>
                    <FolderObjects/>
                </Card>
                <Card className='file-manager-card object-attrs-card'>
                    <ObjectAttribtutes/>
                </Card>
            </Flex>

        </Flex>
    );
};

export default FileManager;