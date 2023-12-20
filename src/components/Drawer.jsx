"use client"
import React, { useEffect, useState } from 'react';
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
import { Avatar, Button, Table, TableCell, TableRow, TextField } from '@mui/material';
import eddy from "../../public/eddy.jpg"
import logo from '../app/favicon.ico'
import Link from 'next/link'
import Image from 'next/image'
import { create } from 'domain';

const drawerWidth = 240;
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function PermanentDrawerLeft({ create, connect }) {
    const [state, setState] = useState({
        node: false,
        connectButton: false,
        person: false,
        profile: false,
        chart: true
    });
    const [nodeList, setNodeList] = useState({ nodeListArray: [], singleNode: {}, namedConnect: [] })

    useEffect(() => {
        async function fetchData() {
            try {
                const [namedConnectionsResponse, nodeResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/namedconnections`),
                    fetch(`http://localhost:3000/api/usersconnections`),
                ]);

                if (!namedConnectionsResponse.ok || !nodeResponse.ok) {
                    throw new Error(`HTTP error! status: ${namedConnectionsResponse.status} or ${nodeResponse.status}`);
                }

                const [namedConnectionsData, nodeData] = await Promise.all([
                    namedConnectionsResponse.json(),
                    nodeResponse.json(),
                ]);
                console.log("sydney", nodeData)

                setNodeList((prev) => ({
                    ...prev,
                    nodeListArray: nodeData.users,
                    namedConnect: namedConnectionsData
                }));
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    function handleCreate(event) {
        create(event)
        location.reload()
    }

    function onAccountClicked() {
        setState(prevState => ({
            ...prevState,
            profile: true,
            chart: false
        }))
    }

    function onChartClicked() {
        setState(prevState => ({
            ...prevState,
            profile: false,
            chart: true
        }))
    }

    function onNodeClicked() {
        setState(prevState => ({
            ...prevState,
            node: !prevState.node,
            connectButton: false
        }));
    }

    function handleNodeSend(event) {
        fetch(`http://localhost:3000/api/node/${event}`).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                setNodeList((prev) => {
                    let nd = { ...prev }
                    nd.singleNode = data
                    return nd
                })
                setState((prev) => {
                    let nd = { ...prev }
                    nd.person = true
                    return nd
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
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
                        <div className='py-1 ps-2'>
                            <Link href='/'>
                                <Image width={55} height={55} src={logo} alt='the weird logo'></Image>
                            </Link>
                        </div>
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
                                            <Button color='secondary' className='p-1 mt-3' type='submit'>Add Node</Button>
                                        </div>
                                    </form>
                                </AccordionDetails>
                            </Accordion>
                        </List>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={onChartClicked} >
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Chart"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={onNodeClicked}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Nodes"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={onAccountClicked}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Account"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Notifications"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Settings"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Invites"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        {state.person && (
                            <div className='flex flex-col items-center py-5'>
                                <h1 className='text-2xl'>{nodeList.singleNode.firstName} {nodeList.singleNode.lastName}</h1>
                                <p>Age: {nodeList.singleNode.age}</p>
                                <p>Location: {nodeList.singleNode.city} {nodeList.singleNode.state}</p>
                                <div>
                                    <Button className='py-1' color='secondary'>Edit</Button>
                                    <Button color="secondary">Delete</Button>
                                </div>
                            </div>
                        )}
                        <Divider />
                    </Drawer>
                </Box>
                <Box component="main" sx={{ marginTop: `64px`, ml: `${drawerWidth}px` }}>
                    <div className='flex justify-around columns-2 bg-stone-950'>
                        <div>
                            {state.profile && !state.chart && (
                                <div className='flex p-5'>
                                    <div className='flex flex-col text-white'>
                                        <div className='py-1'>
                                            <TextField id="accountName" label="Name" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountEmail" label="Email" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountPhoneNumber" label="Phone Number" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountAge" label="Age" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountCity" label="City" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountState" label="State" variant="standard" />
                                        </div>
                                        <div className='py-1'>
                                            <TextField id="accountColor" label="Color" variant="standard" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {state.chart && !state.profile && (
                                <MyGraph
                                    sendNode={handleNodeSend}
                                ></MyGraph>
                            )}
                        </div>
                        <div style={{ height: "600px", width: "200px" }} className='text-white'>
                            {state.node && !state.connectButton && (
                                <div className="h-full overflow-y-auto">
                                    <h1 className='text-2xl font-bold sticky top-0 bg-stone-950 z-10 p-4'>Your Nodes</h1>
                                    <Divider />
                                    <div className="table-container">
                                        <Table>
                                            {nodeList.nodeListArray.map(item => (
                                                <TableRow className='flex flex-row items-center ' key={item.id}>
                                                    <Avatar alt={item.firstName} src={eddy} sx={{ width: 35, height: 35 }} />
                                                    <TableCell className='text-1xl'>
                                                        {item.firstName}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </Table>
                                    </div>
                                </div>
                            )}
                            {state.connectButton && !state.node && (
                                <div className="h-full overflow-y-auto">
                                    <h1 className='text-2xl font-bold sticky top-0 bg-stone-950 z-10 p-4'>Connections</h1>
                                    <Divider />
                                    <Table>
                                        {nodeList.namedConnect.map(item => (
                                            <TableRow className='flex flex-row items-center ' key={item.id} >
                                                <TableCell className='py-2' >
                                                    {item.personOne} + {item.personTwo}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                </Box>
            </ThemeProvider>
        </>
    );
}