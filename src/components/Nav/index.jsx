/* eslint-disable jsx-a11y/anchor-is-valid,react/button-has-type,no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthStatus from "../AuthStatus";
import StravaAuthButton from "../StravaAuthButton";
import StravaSync from "../StravaSync";

import Logo from "../../Logo.svg";

const NAV = [
    {
        title: "Home",
        to: "/"
    },
    {
        title: "Run",
        to: "/run"
    },
    {
        title: "Ride",
        to: "/ride"
    },
    {
        title: "NEdd",
        to: "/eddington"
    }
];

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();

    return (
        <NavLink to={to} className={`px-3 py-2 rounded-md text-sm font-medium text-gray-300 ${location.pathname === to ? "bg-gray-900" : "hover:text-white hover:bg-gray-700"}`}>
            {children}
        </NavLink>
    );
};

CustomNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

const MobileNavToggle = ({ onClick }) => {
    return (
        <div className="-mr-2 flex md:hidden">
            <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={onClick}
            >
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

MobileNavToggle.propTypes = {
    onClick: PropTypes.func.isRequired
};

const Nav = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const { profile_medium: profileImage, firstname, lastname, username } = useSelector((state) => state.athlete.details);

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <img className="h-8 w-8" src={Logo} alt="Advanced Stats" />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {NAV.map(({ title, to }) => (
                                    <CustomNavLink key={to} to={to}>
                                        {title}
                                    </CustomNavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <StravaSync />

                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        id="user-menu"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={profileImage} alt="" />
                                    </button>
                                </div>

                                <div
                                    className={`${profileMenuOpen ? "" : "hidden"} z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Your Profile
                                    </a>

                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Settings
                                    </a>

                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                        Sign out
                                    </a>

                                    <div className="px-4 py-2">
                                        <AuthStatus />
                                    </div>
                                    <div className="px-4 py-2">
                                        <StravaAuthButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MobileNavToggle onClick={() => setMobileNavOpen(!mobileNavOpen)} />
                </div>
            </div>

            <div className={`${mobileNavOpen ? "" : "hidden"} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {NAV.map(({ title, to }) => (
                        <NavLink key={to} to={to} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">
                            {title}
                        </NavLink>
                    ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={profileImage} alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">
                                {firstname} {lastname}
                            </div>
                            <div className="text-sm font-medium leading-none text-gray-400">{username}</div>
                        </div>
                        <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                            Your Profile
                        </a>

                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                            Settings
                        </a>

                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                            Sign out
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
