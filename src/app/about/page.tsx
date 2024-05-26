import React from 'react';
import Image from 'next/image';

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";

const AboutMe = () => {
    return (
        <div className="bg-[#F2F2F2] min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 justify-center items-center px-6 text-black font-lato italic">
                <div className="max-w-[75%] flex md:flex-row items-center justify-between mt-10">
                    <div className="md:w-1/2 text-left">
                        <div className={"font-bold text-2xl mb-8"}>
                            <h1 className="text-3xl mb-2">Who am I?</h1>
                            <h2 className="mb-2">
                                I'm many things, including a Learner, Data Engineer, Data Architect and Software Engineer
                            </h2>
                            <h2>
                                Looking for happiness, adventures, challenges, while Turning Raw Data into Rhyme & Reason One Line at a Time
                            </h2>
                        </div>
                        <div className={"text-lg"}>
                            <p className="mb-6">
                                I'm a data engineer who thrives on finding patterns, whether in complex datasets or the latest hip-hop beats. I'm equally passionate about clean code and data and love turning raw information into meaningful insights. When I'm not immersed in the world of data, you'll find me exploring art museums, catching up on the latest political news, geeking out over a good tech documentary, learning some new stack, or chilling over a good rap.
                            </p>
                            <p className="mb-6">
                                With a decade of experience in the tech industry, I've helped data initiatives for companies like QConcursos and Podchaser, pioneering innovative solutions that drive growth and efficiency. I'm driven to deliver tangible results, from building scalable data architectures to optimizing customer experiences. My educational background includes a Bachelor's in Information Systems and a Data Architecture Certification from Udacity.
                            </p>
                            <p className="mb-6">
                                Want to hear my thoughts on the latest data trends or my hot takes on classic hip-hop albums?
                                Hit me up on <a href={process.env.NEXT_PUBLIC_LINKEDIN_ACCOUNT} className={"font-bold underline decoration-sky-500"}>LinkedIn</a>. Just don't ask me to rap about data pipelines (I'm still working on that flow).
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
                        <Image
                            src="/IMG_3077.png" // Update with your actual image path
                            alt="Profile Picture"
                            width={400}
                            height={400}
                            className="rounded-full"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutMe;
