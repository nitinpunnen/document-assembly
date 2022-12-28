import React from "react";
import "./Home.css";
import "@aws-amplify/ui-react/styles.css";
import {
    Card, Flex, Heading, Text,
    View,
} from '@aws-amplify/ui-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDiagramProject, faSearch, faUpload} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <View className="Home">
            <Flex direction={{base: 'row', large: 'row'}} className="video-container">
                <div className="intro">
                    <Heading level={1} className="heading">Assemblr - PoC</Heading>
                    <span className="short-desc">Automate the creation of your operational and technical documents without any technical expertise. </span>
                    <span className="short-desc">Powerful search engine build on machine learning capabilities to provide accurate contextual results. </span>
                </div>
            </Flex>
            <hr/>
            <Flex
                direction={{base: 'row', large: 'row'}}
                width="70%"
                style={{alignItems: "center", padding: "40px", margin: "0 auto", justifyContent: "space-between"}}
            >
                <Link to="/assemble">
                    <Card borderRadius="medium"
                          maxWidth="20rem"
                          variation="outlined">
                        <FontAwesomeIcon icon={faDiagramProject} size="2x" color="#22577A"/>
                        <Heading level={5}>Document Assembly</Heading>
                        <Text>Turn Word or PDF templates into automated workflows. Interactively build even your most complex documents within minutes.</Text>
                    </Card>
                </Link>
                <Link to="/auditCompliance">
                    <Card borderRadius="medium"
                          maxWidth="20rem"
                          variation="outlined">
                        <FontAwesomeIcon icon={faSearch} size="2x" color="#22577A"/>
                        <Heading level={5}>Search Documents</Heading>
                        <Text>Unified search experience across multiple structured and unstructured content repositories. Use natural language processing (NLP) to get highly accurate answers</Text>
                    </Card>
                </Link>
                <Link to="/uploadFiles">
                    <Card borderRadius="medium"
                          variation="outlined">
                        <FontAwesomeIcon icon={faUpload} size="2x" color="#22577A"/>
                        <Heading level={5}>Manage Files</Heading>
                        <Text>Securely upload your files into Cloud Storage.Organize the files for easy retrieval in a highly available and durable storage.</Text>
                    </Card>
                </Link>
            </Flex>
        </View>
    );
};

export default Home;