'use client';
import React from 'react';
import Image from "next/image";


import './header.css';
import {Button} from "primereact/button";
export default function Header() {
    const [hiddenMenu, setHiddenMenu] = React.useState(true);
    return (
        <nav className={"bg-site-primary-color"}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <a href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse ml-4">
                    <Image src={"/logo.jpg"} alt={"Anthony Rodrigues"} width={60} height={50} fill={false}/>
                </a>
                <Button onClick={() => setHiddenMenu(!hiddenMenu)} className="md:hidden mr-4">
                    <svg className="w-5 h-5" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </Button>
                    <div className="w-full md:block md:w-auto pl-5" id="navbar-default" hidden={hiddenMenu}>
                        <ul className="flex flex-col p-4 mt-2 md:flex-row md:space-x-8 md:mt-0 ">
                            <li>
                                <a href="/"
                                   className="block py-2 px-3 text-white md:dark:hover:text-blue-500 rounded md:p-0">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about"
                                   className="block py-2 px-3 text-white md:dark:hover:text-blue-500 rounded md:p-0">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact"
                                   className="block py-2 px-3 text-white md:dark:hover:text-blue-500 rounded md:p-0">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>
        </nav>
);
}
