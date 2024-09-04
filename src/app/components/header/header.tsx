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
        <div className={"sticky top-0 z-50 grid grid-cols-2 bg-site-primary-color"}>
                <div className={"grid-cols-subgrid pl-5 md:py-1"}>
                    <a href={"/"}>
                        <Image src={"/logo.jpg"} alt={"Anthony Rodrigues"} width={60} height={50} fill={false}/>
                    </a>
                </div>
                <div className={"grid-cols-subgrid justify-self-end"}>
                    <Menubar model={items} className={"bg-site-primary-color"}/>
                </div>
        </div>
    );
}
