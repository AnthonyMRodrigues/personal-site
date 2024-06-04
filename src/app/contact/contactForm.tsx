'use client';

import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';


import { useContactForm } from '../hooks/useContactForm';

const ContactForm: React.FC = () => {
    const toast = useRef<Toast>(null);

    const {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        handleSubmit,
    } = useContactForm(() => {
        toast.current?.show({
            severity: 'success',
            summary: '📈 Data received! 📈',
            detail: 'Your message made it through my pipeline like a well-optimized ETL job. Can\'t wait to analyze it further. 😉',
            life: 5000,
            className: "animate-fade-in animate-fade-out bg-toast-success-email text-black",
        });
    }, () => {
        toast.current?.show({
            severity: 'error',
            summary: '📶 Oops Signal lost! 📶',
            detail: 'Sorry, your message didn\'t quite make it through, but I\'m resilient like a well-designed system. Try re-sending or connecting with me on LinkedIn.',
            life: 5000,
            className: 'animate-fade-in animate-fade-out bg-toast-error-email text-black',
        });
    });
    const header_message = "Let's Unlock the Power of Your Data.";
    const sub_header_message = "Data issues are giving you nightmares?"
    const sub_header_message_2 = "Let's put those bad data dreams to rest.";

    const showMessage = (event: any) => {
        toast.current?.show({
            severity: 'error',
            summary: ' Under Construction!',
            detail: 'Sorry, I\'m finishing the sending email logic, but I\'m finishing soon. Try connecting with me on LinkedIn.',
            life: 10000,
            className: 'animate-fade-in animate-fade-out bg-toast-error-email text-black',
        });
    };

    return (
        <div className="flex justify-center items-center top-28 relative pl-96">
            <Toast ref={toast} position="top-center" />
            <div className="relative">
                <Card
                    className={"absolute -translate-x-[27rem] -translate-y-5 w-[500px] h-[673px] bg-cover bg-contact-card rounded-2xl"}>
                </Card>

                <Card className={"w-[500px] h-[673px] bg-contact-form-bg text-black rounded-2xl"}>
                    <div className={"left-6 relative mb-6"}>
                        <h2 className={"text-base font-bold mb-4 text-center"}>
                            {header_message}
                        </h2>
                        <div className={"text-sm text-center italic"}>
                            <p>{sub_header_message}</p>
                            <p>{sub_header_message_2}</p>
                        </div>
                    </div>
                    <form className={"left-24 relative"} onSubmit={handleSubmit}>
                        <div className="mb-6">
                            {/*@ts-ignore*/}
                            <FloatLabel>
                                <label htmlFor="name" className={"text-black"}>Your Name</label>
                                <InputText
                                    id="name" className={"text-black bg-site-secondary-color w-80 p-3"}
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    onFocus={(e) => showMessage(e)}
                                    required={true}
                                />
                            </FloatLabel>
                        </div>
                        <div className="mb-6">
                            {/*@ts-ignore*/}
                            <FloatLabel>
                                <label htmlFor="email" className={"text-black text-center"}>Your Email</label>
                                <InputText id="email"
                                           className={"text-black bg-site-secondary-color w-80 p-3"}
                                           value={email} onChange={(e) => setEmail(e.target.value)}
                                           required={true}
                                           onFocus={(e) => showMessage(e)}
                                           type={"email"}
                                />
                            </FloatLabel>
                        </div>
                        <div className="mb-6">
                            {/*@ts-ignore*/}
                            <FloatLabel>
                                <label htmlFor="message" className="text-black">Your Message</label>
                                <InputTextarea
                                    id="message" name="message"
                                    className={"text-black bg-site-secondary-color w-80 p-3"} rows={8}
                                    autoResize={true}
                                    value={message} onChange={(e) => setMessage(e.target.value)}
                                    required={true}
                                    onFocus={(e) => showMessage(e)}
                                />
                            </FloatLabel>
                        </div>
                        <Button
                            type="submit" label={loading ? "Sending..." : "Send Message"}
                            disabled={true}
                            className={"p-button-rounded rounded-full bg-site-tertiary-color p-3 border-site-tertiary-color border-2 text-white w-48 left-32"}
                        />
                    </form>
                </Card>
            </div>
        </div>
    );
};
export default ContactForm;
