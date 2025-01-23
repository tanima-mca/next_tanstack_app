// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             ></IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography sx={{ textAlign: "center" }}>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: "center" }}>
//                     {setting}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;

import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Avatar,
} from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import ProfileModal from "@/pages/cms/profiledetails/profiledetails";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router= useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productMenuAnchor, setProductMenuAnchor] =useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profilePic = "https://example.com/profile-pic.jpg";
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  

  const handleLogin = () => {
   router.push(`/auth/login`)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);


  const productSubItems = [
    { name: "Product Create", path: "/cms/create" },
    { name: "Product List", path: "/cms/list" },
    { name: "Product Update", path: "/cms/list/[slug].tsx" },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const handleProductMenuToggle = () => {
    setIsProductMenuOpen((prevOpen) => !prevOpen);
  };

  const drawerList = (
    <Box
      sx={{
        width: "100vw",
        paddingTop: "10px",
        paddingBottom: "10px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={handleProductMenuToggle}>
          <ListItemText primary="Product" />
          {isProductMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isProductMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {productSubItems.map((item) => (
              <ListItem key={item.name} sx={{ pl: 4 }}>
                <Link href={item.path} passHref>
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem>
          {isLoggedIn ? (
            <Button onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} style={{ textDecoration: "none", color: "inherit" }}>
              Sign In
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <ProductionQuantityLimitsIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            My Beauty Product App
          </Typography>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              color="inherit"
              onMouseEnter={(e) => setProductMenuAnchor(e.currentTarget)}
              aria-controls="product-menu"
              aria-haspopup="true"
            >
              Product
            </Button>
            <Menu
              id="product-menu"
              anchorEl={productMenuAnchor}
              open={Boolean(productMenuAnchor)}
              onClose={() => setProductMenuAnchor(null)}
              MenuListProps={{ onMouseLeave: () => setProductMenuAnchor(null) }}
              sx={{ mt: 1 }}
            >
              {productSubItems.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => setProductMenuAnchor(null)}
                >
                  <Link href={item.path} passHref>
                    {item.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            {isLoggedIn ? (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            ) : (
              <Button onClick={handleLogin} color="inherit">
                Sign In
              </Button>
            )}
          </Box>

             <Box sx={{ display: "flex", alignItems: "center" }}>
            {profilePic ? (
              <Avatar
                src={profilePic}
                sx={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={openModal}
              /> 
            ) : (
              <Avatar
                sx={{ bgcolor: "primary.main", cursor: "pointer" }}
                onClick={openModal}
              >
                ?
              </Avatar>
            )}  

            {/* Profile Modal */}
              {isModalOpen && (
              <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
            )}
          </Box>   

{/* <Link href="/profile" style={{ textDecoration: "none", color: "inherit" }}>
            {profilePic ? <Avatar src={profilePic} sx={{ width: 40, height: 40 }} /> : <Avatar sx={{ bgcolor: "primary.main" }}>?</Avatar>}
          </Link> */}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "100vw",
                  margin: 0,
                  padding: 0,
                  overflowX: "hidden",
                },
              }}
            >
              {drawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;



