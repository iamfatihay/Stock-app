import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate, useLocation} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const internalLinks = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
];

const iconStyle = {
  color: "inherit",
  "& .MuiSvgIcon-root": { color: "inherit" },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    color: "primary.main",
    "& .MuiSvgIcon-root": { color: "primary.main" },
  },
  "&.Mui-selected": {
    backgroundColor: "primary.light",
    color: "primary.contrastText",
    "& .MuiSvgIcon-root": { color: "primary.contrastText" },
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};


const MenuListItems = () => {
    const navigate= useNavigate()
    const location = useLocation()
    
  return (
    <List>
      {internalLinks.map((item, index) => {
        const isSelected = location.pathname === item.url;
        return (
          <ListItem key={item.title} disablePadding>
            <ListItemButton 
              sx={iconStyle} 
              onClick={() => navigate(item.url)}
              selected={isSelected}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
      {/* Admin-only external links removed - JSON Server doesn't have a real admin panel */}
    </List>
  );
}

export default MenuListItems