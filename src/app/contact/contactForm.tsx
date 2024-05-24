'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';

import { useContactForm } from '../hooks/useContactForm';

const ContactForm: React.FC = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        success,
        error,
        handleSubmit,
    } = useContactForm();
    const header_message = "Let's Unlock the Power of Your Data.";
    const sub_header_message = "Data issues are giving you nightmares?"
    const sub_header_message_2 = "Let's put those bad data dreams to rest.";

    return (
        <div className="flex justify-center items-center top-28 relative pl-96">
            <div className="relative">
                <Card
                    className={"absolute -translate-x-[27rem] -translate-y-5 w-[500px] h-[673px] bg-hero-pattern rounded-2xl"}>
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
                            <FloatLabel>
                                <InputText
                                    id="name" className={"text-black bg-site-secondary-color w-80 p-3"}
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    required={true}
                                />
                                <label htmlFor="name" className={"text-black"}>Your Name</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-6">
                            <FloatLabel>
                                <label htmlFor="email" className={"text-black text-center"}>Your Email</label>
                                <InputText id="email"
                                           className={"text-black bg-site-secondary-color w-80 p-3"}
                                           value={email} onChange={(e) => setEmail(e.target.value)}
                                           required={true}
                                           type={"email"}
                                />
                            </FloatLabel>
                        </div>
                        <div className="mb-6">
                            <FloatLabel>
                                <label htmlFor="message" className="text-black">Your Message</label>
                                <InputTextarea
                                    id="message" name="message"
                                    className={"text-black bg-site-secondary-color w-80 p-3"} rows={8}
                                    autoResize={true}
                                    value={message} onChange={(e) => setMessage(e.target.value)}
                                    required={true}
                                />
                            </FloatLabel>
                        </div>
                        <Button
                            type="submit" label={loading ? "Sending..." : "Send Message"}
                            disabled={loading}
                            className={"p-button-rounded rounded-full bg-site-tertiary-color p-3 border-site-tertiary-color border-2 text-white w-48 left-32"}
                        />
                    </form>
                </Card>
            </div>
        </div>
    );
};
export default ContactForm;
