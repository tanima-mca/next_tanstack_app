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
import { useUserStore } from "@/toolkit/store/store";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, setToken, user, setUser } = useUserStore();
  const [productMenuAnchor, setProductMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const profilePic = user?.profilePic || "https://example.com/profile-pic.jpg";

  // Sync Zustand state with cookies on component mount
  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    } else {
      setToken("");
    }
  }, [cookies.token, setToken, setUser]);

  // Logout function
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setToken("");

    toast.success("Logout Successfully");
    router.push("/auth/login");
  };

  // Login function
  const handleLogin = () => {
    router.push("/auth/login");
  };

  const productSubItems = [
    { name: "Product Create", path: "/cms/create" },
    { name: "Product List", path: "/cms/list" },
    { name: "Product Update", path: "/cms/list/[slug]" },
  ];

  // Drawer toggle function
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

  return (
    <AppBar position="static" style={{ backgroundColor: "#ce93d8" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ProductionQuantityLimitsIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          My Beauty Product App
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
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

          {token ? (
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
          <Avatar
            src={profilePic}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={() => setIsModalOpen(true)}
          />
          {isModalOpen && (
            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" color="inherit" onClick={toggleDrawer(true)}>
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
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              sx={{ width: "100vw", padding: "10px" }}
            >
              <List>
                <ListItemButton
                  onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                >
                  <ListItemText primary="Product" />
                  {isProductMenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isProductMenuOpen} timeout="auto">
                  <List component="div" disablePadding>
                    {productSubItems.map((item) => (
                      <ListItem key={item.name} sx={{ pl: 4 }}>
                        <Link href={item.path}>
                          <ListItemText primary={item.name} />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                <ListItem>
                  {token ? (
                    <Button
                      onClick={handleLogout}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={handleLogin}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Sign In
                    </Button>
                  )}
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
