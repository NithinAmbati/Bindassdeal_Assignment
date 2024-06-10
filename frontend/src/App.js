import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./components/LoginRoute";
import "bootstrap/dist/css/bootstrap.css";
import SignUp from "./components/SignUpRoute";
import Home from "./components/HomeRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={LoginRoute} />
        <Route exact path="/sign-up" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
