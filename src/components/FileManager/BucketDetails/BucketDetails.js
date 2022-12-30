import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import {alpha, styled} from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, {treeItemClasses} from '@mui/lab/TreeItem';
import {Button, Flex, Text} from "@aws-amplify/ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faMaximize, faMinimize} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {API} from "aws-amplify";

const BucketDetails = (props) => {
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const valueRef = useRef('')

    const data = props.treeViewData;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        props.onFolderSelected(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['public', 'Engineering', 'Finance', 'Quality', 'Human Resources', "Marketing", "Creative Services"] : [],
        );
    };

    async function handleAddFolder() {
        const newFolder = valueRef.current.value;
        const parentDir = selected;
        try {
            await API.get('assemblrBucketDetails', '/assemblr/addFolder', {
                headers: {},
                response: true,
                queryStringParameters: {
                    newFolder: newFolder,
                    parentDir: 'public/' + parentDir
                }
            });
        }
        catch (e) {
            console.error(e);
        }
        setOpen(false);
        props.onFolderAdded();
    };

    function MinusSquare(props) {
        return (
            <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
                {/* tslint:disable-next-line: max-line-length */}
                <path
                    d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"/>
            </SvgIcon>
        );
    }

    function PlusSquare(props) {
        return (
            <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
                {/* tslint:disable-next-line: max-line-length */}
                <path
                    d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z"/>
            </SvgIcon>
        );
    }

    function CloseSquare(props) {
        return (
            <SvgIcon
                className="close"
                fontSize="inherit"
                style={{width: 14, height: 14}}
                {...props}
            >
                <path
                    d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z"/>
            </SvgIcon>
        );
    }

    const StyledTreeItem = styled((props) => (
        <TreeItem {...props} />))(({theme}) => ({[`& .${treeItemClasses.iconContainer}`]:
            {
            '& .close': {
                opacity: 0.3,
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 15,
            paddingLeft: 18,
            borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
    }));

    const renderTree = (nodes) => (
        <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </StyledTreeItem>
    );

    return (
        <Flex
            direction={{base: 'column', large: 'column'}}>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>Add Folders</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="folderName"
                        type="text"
                        fullWidth
                        variant="standard"
                        inputRef={valueRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddFolder}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Flex
                direction={{base: 'row'}} width="100%" className='card-header'>
                <Text style={{flexGrow: 3, color: "#1a1a1a", fontSize: "16px", padding: "0 10px"}}>Folders</Text>
                <Button variation="link" className='card-button' onClick={handleClickOpen}>
                    <div><FontAwesomeIcon icon={faAdd} color="#1a1a1a"/><span>Add</span></div>
                </Button>
                <Button variation="link" className='card-button'
                    onClick={handleExpandClick}>
                    {expanded.length === 0 && <div><FontAwesomeIcon icon={faMaximize} color="#1a1a1a"/><span>Expand All</span></div>}
                    {expanded.length > 0 && <div><FontAwesomeIcon icon={faMinimize} color="#1a1a1a"/><span>Collapse All</span></div>}
                </Button>
            </Flex>
            <Flex
                direction={{base: 'column', large: 'column'}}
                style={{padding: "10px"}}>
                {data.id && <TreeView
                    aria-label="customized"
                    defaultExpanded={['public']}
                    defaultCollapseIcon={<MinusSquare/>}
                    defaultExpandIcon={<PlusSquare/>}
                    defaultEndIcon={<CloseSquare/>}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                    sx={{height: 404, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                >
                    {renderTree(data)}
                </TreeView>}
            </Flex>
        </Flex>
    );
};

export default BucketDetails;
