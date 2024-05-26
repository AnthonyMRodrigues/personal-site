'use client';
import React from "react";

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import ContactForm from "@/app/contact/contactForm";

export default function Contact() {
    return (
      <>
          <Header/>
          <section id={"hero-section"} className={"bg-contact h-[82vh] bg-cover bg-center"}>
            <ContactForm/>
          </section>
          <Footer/>
      </>
  );
}
