import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {useSelector} from "react-redux";

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
const externalLinks = [
    {
    title: "Admin Panel",
    icon: <SupervisorAccountIcon />,
    url: `${process.env.REACT_APP_BASE_URL}admin`,
  },
];

const iconStyle = {
  color: "white",
  "& .MuiSvgIcon-root": { color: "white" },
  "&:hover": {
    color: "red",
    "& .MuiSvgIcon-root": { color: "red" },
  },
};


const MenuListItems = () => {
    const navigate= useNavigate()
    const { isAdmin } = useSelector(state => state.auth);
  return (
    <List>
      {internalLinks.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton sx={iconStyle} onClick={() => navigate(item.url)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
      {isAdmin &&
        externalLinks.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton to={item.url} target="true" sx={iconStyle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}

export default MenuListItems