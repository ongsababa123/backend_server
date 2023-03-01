import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Room from "./components/Room";
import Superior from "./components/Superior";
import Pay1 from "./components/Pay1";
import Sandbox from "./components/Sandbox";

import Dashboard from "./dashborad/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/room",
    element: <Room/>
  },
  {
    path: "/superior",
    element: <Superior/>
  },
  {
    path: "/pay1",
    element: <Pay1/>
  },
  {
    path: "/sandbox",
    element: <Sandbox/>
  },
  {
    path: "/userdata",
    element: <Dashboard/>
  },
  

 
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);