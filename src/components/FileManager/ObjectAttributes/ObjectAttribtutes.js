import * as React from 'react';
import {Button, Expander, ExpanderItem, Flex, Text} from "@aws-amplify/ui-react";
import {TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const ObjectAttribtutes = () => {

    const handleClickSave = (event) => {
        console.log("Hello ")
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
                <Expander type="single">
                    <ExpanderItem title="Properties" value="demo-item-1">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Author</td>
                                <td><TextField value='Mary Jane' disabled/></td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td><TextField value='Engineering'/></td>
                            </tr>
                            <tr>
                                <td>Created At</td>
                                <td><TextField value='Engineering' disabled/></td>
                            </tr>
                            <tr>
                                <td>Data Source</td>
                                <td><TextField value='Engineering'/></td>
                            </tr>
                            <tr>
                                <td>Document Title</td>
                                <td><TextField value='Engineering'/></td>
                            </tr>
                            <tr>
                                <td>Language Code</td>
                                <td><TextField value='en' disabled/></td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                    <ExpanderItem title="Organization" value="demo-item-2">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Department</td>
                                <td><TextField value='Engineering'/></td>
                            </tr>
                            <tr>
                                <td>Commercial Item</td>
                                <td>Mary Jane</td>
                            </tr>
                            <tr>
                                <td>Event</td>
                                <td>Mary Jane</td>
                            </tr>
                            <tr>
                                <td>Data Source</td>
                                <td>Mary Jane</td>
                            </tr>
                            <tr>
                                <td>Document Title</td>
                                <td>Mary Jane</td>
                            </tr>
                            <tr>
                                <td>Language Code</td>
                                <td>Mary Jane</td>
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
                                <td>Mary Jane</td>
                            </tr>
                            <tr>
                                <td>ITAR ?</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>PCI</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>HIPAA ?</td>
                                <td>No</td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                </Expander>
            </Flex>
        </Flex>
    );
};

export default ObjectAttribtutes;
