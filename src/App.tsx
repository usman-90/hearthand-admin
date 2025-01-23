import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Layout from "./components/layout/Layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Donations from "./pages/donations";
import NGOs from "./pages/ngos";


const App: React.FC = () => {

    let user = window.localStorage.getItem("userData")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<MainLayout />} />
                {
                    !user ? (
                        <Route path="/" element={<Login />} />
                    ) : (
                        <Route path="/auth" element={<Layout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="users" element={<Users/>} />
                            <Route path="donations" element={<Donations/>} />
                            <Route path="ngos" element={<NGOs/>} />
                        </Route>
                    )
                }
            </Routes>
        </BrowserRouter>
    );
};

export default App;
