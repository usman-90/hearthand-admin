import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Layout from "./components/layout/Layout";
import Login from "./pages/login";


const App: React.FC = () => {

    let user = window.localStorage.getItem("userData")

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="*" element={<MainLayout />}/>
                        {
                            !user ? (
                                <Route path="/" element={<Login />} />
                            ) : (
                                <Route path="/auth" element={<Layout />}>
                                hello
                                </Route>
                            )
                        }
                </Routes>
        </BrowserRouter>
    );
};

export default App;
