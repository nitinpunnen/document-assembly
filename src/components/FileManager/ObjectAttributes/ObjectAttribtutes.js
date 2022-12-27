import * as React from 'react';
import {Button, Expander, ExpanderItem, Flex, Text} from "@aws-amplify/ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

const ObjectAttribtutes = () => {

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}>
            <Flex
                direction={{base: 'row'}} width="100%" className='card-header'>
                <Text style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Attributes</Text>
            </Flex>
            <Flex
                direction={{base: 'column', large: 'column'}}
                style={{padding: "10px"}}>
                <Expander type="single">
                    <ExpanderItem title="Is it accessible?" value="demo-item-1">
                        Yes! It adheres to the WAI-ARAI design pattern.
                    </ExpanderItem>
                    <ExpanderItem title="Can I customize the styling?" value="demo-item-2">
                        Of course! See the section on CSS Styling below.
                    </ExpanderItem>
                    <ExpanderItem
                        title="Is it a great way to organize content?"
                        value="demo-item-3"
                    >
                        Most definitely!
                    </ExpanderItem>
                </Expander>
            </Flex>
        </Flex>
    );
};

export default ObjectAttribtutes;
