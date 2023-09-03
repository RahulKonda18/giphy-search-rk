import { Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Start from "./Components/Start";
import NotFound from "./Components/NotFound";
import Home from "./Components/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" Component={Start} />
      <Route exact path="/login" Component={LogIn} />
      <Route exact path="/home" Component={Home} />
      <Route exact path="/signup" Component={SignUp} />
      <Route path="*" Component={NotFound} />
    </Routes>
  );
}

export default App;
