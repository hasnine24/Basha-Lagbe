import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./assets/pages/product_page";
import AddPropertyPage from "./assets/pages/add_property_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
