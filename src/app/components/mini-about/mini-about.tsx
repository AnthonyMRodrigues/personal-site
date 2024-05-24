'use client';
import React from 'react';

import { Card } from 'primereact/card';
import {Button} from "primereact/button";
import Link from "next/link";

export default function MiniAbout() {
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
        </>
    );
    return (
        <section id={"mini-about"} className={"bg-site-quinary-color h-96 flex"}>
            <div className="grid grid-cols-1 grid-gap-1 text-black ml-20 pt-7">
                <div className={"col-span-4"}>
                    <h1 className={"text-3xl"}>Data Engineer | Lifelong Learner | Tech Enthusiast</h1>
                </div>
                <div className={"mt-10 w-6/12"}>
                    <p className={"text-2xl text-pretty"}>
                        I'm a data engineer passionate about solving complex problems and turning raw information into
                        actionable insights. With a decade of industry experience, I bring a diverse perspective that
                        blends technical expertise with a love of learning, art, and music. Let's explore how I can
                        apply my unique skillset to your next data project.
                    </p>
                </div>
                <div className={"col-span-4 mt-2 ml-100"}>
                    <Link
                        href={"/about"}
                        className={"h-12 right-4/4 p-button-raised p-button-rounded rounded-full bg-site-tertiary-color text-white p-3 mr-5"}>
                        Discover my data expertise
                    </Link>
                </div>
            </div>
        </section>
    );
}
