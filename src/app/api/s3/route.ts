import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

// Force dynamic route - prevents static generation
// export const dynamic = 'force-dynamic';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1'
});

export async function GET() {
    const bucket = process.env.AWS_BUCKET_NAME || 'miha-site-luccas';
    try {
        const command = new GetObjectCommand({
            Bucket: bucket,
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
            { error: 'Failed to fetch data from S3', errorMessage: error },
            { status: 500 }
        );
    }
} 