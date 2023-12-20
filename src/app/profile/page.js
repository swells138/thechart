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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button, Table, TableCell, TableRow, TextField } from '@mui/material';
import logo from "../favicon.ico"
import Link from 'next/link'
import Image from 'next/image'
import { create } from 'domain';

const drawerWidth = 240;
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const page = () => {
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
                                    Profile
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
                                {/* <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Add a Node</Typography>
                                </AccordionSummary> */}
                                <AccordionDetails>
                                    {/* <form id='form' action={handleCreate}>
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
                                    </form> */}
                                </AccordionDetails>
                            </Accordion>
                        </List>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton >
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
                    </Drawer>
                </Box>
                <Box component="main" sx={{ marginTop: `80px`, ml: `${drawerWidth}px` }}>
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
                </Box>
            </ThemeProvider>
        </>
    )
}

export default page