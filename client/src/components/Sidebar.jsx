import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarViewMonthOutlined,
  AdminPanelSettingsOutlined,
  PieChartOutline,
  TrendingUpOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

/*
    Stores all the Nav menu items present in the sidebar
    icon: null - It Signifies that its a heading, not an actual option.
*/
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Tranactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarViewMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutline />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Perfomance",
    icon: <TrendingUpOutlined />,
  },
];

function Sidebar({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");

  // Everytime our URL changes, set that value to active state
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const drawerStyles = {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      color: theme?.palette?.secondary[200],
      backgroundColor: theme?.palette?.background?.alt,
      boxSizing: "border-box",
      borderWidth: isNonMobile ? 0 : "2px",
      width: drawerWidth,
    },
  };

  const SidebarItems = ({ text, icon, lowerCaseText }) => {
    return (
      <ListItem key={text} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`/${lowerCaseText}`);
            setActive(lowerCaseText);
          }}
          sx={{
            backgroundColor:
              active === lowerCaseText
                ? theme?.palette?.secondary[300]
                : "transparent",
            color:
              active === lowerCaseText
                ? theme?.palette?.primary[600]
                : theme?.palette?.secondary[100],
          }}
        >
          <ListItemIcon
            sx={{
              ml: "2rem",
              color:
                active === lowerCaseText
                  ? theme?.palette?.primary[600]
                  : theme?.palette?.secondary[200],
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
          {active === lowerCaseText && (
            <ChevronRightOutlined sx={{ ml: "auto" }} />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={drawerStyles}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme?.palette?.secondary?.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Admin Board
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lowerCaseText = text.toLowerCase();
                return (
                  <SidebarItems
                    text={text}
                    icon={icon}
                    lowerCaseText={lowerCaseText}
                  />
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
