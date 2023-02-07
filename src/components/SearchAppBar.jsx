import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import AuthContext from "../store/authContext";
import { useContext } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const authCtx = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {authCtx.userId && (
            <>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h2"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
                >
                  Macro
                </Typography>
              </Link>
              <Search onChange={(e) => authCtx.searchRecipes(e.target.value)}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Recipes…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Filter My Recipes">
                  <FormControlLabel
                    label="My Recipes"
                    control={<Switch {...label} name="default" />}
                    onChange={(e) =>
                      authCtx.toggleUserRecipes(e.target.checked)
                    }
                  />
                </Tooltip>

                <Tooltip title="Add Recipe">
                  <IconButton
                    size="large"
                    aria-label="Add Recipe"
                    color="inherit"
                  >
                    <AddIcon onClick={() => navigate("/addRecipe")} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Home">
                  <IconButton size="large" aria-label="Home" color="inherit">
                    <HomeIcon onClick={() => navigate("/home")} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton size="large" aria-label="Logout" color="inherit">
                    <LogoutIcon onClick={() => authCtx.logout()} />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
