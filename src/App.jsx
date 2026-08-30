import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import ProductPage from "./assets/pages/product_page";
import AddPropertyPage from "./assets/pages/add_property_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/" element={<ProductPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
