import React from 'react';
import Home from '../Pages/Home/Home';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;