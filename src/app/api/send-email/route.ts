import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.SMTP_EMAIL_ADDRESS, // replace with your SMTP server
            port: process.env.SMTP_EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL_USERNAME, // SMTP user
                pass: process.env.SMTP_EMAIL_PASSWORD, // SMTP password
            },
        });

        // Set up email data
        const mailOptions = {
            from: process.env.SENDER_EMAIL_ADDRESS, // sender address
            to: process.env.EMAIL_ADDRESS, // list of receivers
            subject: 'New Contact Form Submission', // Subject line
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
            replyTo: process.env.EMAIL_ADDRESS, // list of reply-to addresses
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.log('Error sending email:', (error as Error).message);
        return NextResponse.json({ error: 'Error sending email'}, { status: 500 });
    }
}
