import React, {useState, useEffect, useRef} from "react";
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
    let [folders, setFolders] = useState([]);
    let [files, setFiles] = useState([]);
    // let [showUpload, setShowUpload] = useState(false)

    const ref = useRef();

    useEffect(() => {
        console.log("In useEffect")
        fetchDocuments();
    }, []);

    const onFolderAdded = () => {
        fetchDocuments();
    }

    const onFolderSelected = (selected) => {
        console.log('FileManager selected ', selected)
        ref.current.updateDocuments(files, selected);
    }

    async function fetchDocuments() {
        const response = await API.get('assemblrBucketDetails', '/assemblr/listbucket', {
            headers: {},
            response: true
        });
        console.log(response);
        const folders = response.data.folders;
        console.log(folders);
        const files = response.data.files;
        setFiles(files);
        setFolders(folders)
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
                <Button variation="link" onClick={() => fetchDocuments()}>
                    <FontAwesomeIcon icon={faRotate} color="#232F3E"/>
                    <span>Sync</span>
                </Button>
            </Flex>
            {/*{showUpload && <UploadFile onUploadComplete={() => onUploadComplete()}/>}*/}
            <Flex direction={{base: 'row'}} className='file-manager-layout'>
                <Card className='file-manager-card bucket-detail-card'>
                    <BucketDetails treeViewData={folders} onFolderAdded={() => onFolderAdded()} onFolderSelected={(selected) => onFolderSelected(selected)}/>
                </Card>
                <Card className='file-manager-card folder-objects-card'>
                    <FolderObjects ref={ref}/>
                </Card>
                <Card className='file-manager-card object-attrs-card'>
                    <ObjectAttribtutes/>
                </Card>
            </Flex>

        </Flex>
    );
};

export default FileManager;