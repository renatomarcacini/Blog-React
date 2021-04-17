import React from 'react';
import Profile from '../components/Profile';

export default function MainLayout({ children }) {
    return (
        <>
            <div className="App">
                <Profile />
                {children}
            </div>
        </>
    );
}