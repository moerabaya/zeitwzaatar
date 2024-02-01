import PersonIcon from "@mui/icons-material/Person";
import { Button, Stack, useColorScheme } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import DialogTitle from "@mui/joy/DialogTitle";
import Drawer from "@mui/joy/Drawer";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ModalClose from "@mui/joy/ModalClose";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import React from "react";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/user";
import { Cart } from "./Cart";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

const Navigation = () => {
  const [open, setOpen] = React.useState(false);
  const { isAuth, loading, user } = useUser();
  const { mode } = useColorScheme();
  const location = useLocation();
  const page = location.pathname.replace(/\/$/, "");

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: mode === "dark" ? "neutral.900" : "neutral.50",
        borderBottom: "1px solid",
        borderBottomColor: mode === "dark" ? "neutral.800" : "neutral.50",
      }}
      p="16px"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            marginInlineEnd: "1em",
            borderRadius: "50%",
          }}
        >
          <LanguageRoundedIcon />
        </IconButton>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed={page === "" ? "true" : "false"}
          component="a"
          href="/"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Home
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/products"
          aria-pressed={page === "/products" ? "true" : "false"}
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Products
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/about"
          aria-pressed={page === "/about" ? "true" : "false"}
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          About
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/contact"
          aria-pressed={page === "/contact" ? "true" : "false"}
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Contact
        </Button>
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Acme Co.</DialogTitle>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <Cart />
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              variant="soft"
              src={user?.avatar ? user.avatar : null}
              size="sm"
            >
              {isAuth ? (
                `${user?.firstname[0]}${user?.lastname[0]}`
              ) : (
                <PersonIcon />
              )}
            </Avatar>
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            {isAuth && (
              <>
                <MenuItem>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      variant="soft"
                      src={user?.avatar ? user.avatar : null}
                    >{`${user?.firstname[0]}${user?.lastname[0]}`}</Avatar>

                    <Box sx={{ ml: 1.5 }}>
                      <Typography level="title-sm" textColor="text.primary">
                        {`${user?.firstname} ${user?.lastname}`}
                      </Typography>
                      <Typography level="body-xs" textColor="text.tertiary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <ListDivider />
              </>
            )}

            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem component="a" href="/blog/first-look-at-joy/">
              First look at Joy UI
              <OpenInNewRoundedIcon />
            </MenuItem>
            <MenuItem
              component="a"
              href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
            >
              Sourcecode
              <OpenInNewRoundedIcon />
            </MenuItem>
            <ListDivider />
            {isAuth ? (
              <a href={"/logout"}>
                <MenuItem>
                  <LogoutRoundedIcon />
                  Log out
                </MenuItem>
              </a>
            ) : (
              <Link to="/login">
                <MenuItem>
                  <LogoutRoundedIcon />
                  Login
                </MenuItem>
              </Link>
            )}
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Navigation;
