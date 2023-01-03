import * as React from 'react';
import {Button, Expander, ExpanderItem, Flex, Text} from "@aws-amplify/ui-react";
import {TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {forwardRef, useImperativeHandle, useState} from "react";
import {API} from "aws-amplify";

const ObjectAttributes = forwardRef((props, documentRef) => {

    let [docProps, setDocProps] = useState({});

    useImperativeHandle(documentRef, () => ({
        async updateMetadata(selectedDocument) {
            const response = await API.post('assemblrBucketDetails', '/assemblr/objectMetadata', {
                headers: {
                    'Content-Type': 'application/json'
                },
                response: true,
                body: {filename: selectedDocument}
            });
            // console.log(response)
            const docProps = response.data.result.Attributes;
            setDocProps(docProps)
        }
    }));

    const handleFormEdit = (event) => {
        setDocProps({...docProps, [event.target.name] : event.target.value});
    }

    async function handleClickSave() {
        const metadataJson = {
            "EventType": "UpdateAttributes", "Attributes": docProps
        }
        await API.post('assemblrBucketDetails', '/assemblr/updateMetadata', {
            headers: {
                'Content-Type': 'application/json',
            },
            response: true,
            body: metadataJson
        });
    };

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}>
            <Flex
                direction={{base: 'row'}} width="100%" className='card-header'>
                <Text style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Attributes</Text>
                <Button variation="link" className='card-button' onClick={handleClickSave}>
                    <FontAwesomeIcon icon={faSave} color="#1a1a1a"/>
                    <span>Save</span>
                </Button>
            </Flex>
            <Flex
                direction={{base: 'column', large: 'column'}}
                style={{padding: "10px"}}>
                <Expander type="single" isCollapsible={true}>
                    <ExpanderItem title="Properties" value="demo-item-1">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Document Title</td>
                                <td><TextField name="name" value={docProps.name} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td><TextField name="author" value={docProps.author} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td><TextField name="category" value={docProps.category} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Created At</td>
                                <td><TextField name="createdAt" value={docProps.createdAt} onChange={handleFormEdit} disabled/></td>
                            </tr>
                            <tr>
                                <td>Data Source</td>
                                <td><TextField name="dataSource" value={docProps.dataSource} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Language Code</td>
                                <td><TextField name="_language_code" value={docProps._language_code} onChange={handleFormEdit} disabled/></td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                    <ExpanderItem title="Organization" value="demo-item-2">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Department</td>
                                <td><TextField name="department" value={docProps.department} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Commercial Item</td>
                                <td><TextField name="commercialItem" value={docProps.commercialItem} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Event</td>
                                <td><TextField name="event" value={docProps.event} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Accounting Group</td>
                                <td><TextField name="accountingGroup" value={docProps.accountingGroup} onChange={handleFormEdit}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                    <ExpanderItem
                        title="Security"
                        value="demo-item-3"
                    >
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Classification</td>
                                <td><TextField name="classification" value={docProps.classification} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>ITAR ?</td>
                                <td><TextField name="itar" value={docProps.itar} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>PCI</td>
                                <td><TextField name="pci" value={docProps.pci} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>HIPAA ?</td>
                                <td><TextField name="hipaa" value={docProps.hipaa} onChange={handleFormEdit}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                </Expander>
            </Flex>
        </Flex>
    );
});

export default ObjectAttributes;
