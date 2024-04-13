import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";

import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { Navigation } from "./components/Navigation";
import { SnackbarProvider } from "./context/snackbar";
import { UserProvider, useUser } from "./context/user";
import Checkout from "./pages/Checkout/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { Product } from "./pages/Product";
import Products from "./pages/Products";
import SignUp from "./pages/Signup";

const palette = {
  primary: {
    50: "#f8fbf5",
    100: "#eaf2e2",
    200: "#cfe0ba",
    300: "#b3cf93",
    400: "#97be6c",
    500: "#506c30",
    600: "#415827",
    700: "#33451f",
    800: "#243116",
    900: "#161d0d",
  },
  // neutral: {
  //   50: "#fdf8f4",
  //   100: "#faeade",
  //   200: "#f3cfb2",
  //   300: "#ecb386",
  //   400: "#e18a44",
  //   500: "#d17021",
  //   600: "#8f4c17",
  //   700: "#633510",
  //   800: "#371d09",
  //   900: "#0b0602",
  // },
};

const bootstrapTheme = extendTheme({
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
});

function App() {
  return (
    <CssVarsProvider theme={bootstrapTheme}>
      <SnackbarProvider>
        <CssBaseline />
        <UserProvider>
          {/* <CssBaseline /> */}
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route element={<Authetnicate />}></Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </SnackbarProvider>
    </CssVarsProvider>
  );
}

export { App as default };

const Authetnicate = () => {
  const navigate = useNavigate();
  const { isAuth } = useUser();
  if (!isAuth)
    return navigate("/login", {
      replace: true,
    });
  return <Outlet />;
};
