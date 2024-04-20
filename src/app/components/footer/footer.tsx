import React from 'react';

export default function Footer() {
    let initialYear = 2024;
    let currentYear = new Date().getFullYear();
    return (
        <div className={"bg-site-primary-color h-36 grid grid-rows-3 grid-flow-col"}>
            <div className={"justify-center flex flex-row items-center mt-10"}>
                <a href={"https://github.com/AnthonyMRodrigues"} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-github text-white"} style={{fontSize: '1.5rem'}}></span>
                </a>
                <a href={"https://www.linkedin.com/in/anthonymrodrigues/"} target={"_blank"} className={"mr-5"}>
                    <span className={"pi pi-linkedin text-white"} style={{fontSize: '1.5rem'}}></span>
                </a>
                <a href={"https://linkedin.com"} target={"_blank"}>
                    <span className={"pi pi-telegram text-white"} style={{fontSize: '1.5rem'}}></span>
                </a>
            </div>
            <div className={"flex flex-col items-center justify-center"}>
                <h1>Copyright ©{initialYear}-{currentYear} Anthony Rodrigues. All rights reserved.</h1>
            </div>
        </div>
    );
}
