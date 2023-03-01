import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { Link as RouterLink } from "react-router-dom";
import instance from "../axios.create";

const drawerWidth = 240;

export default function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    instance.post("authen",{},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "ok") {
          setAuth(true);
        } else {
          setAuth(false);
          
        }
      });

  }, []);
  const handlelogout = (event) => {
    localStorage.removeItem("token");
    window.location = "/home";
    event.preventDefault();
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton href="/home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton href="/room">
          <ListItemIcon>
            <BedroomChildIcon />
          </ListItemIcon>
          <ListItemText primary="Room" />
        </ListItemButton>
        <ListItemButton href="/room">
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
      <Divider />
      {!auth && (
        <ListItemButton href="/login">
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText to="/login" primary="Login" />
        </ListItemButton>
      )}
      {auth && (
        <List>
          <ListItemButton href="/profile">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton href="/home">
            <ListItemIcon>
              <RoomPreferencesIcon />
            </ListItemIcon>
            <ListItemText primary="My Room" />
          </ListItemButton>
          <ListItemButton href="/home">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText onClick={handlelogout} primary="Log Out" />
          </ListItemButton>
        </List>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ background: "transparent" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>

          <MenuItem
            component={RouterLink}
            to="/home"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Home
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/room"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Room
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/home"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Contact
          </MenuItem>
          {!auth && (
            <MenuItem
              component={RouterLink}
              to="/login"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Login
            </MenuItem>
          )}

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>My room</MenuItem>
                <MenuItem component={RouterLink} to="/" onClick={handlelogout}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
