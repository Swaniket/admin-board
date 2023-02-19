import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import { toggleMode } from "state";

import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const appBarStyles = {
    position: "static",
    background: "none",
    boxShadow: "none",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    dispatch(toggleMode());
  };

  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE  */}
        <FlexBetween>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>

          <FlexBetween
            backgroundColor={theme?.palette?.background?.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE  */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={toggleTheme}>
            {theme?.palette?.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
