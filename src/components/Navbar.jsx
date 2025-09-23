"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/favicon.ico";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" color="default" elevation={0} style={{ background: "#FFFFFF" }}>
        <Toolbar className="flex-wrap">
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image width={75} height={75} src={logo} alt="the weird logo"></Image>
            </Link>
          </Typography>
          <div className="flex justify-between">
            <div className="mx-2">
              <Link href="/community">
                <h1 className="font-bold">Community</h1>
              </Link>
            </div>
            <div className="mx-2">
              <Link href="/charts">
                <h1 className="font-bold">Charts</h1>
              </Link>
            </div>
            <div className="mx-2">
              <Link href="/connect">
                <h1 className="font-bold">My Chart</h1>
              </Link>
            </div>
          </div>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
