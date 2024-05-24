'use client';
import React from 'react';

export default function Footer() {
    let initialYear = process.env.NEXT_PUBLIC_INITIAL_YEAR;
    let currentYear = new Date().getFullYear();
    return (
        <div className={"bg-site-primary-color h-36 grid grid-rows-3 grid-flow-col"}>
            <div className={"justify-center flex flex-row items-center mt-10"}>
                <a href={"https://github.com/AnthonyMRodrigues"} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-github text-white text-2xl"}></span>
                </a>
                <a href={"https://www.linkedin.com/in/anthonymrodrigues/"} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-linkedin text-white text-2xl"}></span>
                </a>
                <a href={"https://linkedin.com"} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-telegram text-white text-2xl"}></span>
                </a>
                <a href={"https://www.goodreads.com/review/list/111135507?shelf=read"} target={"_blank"}
                   title="Anthony Rodrigues's book recommendations, liked quotes, book clubs, book lists (read shelf)"
                   className={"mr-5"}
                >
                    <img
                      alt="Anthony Rodrigues's book recommendations, liked quotes, book clubs, book lists (read shelf)"
                      src="https://s.gr-assets.com/images/badge/badge1.jpg"
                    />
                </a>
            </div>
            <div className={"flex flex-col items-center justify-center"}>
                <h1>Copyright ©{initialYear}-{currentYear} Anthony Rodrigues. All rights reserved.</h1>
            </div>
        </div>
    );
}
