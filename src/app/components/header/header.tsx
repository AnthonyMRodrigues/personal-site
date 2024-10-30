'use client';
import React from 'react';
import Link from "next/link";


import {Button} from "primereact/button";
export default function Header() {
    const [hiddenMenu, setHiddenMenu] = React.useState(true);
    return (
        <header className={"border-b md:h-24 bg-site-primary-color"}>
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between flex-wrap p-6">
                    <div className="flex items-center flex-shrink-0 text-black">
                        <Link href="/" className={"font-bold text-xl md:text-4xl tracking-tight hover:underline text-white"}>
                            Anthony Rodrigues
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <Button onClick={() => setHiddenMenu(!hiddenMenu)}
                                className="flex items-center px-3 py-2 border rounded text-white border-black"
                        >
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </Button>
                    </div>
                    <div className={`w-full block lg:flex lg:items-center lg:w-auto ${!hiddenMenu ? '' : 'hidden'}`}>
                        <div className="text-sm md:text-xl lg:flex-grow ">
                            <Link href="/" className="lg:inline-block md:px-4 my-4 text-white hover:underline block">Home</Link>
                            <Link href="/contact" className="md:px-4 lg:inline-block text-white hover:underline">Contact me</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
