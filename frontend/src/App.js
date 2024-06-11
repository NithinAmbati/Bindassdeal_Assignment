import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import LoginRoute from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={LoginRoute} />
        <Route exact path="/sign-up" Component={SignUp} />
        <Route exact path="/" Component={Home} />
        <Route path="/not-found" Component={NotFound} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
