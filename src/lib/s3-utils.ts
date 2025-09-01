import { s3 } from './s3';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function uploadImage(
  file: File,
  fileName: string,
  bucketName: string = process.env.LIARA_BUCKET_NAME!
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `products/${fileName}`,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read',
  });

  await s3.send(command);
  return `${process.env.LIARA_ENDPOINT}/${bucketName}/products/${fileName}`;
}

export async function generatePresignedUrl(
  key: string,
  bucketName: string = process.env.LIARA_BUCKET_NAME!,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn });
}

export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}
