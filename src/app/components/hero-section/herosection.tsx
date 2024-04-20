import React from 'react';

import { Button } from 'primereact/button';

export default function HeroSection() {
    return (
        <section id={"hero-section"} className={"size-full"}>
            <>
                <h1 className="hero-section__title">Anthony Rodrigues</h1>
                <p className="hero-section__description">
                    The data engineer that you are looking for.
                </p>
                <p>
                    Transforming data into insights.
                </p>
            </>
            <>
                <Button label="Contact Me" className={"p-button-raised p-button-rounded rounded-full bg-site-tertiary-color"} size={"large"} />
            </>
        </section>
    );
}
