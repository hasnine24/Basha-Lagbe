import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Properties from "./pages/Properties";

import ProductPage from "./assets/pages/product_page";
import AddPropertyPage from "./assets/pages/add_property_page";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<ProductPage />} />
      <Route path="/add-property" element={<AddPropertyPage />} />
    </Routes>
  );
}

export default App;
