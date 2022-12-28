import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
    Flex, Heading,
    View,
    withAuthenticator,
} from '@aws-amplify/ui-react';
import {createTheme, ThemeProvider} from '@mui/material';

import FileManager from "./components/FileManager/FileManager";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import AuditCompliance from "./components/AuditCompliance/AuditCompliance";
import Home from "./components/Home/Home";
import AssembleDocuments from "./components/AssembleDocuments/AssembleDocuments";

const App = ({signOut}) => {
    const appTheme = createTheme({
        typography: {
            fontFamily: [
                'Amazon Ember',
                'Helvetica Neue',
            ].join(','),
        },
    });

    return (
        <ThemeProvider theme={appTheme}>
            <View className="App">
                <BrowserRouter>
                    <Flex
                        direction={{base: 'row', large: 'row'}}
                        width="100%"
                        style={{backgroundColor: '#232F3E', minHeight: '120px', color: '#fff'}}
                    >
                        <Flex
                            direction={{base: 'row', large: 'row'}}
                            width="80%"
                            style={{color: '#fff', margin: '0 auto', alignItems: "center"}}>
                            <Flex
                                direction={{base: 'row', large: 'row'}}
                                width="100%"
                                style={{alignItems: "center", margin: "0 auto"}}
                            >
                                <Link className="Navbar-Item" to="/">Home</Link>
                                <Link className="Navbar-Item" to="/uploadFiles">Manage Files</Link>
                                <Link className="Navbar-Item" to="/auditCompliance">Audit & Compliance</Link>
                                <Link className="Navbar-Item" to="/assemble">Assemble</Link>
                            </Flex>
                            <Heading level={3} style={{flexGrow: 3, color: "white"}}>Assemblr</Heading>
                        </Flex>
                    </Flex>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/auditCompliance" element={<AuditCompliance/>}/>
                        <Route exact path="/uploadFiles" element={<FileManager/>}/>
                        <Route exact path="/assemble" element={<AssembleDocuments/>}/>
                    </Routes>
                </BrowserRouter>
            </View>
        </ThemeProvider>
    );
};

export default withAuthenticator(App);