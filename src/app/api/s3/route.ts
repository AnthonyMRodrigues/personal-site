import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: fromIni({ profile: 'default' })
});

export async function GET() {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME || 'miha-site-luccas',
            Key: 'novo_perfumes.json',
        });

        const response = await s3Client.send(command);
        const jsonString = await response.Body?.transformToString();
        
        if (!jsonString) {
            throw new Error('No data received from S3');
        }

        const data = JSON.parse(jsonString);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from S3:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data from S3' },
            { status: 500 }
        );
    }
} 