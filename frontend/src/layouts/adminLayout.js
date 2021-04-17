import React from 'react';
import Dashboard from '../components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="App">
                <Dashboard />
                {children}
            </div>
            <ToastContainer />
        </>
    );
};