'use client';
import React from 'react';
import Image from "next/image";

import { Menubar } from 'primereact/menubar';

import './header.css';
export default function Header() {
    const items = [
        {
            label: 'About Me',
            icon: 'pi pi-user',
            url: '/about',
            className: 'justify-center bg-site-secondary-color menu-item-black rounded-full mx-5 border-site-tertiary-color border-2',
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            url: '/contact',
            className: 'justify-center bg-site-secondary-color menu-item-black rounded-full border-site-tertiary-color border-2',
        }
    ];
    return (
        <div className={"sticky top-0 z-50"}>
            <div className={"grid grid-cols-4 grid-gap-1 bg-site-primary-color h-16"}>
                <div className={"mt-1.5 ml-40"}>
                    <Image src={"/logo.png"} alt={"Anthony Rodrigues"} width={50} height={50} fill={false}/>
                </div>
                <div className={"flex mt-4"}>
                    <h1 >Anthony Rodrigues</h1>
                </div>
                <div className={"col-span-2 col-end-7 mr-40"}>
                    <Menubar model={items} className={"bg-site-primary-color"}/>
                </div>
            </div>
        </div>
    );
}
