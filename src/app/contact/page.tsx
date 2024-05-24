'use client';
import React, {useState} from "react";

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import ContactForm from "@/app/contact/contactForm";

export default function Contact() {


    const sendEmail = (event: any) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
      <>
          <Header/>
          <section id={"hero-section"} className={"bg-contact-bg h-[82vh] bg-cover bg-center"}>
            <ContactForm/>
          </section>
          <Footer/>
      </>
  );
}
