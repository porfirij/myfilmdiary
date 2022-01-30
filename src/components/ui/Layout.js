import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex items-center justify-center grow-0 bg-blue-400">
                <Navigation />
            </nav>

            <main className="w-full flex items-start justify-center flex-grow bg-blue-200 border-blue-800 py-6">
                <Outlet />
            </main>

            <footer className="grow-0 text-white bg-blue-400">
                <Footer />
            </footer>
        </div>
    )
}

export default Layout;
