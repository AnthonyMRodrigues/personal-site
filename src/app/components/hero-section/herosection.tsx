'use client';
import React from 'react';
import {ReactTyped} from "react-typed";


export default function HeroSection() {
    return (
        <section id={"hero-section"} className={"text-white bg-hero-pattern h-screen bg-cover bg-center"}>
            <div className={"relative text-center top-1/4 right-4/4 size-5/12"}>
                <>
                    <h1 className={"text-7xl break-words"}>
                        Hi, I&apos;m Anthony Rodrigues!
                    </h1>
                    <br/>
                    <h1 className={"text-7xl break-words"}>
                        I&apos;m a experient <ReactTyped strings={
                            ["Software Engineer", "Data Engineer", "Data Architect"]
                        } typeSpeed={100} loop={true} backSpeed={100}/>
                    </h1>
                </>
                <div className={"m-6"}>
                    <a href={"/portfolio"}
                       className={"p-button-raised p-button-rounded rounded-full bg-site-tertiary-color text-white p-3 mr-5"}>
                        Discover my data expertise
                    </a>

                    <a href={"/contact"}
                       className={"p-button-raised p-button-rounded rounded-full bg-site-secondary-color p-3 border-site-tertiary-color border-2 text-black"}>
                        Let&apos;s Talk
                    </a>
                </div>
            </div>
        </section>
    );
}
