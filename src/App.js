import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
    Flex, Heading,
    View,
    withAuthenticator,
} from '@aws-amplify/ui-react';

import FileManager from "./components/FileManager/FileManager";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import SearchDocuments from "./components/SearchDocuments/SearchDocuments";
import Home from "./components/Home/Home";

const App = ({signOut}) => {

    return (
        <View className="App">
            <BrowserRouter>
                <Flex direction="column" width="100%" padding="5px 10px" style={{borderBottom: "1px solid lightgrey", boxShadow: "0 4px 5px lightgrey"}}>
                    <Flex
                        direction={{base: 'row', large: 'row'}}
                        width="100%"
                        style={{alignItems: "center"}}
                    >
                        <Heading level={3} style={{flexGrow: 3, textAlign: "left"}}>Assemblr</Heading>

                    </Flex>
                    <Flex
                        direction={{base: 'row', large: 'row'}}
                        width="100%"
                        style={{alignItems: "center", margin: "0 auto"}}
                    >
                        <Link className="Navbar-Item" to="/">Home</Link>
                        <Link className="Navbar-Item" to="/uploadFiles">Upload Files</Link>
                        <Link className="Navbar-Item" to="/searchDocs">Search Documents</Link>
                    </Flex>
                </Flex>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/searchDocs" element={<SearchDocuments/>}/>
                    <Route exact path="/uploadFiles" element={<FileManager/>}/>
                </Routes>
            </BrowserRouter>
        </View>
    );
};

export default withAuthenticator(App);