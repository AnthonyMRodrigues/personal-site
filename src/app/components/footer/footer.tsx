'use client';
import React from 'react';

export default function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <div className={"bg-site-primary-color h-36 grid grid-rows-3 grid-flow-col mt-10"}>
            <div className={"flex flex-col items-center justify-center md:text-2xl"}>
                <h1 className="text-white">Copyright ©{currentYear} Miha Boutique de Perfumes.
                    <br />
                    Todos os direitos reservados.
                </h1>
            </div>
        </div>
    );
}
