'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  }
});

export const getSignedVideoUrl = async (key: string): Promise<string> => {
  'use cache';
  cacheTag(`signed-url-${key}`);
  cacheLife({ revalidate: 3600 });
  
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key }),
    { expiresIn: 3600 }
  );
};