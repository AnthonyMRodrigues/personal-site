'use client';
import React, {useState} from 'react';

import {Button} from "primereact/button";
import {OrganizationChart} from "primereact/organizationchart";

export default function Skills() {

    const [data] = useState([
        {
            label: 'My Skills',
            expanded: true,
            children: [
                {
                    label: 'Hard Skills',
                    expanded: true,
                    children: [
                        {
                            label: 'Programming',
                            expanded: true,
                            children: [
                                {
                                    label: 'Python',
                                },
                                {
                                    label: 'PHP',
                                },
                                {
                                    label: 'JavaScript',
                                },
                                {
                                    label: 'Scala',
                                }
                            ]
                        },
                        {
                            label: 'Data Engineering',
                            expanded: true,
                            children: [
                                {
                                    label: 'Apache Spark',
                                },
                                {
                                    label: 'Apache Kafka',
                                },
                                {
                                    label: 'Apache Airflow',
                                },
                                {
                                    label: 'ETL',
                                },
                                {
                                    label: 'Data Warehousing',
                                },
                                {
                                    label: 'Data Modeling',
                                },
                                {
                                    label: 'Data Lakes',
                                },
                                {
                                    label: 'Data Pipelines',
                                },
                                {
                                    label: 'Data Integration',
                                },
                                {
                                    label: 'Data Transformation',
                                },
                                {
                                    label: 'Data Ingestion',
                                }
                            ]
                        },
                        {
                            label: 'Data Architecture',
                            expanded: true,
                            children: [
                                {
                                    label: 'Data Warehouse',
                                },
                                {
                                    label: 'Data Lake',
                                },
                                {
                                    label: 'Data Mart',
                                },
                                {
                                    label: 'Data Mesh',
                                },
                                {
                                    label: 'Data Hub',
                                },
                                {
                                    label: 'Data Catalog',
                                },
                                {
                                    label: 'Data Dictionary',
                                },
                                {
                                    label: 'Data Governance',
                                },
                                {
                                    label: 'Data Quality',
                                },
                                {
                                    label: 'Data Compliance',
                                },
                                {
                                    label: 'Data Architecture',
                                },
                                {
                                    label: 'Data Modeling',
                                },
                                {
                                    label: 'Data Integration',
                                },
                                {
                                    label: 'Data Transformation',
                                },
                                {
                                    label: 'Data Ingestion',
                                },
                                {
                                    label: 'Data Governance',
                                },
                                {
                                    label: 'Data Quality',
                                },
                            ]
                        },
                        {
                            label: 'Data Analysis',
                            expanded: true,
                            children: [
                                {
                                    label: 'Data Mining',
                                },
                                {
                                    label: 'Data Cleaning',
                                },
                                {
                                    label: 'Data Exploration',
                                },
                                {
                                    label: 'Data Visualization',
                                },
                                {
                                    label: 'Data Interpretation',
                                },
                                {
                                    label: 'Data Reporting',
                                },
                                {
                                    label: 'Data Presentation',
                                }
                            ]
                        },
                        {
                            label: 'Data Visualization',
                            expanded: true,
                            children: [
                                {
                                    label: 'Tableau',
                                },
                                {
                                    label: 'Metabase',
                                },
                            ]
                        },
                        {
                            label: 'DataBase Management',
                            expanded: true,
                            children: [
                                {
                                    label: 'MySQL',
                                },
                                {
                                    label: 'PostgreSQL',
                                },
                                {
                                    label: 'MongoDB',
                                },
                                {
                                    label: 'Redis',
                                },
                                {
                                    label: 'Microsoft SQL Server',
                                },
                                {
                                    label: 'Oracle',
                                }
                            ]
                        }
                    ]
                },
                // {
                //     label: 'France',
                //     expanded: true,
                //     children: [
                //         {
                //             label: 'France'
                //         },
                //         {
                //             label: 'Morocco'
                //         }
                //     ]
                // }
            ]
        }
    ]);

    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
        </>
    );
    return (
        <section id={"skills"} className={"mb-5"}>
            <div>
                <div className={"card flex justify-content-center mx-2 col-span-4 pl-[45%]"}>
                    <h1 className={"text-center text-black text-3xl"}>Major Skills</h1>
                </div>
                <div className="card overflow-x-auto">
                    <OrganizationChart value={data} />
                </div>
            </div>
        </section>
    );
}
