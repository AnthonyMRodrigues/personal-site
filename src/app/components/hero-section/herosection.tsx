'use client';
import React from 'react';
import {ReactTyped} from "react-typed";
import Image from "next/image";
import {faMedium} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function HeroSection() {
    return (
        // <section id={"hero-section"} className={"text-white bg-hero h-screen bg-cover bg-no-repeat bg-center"}>
        //     <div className={"relative text-center top-1/4 right-4/4 size-5/12"}>
        //         <>
        //             <h1 className={"text-7xl break-words"}>
        //                 Hi, I&apos;m Anthony Rodrigues!
        //             </h1>
        //             <br/>
        //             <h1 className={"text-7xl break-words"}>
        //                 I&apos;m a experienced <ReactTyped strings={
        //                 ["Software Engineer", "Data Engineer", "Data Architect"]
        //             } typeSpeed={100} loop={true} backSpeed={100}/>
        //             </h1>
        //         </>
        //     </div>
        //     <div className={"m-6 absolute top-[60%] left-[15%]"}>
        //         <a href={"/about"}
        //            className={"p-button-raised p-button-rounded rounded-full bg-site-tertiary-color text-white p-3 mr-5"}>
        //             Discover my data expertise
        //         </a>
        //
        //         <a href={"/contact"}
        //            className={"p-button-raised p-button-rounded rounded-full bg-site-secondary-color p-3 border-site-tertiary-color border-2 text-black"}>
        //             Let&apos;s Talk
        //         </a>
        //     </div>
        // </section>
        <section className={"bg-site-primary-color text-center"}>
            <div className="relative px-4 md:flex md:items-center !justify-center">
                <div className=" mt-12 max-w-5xl">
                    <div>
                        <div className={"mb-4"}>
                            <span className="text-xl text-site-tertiary-color font-semibold">About Me</span>
                        </div>
                        <h1 className={"mb-4 text-5xl font-bold"}>
                            Hello, <span className={"bg-[#7e4c45]"}>I&apos;m Anthony Rodrigues!</span>
                        </h1>
                        <br/>
                        <h1 className="mb-4 text-5xl font-bold">
                            I provide IT solutions in <ReactTyped strings={
                            ["Cloud", "Big Data", "Software Development"]
                        } typeSpeed={100} loop={true} backSpeed={100} className={"bg-[#7e4c45]"}/>
                        </h1>
                    </div>
                    <div className={"mt-20"}>
                        <p className="mx-auto lg:mx-5 text-lg">
                            With <strong>over a decade of experience</strong>, I’m passionate about
                            using <strong>technology</strong> to simplify processes, <strong>unlock insights, and
                            empower businesses to grow.</strong>
                        </p>
                    </div>
                    <div className="flex">
                        <div className="col-lg-8 mx-auto col-md-10">
                            <Image src={"/pixeltrue-web-development.png"} alt="" height={700} width={700}
                                   className="img-fluid mt-5 md:mt-3"/>
                        </div>
                    </div>
                    {/*<ul className="flex justify-center mt-5 space-x-4 absolute right-0 bottom-1/4">*/}
                    {/*    <li><p className="text-lg">Follow me </p></li>*/}
                    {/*    <li><a href="#url" ><span className="pi pi-linkedin text-white text-2xl"></span></a></li>*/}
                    {/*    <li><a href="#url" ><FontAwesomeIcon icon={faMedium} className={"text-white"}/></a></li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        </section>
    );
}
