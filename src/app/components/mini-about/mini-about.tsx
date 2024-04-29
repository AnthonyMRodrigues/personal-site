import React from 'react';

import { Card } from 'primereact/card';
import {Button} from "primereact/button";

export default function MiniAbout() {
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
        </>
    );
    return (
        <section id={"mini-about"} className={"bg-gradient-to-b from-site-primary-color to-site-secondary-color"}>
            <div className="grid grid-cols-1 grid-gap-1">
                <div className={"mx-2 col-span-4"}>
                    <h1 className={"text-center text-3xl"}>About me</h1>
                </div>
                <div>
                <p className={"text-center text-black text-2xl"}>
                    Seasoned data engineer passionate about building robust data solutions.
                </p>
                <p className={"text-center text-black text-2xl"}>
                    From Software engineer at Fidelize to Data Engineer at Podchaser, I deliver results.
                </p>
                <p className={"text-center text-black text-2xl"}>
                    Let's explore how I can power your data-driven success.
                </p>
                </div>
            </div>
        </section>
    );
}
