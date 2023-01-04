import * as React from 'react';
import {Button, Expander, ExpanderItem, Flex, CheckboxField, Heading} from "@aws-amplify/ui-react";
import {forwardRef, useEffect, useState} from "react";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "./SearchDocumentContent.css";
import {convertFromRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {TextField} from "@mui/material";

const SearchDocumentContent = forwardRef((props, ref) => {

    let [docProps, setDocProps] = useState({});
    const [clicked, setClicked] = useState(false);

    const handleFormEdit = (event) => {
        setDocProps({...docProps, [event.target.name]: event.target.value});
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function handleSearchedContent(event) {
        await delay(1000);
        setClicked(true)
        setDocProps({...docProps, [event.target.name]: event.target.value});
    }

    return (
        <Flex
            direction={{base: 'row'}}
            padding="1rem"
            width="100%"
            style={{margin: "10px auto", border: "1px solid lightgray"}}
        >
            <Flex
                direction={{base: 'column', large: 'column'}} width="30%"
                style={{padding: "10px"}}>
                <Expander type="single" isCollapsible={true}>
                    <ExpanderItem title="Properties" value="demo-item-1">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Document Title</td>
                                <td><TextField name="name" value={docProps.name || ''} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td><TextField name="author" value={docProps.author || ''} onChange={handleFormEdit}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td><TextField name="category" value={docProps.category || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Created At</td>
                                <td><TextField name="createdAt" value={docProps.createdAt || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Data Source</td>
                                <td><TextField name="dataSource" value={docProps.dataSource || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Language Code</td>
                                <td><TextField name="_language_code" value={docProps._language_code || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Additional Tags</td>
                                <td><TextField name="additionalTags" value={docProps.additionalTags || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                    <ExpanderItem title="Organization" value="demo-item-2">
                        <table className='attribute-table'>
                            <tbody>
                            <tr>
                                <td>Department</td>
                                <td><TextField name="department" value={docProps.department || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Commercial Item</td>
                                <td><TextField name="commercialItem" value={docProps.commercialItem || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>Event</td>
                                <td><TextField name="event" value={docProps.event || ''} onChange={handleFormEdit}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Accounting Group</td>
                                <td><TextField name="accountingGroup" value={docProps.accountingGroup || ''}
                                               onChange={handleFormEdit}/></td>
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
                                <td><TextField name="classification" value={docProps.classification || ''}
                                               onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>ITAR ?</td>
                                <td><TextField name="itar" value={docProps.itar || ''} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>PCI</td>
                                <td><TextField name="pci" value={docProps.pci || ''} onChange={handleFormEdit}/></td>
                            </tr>
                            <tr>
                                <td>HIPAA ?</td>
                                <td><TextField name="hipaa" value={docProps.hipaa || ''} onChange={handleFormEdit}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpanderItem>
                </Expander>
                <Button onClick={handleSearchedContent}>
                    <span>Search</span>
                </Button>
            </Flex>
            <Flex
                direction={{base: 'column', large: 'column'}} width="70%"
                style={{padding: "30px", border: "1px solid lightgray"}}>
                {clicked && <div>
                    <Heading level={4} style={{textAlign: "center"}}>Search Results</Heading>
                    <CheckboxField
                        label="Lennox Technologies achieved a significant milestone of $10 Billion annual revenue in FY12. This has been possible due to your commitment and hard work in delivering to our customers by driving excellence.
                    I would like to acknowledge your contribution that has helped Lennox Technologies in this journey."
                        name="cb1"
                    />
                    <CheckboxField label="Lennox Technologies will continue to make necessary investments and build competencies to stay relevant to our customers at all times. The opportunities in the market are immense and with our collaborative effort,
                    I am sure, we will cross many more milestones and flourish in an environment where each one of us can realize our potential. "
                                   name="cb3"/>
                    <CheckboxField label="I am pleased to share with you your Annual Compensation of $120,000 for the year 2012-13. This includes a potential performance pay of $80,000 annually. A part of this performance pay will be paid to you on a monthly basis and the remainder on closure of each quarter, subject to company, unit, and individuals achieving their targets."
                                   name="cb5"/>
                    <CheckboxField
                        label="The details of your compensation and related benefits are enclosed in the Annexure to this letter. Kindly note that the above details are specific to India and may be subject to change in case of long-term deputation on international assignments, if any."
                        name="cb1"
                    />
                    <CheckboxField
                        label="I look forward to your continued commitment and a fulfilling career with Lennox Technologies in the years to come."
                        name="cb4"
                    />
                    <CheckboxField label="Warm regards and best wishes "
                                   name="cb6"/>
                </div>
                }
            </Flex>
        </Flex>
    );
})
export default SearchDocumentContent;
