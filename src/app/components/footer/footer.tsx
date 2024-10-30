'use client';
import React from 'react';
import {faMedium} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className={"bg-site-primary-color"}>
            <div className={"flex flex-row items-center justify-center"}>
                <a href={process.env.NEXT_PUBLIC_GITHUB_ACCOUNT} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-github text-white text-2xl"}></span>
                </a>
                <a href={process.env.NEXT_PUBLIC_LINKEDIN_ACCOUNT} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-linkedin text-white text-2xl"}></span>
                </a>
                <a href={process.env.NEXT_PUBLIC_TELEGRAM_ACCOUNT} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-telegram text-white text-2xl"}></span>
                </a>
                <a href={process.env.NEXT_PUBLIC_MEDIUM_ACCOUNT} target={"_blank"} className={"mr-5"}>
                    <FontAwesomeIcon icon={faMedium} className={"text-white"}/>
                </a>
                <a href={process.env.NEXT_PUBLIC_GOODREADS_ACCOUNT} target={"_blank"} className={"mr-5"}
                   title="Anthony Rodrigues's book recommendations, liked quotes, book clubs, book lists (read shelf)"
                >
                    <img
                        alt="Anthony Rodrigues's book recommendations, liked quotes, book clubs, book lists (read shelf)"
                        src="https://s.gr-assets.com/images/badge/badge1.jpg"
                    />
                </a>
            </div>
            <div className={"flex flex-col items-center justify-center"}>
                <h1>Copyright © {currentYear} - Anthony Rodrigues</h1>
                <h3>All rights reserved.</h3>
            </div>
            </div>
        </footer>
    );
}
