import "./App.css";
import AuthProvider from "./auth/AuthContext";
import PrivateRoute from "./core/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import HackerLogin from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HackerLogin />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
