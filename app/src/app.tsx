import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Officer from "./pages/Officer/Officer";
import Department from "./pages/Department/Department";
import Project from "./pages/Project/Project";
import Transactions from "./pages/Transaction/Transaction";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {theme} from "./Theme";
import "./App.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/officer" element={<Officer />} />
        <Route path="/departments/:d_id" element={<Department />} />
        <Route path="/projects/:prj_id" element={<Project />} />
        <Route path="/transactions/:trx_id" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
