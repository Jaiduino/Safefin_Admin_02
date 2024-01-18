import "./App.css";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home";
import Application from "./Pages/Application";

import React from "react";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Claim_Applications from "./Pages/Claim_Applications";
import Save_retailer from "./Pages/Save_retailer";
import RetailersList from "./Pages/RetailersList";
import RetailerDetails from "./Pages/RetailerDetails";
import Applications_Component from "./Pages/ApplicationsComponent";
function Dashboard() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="application" element={<Application />} />{" "}
          <Route path="claim_application" element={<Claim_Applications />} />
          <Route path="add_retailers" element={<Save_retailer />} />
          <Route path="retailers_list" element={<RetailersList />} />
          <Route
            path="retailers_applications/:id"
            element={<Applications_Component />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Dashboard;
