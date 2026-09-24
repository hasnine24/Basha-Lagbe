import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Home from "./pages/tahmid/Home";
import Login from "./pages/tahmid/Login";
import Register from "./pages/tahmid/Register";
import GetStarted from "./pages/tahmid/GetStarted";

import Properties from "./pages/hasnine/Properties";

import ProductPage from "./pages/hasnine/product_page";
import AddPropertyPage from "./pages/hasnine/add_property_page";
import EditPropertyPage from "./pages/hasnine/edit_property_page";
import PrivateRoute from "./utils/PrivateRoute";
import RoleRoute from "./utils/RoleRoute";
import PublicRoute from "./utils/PublicRoute";

import MyProperties from "./pages/waseq/MyProperties";
import RequestPage from "./pages/waseq/RequestPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<ProductPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/requests" element={<RequestPage />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["advertiser"]} />}>
          <Route path="/add-property" element={<AddPropertyPage />} />
          <Route path="/edit-property" element={<EditPropertyPage />} />
          <Route path="/edit-property/:id" element={<EditPropertyPage />} />
          <Route path="/my-properties" element={<MyProperties />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
