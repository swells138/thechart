"use client"
import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyGraph from './MyGraph';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const drawerWidth = 240;
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function PermanentDrawerLeft({ create, connect, namedConnect }) {
    const [state, setState] = useState({
        node: false,
        connectButton: false,
        person: false
    });
    const [nodeList, setNodeList] = useState({nodeListArray:[], singleNode:{}})

        useEffect(()=>{
            fetch(`http://localhost:3000/api/node`).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
                })
                .then(data => {
                console.log(data,'fetching nodes')
                    setNodeList((prev)=>{
                        let nd = {...prev}
                        nd.nodeListArray = data
                        return nd
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },[])

    function handleCreate(event) {
        create(event)
    }

    function handleConnect(event) {
        connect(event)
    }

    function onNodeClicked() {
        setState(prevState => ({
            ...prevState,
            node: !prevState.node,
            connectButton: false
        }));
    }

    function onConnectClicked() {
        setState(prevState => ({
            ...prevState,
            connectButton: !prevState.connectButton,
            node: false
        }));
    }
    
    function handleNodeSend(event) {
        setState((prev)=>{
            let nd = {...prev}
            nd.person = true
            return nd
        })
        fetch(`http://localhost:3000/api/node/${event}`).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setNodeList((prev)=>{
                let nd = {...prev}
                nd.singleNode = data
                return nd
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                    >
                    <div className='bg-stone-950'>
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div">
                                Your Chart
                            </Typography>
                        </Toolbar>
                    </div>
                        <div className='flex justify-around columns-2 bg-stone-950'>
                            <div>
                                <MyGraph 
                                sendNode={handleNodeSend}
                                ></MyGraph>
                            </div>
                            <div>
                                {state.node && !state.connectButton && (
                                    <div>
                                        <h1 className='text-2xl font-bold'>Your Nodes</h1>
                                        <Divider />
                                        <ul>
                                            {nodeList.nodeListArray.map(item => (
                                                <li className='p-1' key={item.id}>{item.firstName}</li>
                                            ))}
                                            <Divider />
                                        </ul>
                                    </div>
                                )}
                                {state.connectButton && !state.node && (
                                    <div>
                                        <h1 className='text-2xl font-bold'>Your Connections</h1>
                                        <Divider />
                                        <ul>
                                            {namedConnect.map(item => (
                                                <li className='p-1' key={item.id}>{item.personOne} + {item.personTwo}</li>
                                                ))}
                                        </ul>
                                        <Divider />
                                    </div>
                                )}
                            </div>
                        </div>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                    >
                    <Toolbar />
                    <Divider />
                    <List>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Add a Node</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form id='form' action={handleCreate}>
                                    <div className='flex flex-col mx-8'>
                                        <input className='border rounded text-black my-1' id="name" name='name' placeholder='First Name'></input>
                                        <input className='border rounded text-black my-1' id="last" name='last' placeholder='Last Name'></input>
                                        <input className='border rounded text-black my-1' id="email" name='email' placeholder='Email'></input>
                                        <input className='border rounded text-black my-1' id="color" name='color' placeholder='Color'></input>
                                        <input className='border rounded text-black my-1' id="age" name='age' placeholder='Age'></input>
                                        <input className='border rounded text-black my-1' id="city" name='city' placeholder='City'></input>
                                        <input className='border rounded text-black my-1' id="state" name='state' placeholder='State'></input>
                                        <button className='rounded bg-rose-400 p-1 mt-3' type='submit'>Add Node</button>
                                    </div>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Add a Connection</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <form id='form' action={handleConnect}>
                                    <div className='flex flex-col mx-8'>
                                        <label htmlFor="name" className="mb-2">Connect a Node</label>
                                        <input className='border rounded text-black' id="personOne" name='personOne' placeholder='Person One'></input>
                                        <input className='border rounded text-black mt-2' id="personTwo" name='personTwo' placeholder='Person Two'></input>
                                        <button className='rounded bg-rose-400 p-2 mt-3' type='submit'>Add Connection</button>
                                    </div>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                    </List>
                    <Divider />
                    <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={onNodeClicked}>
                                    <ListItemIcon>
                                         <InboxIcon /> 
                                    </ListItemIcon>
                                    <ListItemText primary={"Nodes"}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={onConnectClicked}>
                                    <ListItemIcon>
                                          <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText  primary={"Connections"} />
                                </ListItemButton>
                            </ListItem>
                    </List>
                            <Divider />
                            {state.person && (
                                <div className='flex flex-col items-center py-5'>
                                    <h1>{nodeList.singleNode.firstName}</h1>
                                    <p>{nodeList.singleNode.age}</p>
                                    <p>{nodeList.singleNode.city} , {nodeList.singleNode.state}</p>
                                </div>
                            )}
                            <Divider />
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}