import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/tahmid/Home";
import Login from "./pages/tahmid/Login";
import Register from "./pages/tahmid/Register";
import Profile from "./pages/tahmid/Profile";
import Properties from "./pages/tahmid/Properties";

import ProductPage from "./pages/hasnine/product_page";
import AddPropertyPage from "./pages/hasnine/add_property_page";
import MyProperties from "./pages/waseq/MyProperties";
import EditPropertyPage from "./pages/waseq/EditPropertyPage";
import RequestPage from "./pages/waseq/RequestPage";
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
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/requests" element={<RequestPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/edit-property/:id" element={<EditPropertyPage />} />
      </Route>

      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
