import { useMemo } from "react";
import { useSelector } from "react-redux";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "pages/layout";
import Dashboard from "pages/dashboard";

function App() {
  // For theme of the application
  const mode = useSelector((state) => state?.global?.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
