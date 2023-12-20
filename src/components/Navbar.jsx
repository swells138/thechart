"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../app/favicon.ico'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'


const Navbar = () => {
    return (
        <>

            <AppBar
                position="static"
                color="default"
                elevation={0}
                style={{ background: '#000000' }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        <Link href='/'>
                            <Image width={75} height={75} src={logo} alt='the weird logo'></Image>
                        </Link>
                    </Typography>
                    <nav>
                        <div className='columns-4'>
                            <div>
                                <Link
                                    variant="button"
                                    href="/charts"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    <h1 className='text-gray-500 font-bold'>Charts</h1>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    variant="button"
                                    href="/community"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    <h1 className='text-gray-500 font-bold'>Community</h1>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    variant="button"
                                    href="/connect"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    <h1 className='text-gray-500 font-bold'>My Chart</h1>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    variant="button"
                                    href="/profile"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    <h1 className='text-gray-500 font-bold'>Profile</h1>
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar