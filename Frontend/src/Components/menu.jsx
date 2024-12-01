import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to track route changes
import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation(); // This will track the current path
    const [activeTab, setActiveTab] = useState('home');

    // Update active tab whenever location changes (including back navigation)
    useEffect(() => {
        const currentPath = location.pathname.replace('/', ''); // Get the path without the leading "/"
        setActiveTab(currentPath || 'home'); // Default to 'home' if the path is empty
    }, [location]); // Re-run when the location changes

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/${tab}`); // Navigate to the selected tab's route
    };

    return (
        <div className="menu-parent">
            <div
                className={`nav-item ${activeTab === 'home' ? 'active bounce' : ''}`}
                onClick={() => handleTabChange('home')}
            >
                <svg className="home" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                    <path fill="black" d="M16.81 4.3a1.25 1.25 0 0 0-1.62 0l-9.75 8.288a1.25 1.25 0 0 0-.44.953V26.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a2.5 2.5 0 0 1 2.5-2.5h5.004a2.5 2.5 0 0 1 2.5 2.5v7a.5.5 0 0 0 .5.5H26.5a.5.5 0 0 0 .5-.5V13.54a1.25 1.25 0 0 0-.44-.952zm-2.915-1.523a3.25 3.25 0 0 1 4.21 0l9.75 8.287A3.25 3.25 0 0 1 29 13.54V26.5a2.5 2.5 0 0 1-2.5 2.5h-4.996a2.5 2.5 0 0 1-2.5-2.5v-7a.5.5 0 0 0-.5-.5H13.5a.5.5 0 0 0-.5.5v7a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 3 26.5V13.54a3.25 3.25 0 0 1 1.145-2.476z" />
                </svg>
            </div>
            <div
                className={`nav-item ${activeTab === 'food' ? 'active bounce' : ''}`}
                onClick={() => handleTabChange('food')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="black" d="M1 22c0 .54.45 1 1 1h13c.56 0 1-.46 1-1v-1H1zM8.5 9C4.75 9 1 11 1 15h15c0-4-3.75-6-7.5-6m-4.88 4c1.11-1.55 3.47-2 4.88-2s3.77.45 4.88 2zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5z" />
                </svg>
            </div>
            <div
                className={`nav-item ${activeTab === 'barcode' ? 'active bounce' : ''}`}
                onClick={() => handleTabChange('barcode')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="black" d="M5.5 20q0 .214-.144.357T5 20.5H2.308q-.343 0-.576-.232t-.232-.576V17q0-.213.144-.356t.357-.144t.356.144T2.5 17v2.5H5q.213 0 .356.144t.144.357M22 16.5q.214 0 .357.144T22.5 17v2.692q0 .344-.232.576t-.576.232H19q-.213 0-.356-.144t-.144-.357t.144-.356T19 19.5h2.5V17q0-.213.144-.356t.357-.144M4.404 18q-.162 0-.283-.121T4 17.596V6.404q0-.162-.121-.283T4.404 6h1.192q.162 0 .283.121T6 6.404v11.192q0 .162-.121.283T5.596 18zM7.5 18q-.2 0-.35-.15T7 17.5v-11q0-.2.15-.35T7.5 6t.35.15t.15.35v11q0 .2-.15.35T7.5 18m2.904 0q-.162 0-.283-.121T10 17.596V6.404q0-.162.121-.283T10.404 6h1.192q.162 0 .283.121t.121.283v11.192q0 .162-.121.283t-.283.121zm3 0q-.162 0-.283-.121T13 17.596V6.404q0-.162.121-.283T13.404 6h2.192q.162 0 .283.121t.121.283v11.192q0 .162-.121.283t-.283.121zm4.096 0q-.2 0-.35-.15T17 17.5v-11q0-.2.15-.35T17.5 6t.35.15t.15.35v11q0 .2-.15.35t-.35.15m2 0q-.2 0-.35-.15T19 17.5v-11q0-.2.15-.35T19.5 6t.35.15t.15.35v11q0 .2-.15.35t-.35.15M5.5 4q0 .214-.144.357T5 4.5H2.5V7q0 .213-.144.356t-.357.144t-.356-.144T1.5 7V4.308q0-.343.232-.576t.576-.232H5q.213 0 .356.144t.144.357m13-.002q0-.213.144-.356T19 3.5h2.692q.344 0 .576.232t.232.576V7q0 .213-.144.356t-.357.144t-.356-.144T21.5 7V4.5H19q-.213 0-.356-.144t-.144-.357" />
                </svg>
            </div>
            <div
                className={`nav-item ${activeTab === 'shoplist' ? 'active bounce' : ''}`}
                onClick={() => handleTabChange('shoplist')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <g fill="black">
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
                    </g>
                </svg>
            </div>
            <div
                className={`nav-item ${activeTab === 'proset' ? 'active bounce' : ''}`}
                onClick={() => handleTabChange('proset')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none" stroke="black" strokeWidth="2">
                        <path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                        <circle cx="12" cy="7" r="3" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Menu;
