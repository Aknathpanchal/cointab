import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Homepage from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
