"use client"
import React, {useState} from 'react';
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

export default function PermanentDrawerLeft({ data, rel, create, connect,namedConnect }) {
    const [node, showNode] = useState(false)
    const [connectButton, showConnect] = useState(false)

    function handleCreate(event) {
        create(event)
    }

    function handleConnect(event) {
        connect(event)
    }

    function onNodeClicked() {
        showNode((prev) => !prev);
        if (connect) {
          showConnect(false);
        }
      }
    
      function onConnectClicked() {
        showConnect((prev) => !prev);
        if (node) {
          showNode(false);
        }
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
                                data={data} 
                                rel={rel} 
                                ></MyGraph>
                            </div>
                            <div>
                                {node && !connectButton && (
                                    <div>
                                        <h1 className='text-2xl font-bold'>Your Nodes</h1>
                                        <Divider />
                                        <ul>
                                            {data.map(item => (
                                                <li className='p-1' key={item.id}>{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {connectButton && !node && (
                                    <div>
                                        <h1 className='text-2xl font-bold'>Your Connections</h1>
                                        <Divider />
                                        <ul>
                                            {namedConnect.map(item => (
                                                <li className='p-1' key={item.id}>{item.personOne} + {item.personTwo}</li>
                                                ))}
                                        </ul>
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
                                        <input className='border rounded text-black' id="name" name='name' placeholder='First Name'></input>
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
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}