import { Client } from 'minio';
import sharp from 'sharp';

const endpoint = process.env.MINIO_ENDPOINT || 'minio.example.com';
const host = endpoint.split('/')[0];

const minioClient = new Client({
  endPoint: host,
  port: parseInt(process.env.MINIO_PORT || '443'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
  pathStyle: true,
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'my-bucket';
const FOLDER_PREFIX = process.env.MINIO_FOLDER || 'my-project';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const IMAGE_MAX_WIDTH = 2000;
const IMAGE_MAX_HEIGHT = 2000;
const IMAGE_QUALITY = 85;

export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string = 'application/octet-stream'
): Promise<{ path: string; url: string }> {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectName = `${FOLDER_PREFIX}/${sanitizedFileName}`;

  await minioClient.putObject(BUCKET_NAME, objectName, file, file.length, {
    'Content-Type': contentType,
  });

  const publicUrl = `${process.env.NEXT_PUBLIC_MINIO_URL}/${sanitizedFileName}`;

  return {
    path: objectName,
    url: publicUrl,
  };
}

function validateFileSize(buffer: Buffer, maxSize: number = MAX_FILE_SIZE): void {
  if (buffer.length > maxSize) {
    throw new Error(
      `File size exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`
    );
  }
}

async function compressImage(
  buffer: Buffer,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }
): Promise<Buffer> {
  const maxWidth = options?.maxWidth || IMAGE_MAX_WIDTH;
  const maxHeight = options?.maxHeight || IMAGE_MAX_HEIGHT;
  const quality = options?.quality || IMAGE_QUALITY;

  const metadata = await sharp(buffer).metadata();

  let sharpInstance = sharp(buffer);

  if (metadata.width && metadata.height) {
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
  }

  const compressedBuffer = await sharpInstance
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  return compressedBuffer;
}

export async function uploadImage(
  file: Buffer,
  fileName: string,
  options?: {
    compress?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }
): Promise<{ path: string; url: string; originalSize: number; compressedSize: number }> {
  validateFileSize(file);

  const originalSize = file.length;
  let processedBuffer = file;

  const shouldCompress = options?.compress !== false;
  if (shouldCompress) {
    processedBuffer = await compressImage(file, {
      maxWidth: options?.maxWidth,
      maxHeight: options?.maxHeight,
      quality: options?.quality,
    });

    validateFileSize(processedBuffer);
  }

  const timestamp = Date.now();
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  const uniqueFileName = `${nameWithoutExt}-${timestamp}.jpg`;

  const result = await uploadFile(processedBuffer, uniqueFileName, 'image/jpeg');

  return {
    ...result,
    originalSize,
    compressedSize: processedBuffer.length,
  };
}

export async function deleteFile(fileName: string): Promise<boolean> {
  const objectName = `${FOLDER_PREFIX}/${fileName}`;
  await minioClient.removeObject(BUCKET_NAME, objectName);
  return true;
}

export async function getPresignedUrl(
  fileName: string,
  expirySeconds: number = 86400
): Promise<string> {
  const objectName = `${FOLDER_PREFIX}/${fileName}`;
  const url = await minioClient.presignedGetObject(
    BUCKET_NAME,
    objectName,
    expirySeconds
  );
  return url;
}

export async function listFiles(): Promise<string[]> {
  const files: string[] = [];
  const stream = minioClient.listObjectsV2(
    BUCKET_NAME,
    FOLDER_PREFIX,
    true
  );

  return new Promise((resolve, reject) => {
    stream.on('data', (obj) => {
      if (obj.name) {
        const fileName = obj.name.replace(`${FOLDER_PREFIX}/`, '');
        files.push(fileName);
      }
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(files));
  });
}

export async function fileExists(fileName: string): Promise<boolean> {
  try {
    const objectName = `${FOLDER_PREFIX}/${fileName}`;
    await minioClient.statObject(BUCKET_NAME, objectName);
    return true;
  } catch {
    return false;
  }
}

export function getPublicUrl(fileName: string): string {
  return `${process.env.NEXT_PUBLIC_MINIO_URL}/${fileName}`;
}

export default minioClient;
