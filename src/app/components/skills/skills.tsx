'use client';
import React, {useState} from 'react';

import {Button} from "primereact/button";
import { TagCloud } from 'react-tagcloud';

export default function Skills() {

    const data = [
        {value: 'Microservices', count: 30},
        {value: 'Hadoop', count: 30},
        {value: 'Laravel', count: 30},
        {value: 'Terraform', count: 30},
        {value: 'Data', count: 30},
        {value: 'ETL', count: 30},
        {value: 'Python', count: 30},
        {value: 'Mentoring', count: 30},
        {value: 'Redshift', count: 30},
        {value: 'Metabase', count: 30},
        {value: 'SQL', count: 30},
        {value: 'Management', count: 30},
        {value: 'MySQL', count: 30},
        {value: 'Architecture', count: 30},
        {value: 'AWS', count: 30},
        {value: 'RDS', count: 30},
        {value: 'Analytics', count: 30},
        {value: 'Team', count: 30},
        {value: 'PostgreSQL', count: 30},
        {value: 'Spark', count: 30},
        {value: 'Resilience', count: 30},
        {value: 'Docker', count: 30},
        {value: 'Scala', count: 30},
        {value: 'Hive', count: 30},
        {value: 'Airflow', count: 30}
    ]

    const customRenderer = (tag: any, size: any, color: any, delay = Math.floor(Math.random() * 10)) => (
        <span className={"motion-safe:animate-relax_ping delay-[${delay}s]"}
            key={tag.value}
            style={{
                fontSize: `${size / 2}em`,
                margin: '3px',
                padding: '3px',
                display: 'inline-block',
                color: color,
            }}
        >
    {tag.value}
  </span>
    );


    return (
        <section id={"skills"} className={"bg-site-quaternary-color h-80"}>
            <div>
                <div className={"card flex justify-content-center mx-2 col-span-4 pl-[45%]"}>
                    <h1 className={"text-center text-black text-3xl"}>Skills</h1>
                </div>
                <div>
                    <TagCloud tags={data} minSize={1} maxSize={5} shuffle={true} colorOptions={{hue: 'black', luminosity: 'dark'}} renderer={customRenderer}/>
                </div>
            </div>
        </section>
    );
}
