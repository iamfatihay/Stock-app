import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Sales from "../pages/Sales";
import Firms from "../pages/Firms";
import Brands from "../pages/Brands";
import Purchases from "../pages/Purchases";

const AppRouter = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
             <Route path="purchases" element={<Purchases/>} />
            <Route path="sales" element={<Sales/>} />
            <Route path="products" element={<Products/>} />
            <Route path="firms" element={<Firms/>} />
            <Route path="brands" element={<Brands/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
