import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { name, email, message } = await request.json();

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // replace with your SMTP server
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // SMTP user
                pass: process.env.SMTP_PASS, // SMTP password
            },
        });

        // Set up email data
        const mailOptions = {
            from: '"Contact Form" <no-reply@example.com>', // sender address
            to: 'your-email@example.com', // list of receivers
            subject: 'New Contact Form Submission', // Subject line
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error sending email', details: (error as Error).message }, { status: 500 });
    }
}
