// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import PropertyPage from "./pages/PropertyPage";
import HostForm from "./components/HostForm";
import HostSuccess from "./pages/HostSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import MyListing from "./pages/MyListing";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5A5F",
    },
    secondary: {
      main: "#767676",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily:
      "Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/host"
                element={
                  <ProtectedRoute>
                    <HostForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute>
                    <HostRouteHandler />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/success"
                element={
                  <ProtectedRoute>
                    <HostSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host-application"
                element={
                  <ProtectedRoute>
                    <div>Host Application Form</div>
                  </ProtectedRoute>
                }
              />
              // Add this to your routes in App.jsx
              <Route
                path="/my-listing"
                element={
                  <ProtectedRoute>
                    <MyListing/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

function HostRouteHandler() {
  const { userData } = useAuth();

  return userData?.isHost ? (
    <div>Host Dashboard</div>
  ) : (
    <Navigate to="/host-application" />
  );
}

export default App;
