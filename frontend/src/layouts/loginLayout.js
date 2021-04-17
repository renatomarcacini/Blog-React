import React from 'react';

import Header from '../components/Header';
import Logon from '../pages/Logon';

export default function LoginLayout({children}){
    return(
        <>
            <Header/>
            <div className="App">
                <Logon/>
            </div>
        </>
    );
}