import { NextRequest, NextResponse } from 'next/server';
import { SES, EnvironmentCredentials } from 'aws-sdk';

export async function POST(request: NextRequest): Promise<NextResponse> {
    const credentials = new EnvironmentCredentials('AWS');
    try {
        const { name, email, message } = await request.json();
        const ses = new SES({region: process.env.REGION_AWS, credentials: credentials});

        // Set up email data
        const params = {
            Destination: {
                ToAddresses: [process.env.EMAIL_ADDRESS], // list of receivers
            },
            Message: {
                Body: {
                    Text: {
                        Charset: 'UTF-8',
                        Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'New Contact Form Submission', // Subject line
                },
            },
            Source: process.env.SENDER_EMAIL_ADDRESS, // sender address
            ReplyToAddresses: [process.env.EMAIL_ADDRESS] // list of reply-to addresses
        };

        // Send email
        // @ts-ignore
        await ses.sendEmail(params).promise();

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error sending email', details: (error as Error).message, credent:credentials }, { status: 500 });
    }
}
