# MinIO Image Upload System - Implementation Guide

A complete guide to replicating the MinIO-based image upload pipeline from this project into another Next.js application. Covers server-side compression, API routes, client-side upload logic, EXIF orientation handling, and a drag-and-drop UI component.

---

## Table of Contents

1. [Prerequisites & Dependencies](#1-prerequisites--dependencies)
2. [Environment Variables](#2-environment-variables)
3. [Server-Side MinIO Service](#3-server-side-minio-service)
4. [API Routes](#4-api-routes)
5. [Client-Side Axios Setup](#5-client-side-axios-setup)
6. [Client-Side Upload API](#6-client-side-upload-api)
7. [EXIF Image Preview Utility](#7-exif-image-preview-utility)
8. [Image Uploader Component](#8-image-uploader-component)
9. [Integration Example](#9-integration-example)
10. [Data Flow Diagram](#10-data-flow-diagram)
11. [Configuration Reference](#11-configuration-reference)

---

## 1. Prerequisites & Dependencies

### Required Packages

```bash
npm install minio sharp axios exif-js lucide-react
```

| Package | Version | Purpose |
|---------|---------|---------|
| `minio` | `^8.0.6` | S3-compatible client for MinIO object storage |
| `sharp` | `^0.34.4` | Server-side image compression and resizing |
| `axios` | `^1.8.4` | HTTP client with interceptors and retry logic |
| `exif-js` | `^2.3.0` | Client-side EXIF metadata reading for orientation correction |
| `lucide-react` | `^0.454.0` | Icon library (Upload, X, Image, CheckCircle, AlertCircle icons) |

### Additional Requirements

- **Next.js 14+** with App Router (API routes use `NextRequest`/`NextResponse`)
- **React 18+** (hooks: `useState`, `useCallback`)
- **shadcn/ui components** (optional but used in the uploader UI): `Button`, `Card`, `CardContent`, `Badge`, `Progress`
- **A running MinIO server** (or any S3-compatible storage like AWS S3, DigitalOcean Spaces)
- **TypeScript** (all code is written in TypeScript)

### Type Definitions

If using TypeScript, install the type definitions for `exif-js`:

```bash
npm install --save-dev @types/exif-js
```

> **Note:** If `@types/exif-js` is not available, you can create a declaration file at `types/exif-js.d.ts`:
> ```typescript
> declare module 'exif-js' {
>   const EXIF: any;
>   export default EXIF;
> }
> ```

---

## 2. Environment Variables

Add the following to your `.env.local` file:

```env
# MinIO Server Connection
MINIO_ENDPOINT=minio.example.com       # MinIO server hostname (without protocol)
MINIO_PORT=443                          # Server port (443 for SSL, 9000 for local)
MINIO_USE_SSL=true                      # Use SSL/TLS connection (true/false)
MINIO_ACCESS_KEY=your-access-key        # MinIO access key
MINIO_SECRET_KEY=your-secret-key        # MinIO secret key

# MinIO Storage Configuration
MINIO_BUCKET=my-bucket                  # S3 bucket name
MINIO_FOLDER=my-project                 # Folder prefix within the bucket

# Public URL (used to generate download URLs for uploaded files)
NEXT_PUBLIC_MINIO_URL=https://minio.example.com/my-bucket/my-project
```

**How `NEXT_PUBLIC_MINIO_URL` works:**

The public URL is constructed as: `{NEXT_PUBLIC_MINIO_URL}/{filename}`. This should resolve to the actual object path in your bucket. For example, if your bucket serves files at `https://minio.example.com/my-bucket/my-project/image-123.jpg`, then set `NEXT_PUBLIC_MINIO_URL=https://minio.example.com/my-bucket/my-project`.

---

## 3. Server-Side MinIO Service

**File: `lib/minio.ts`**

This module initializes the MinIO client, provides image compression via Sharp, and exports functions for uploading, deleting, and managing files.

```typescript
import { Client } from 'minio';
import sharp from 'sharp';

// Initialize MinIO client
// Extract host from endpoint (remove any path like /s3)
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

// Constants
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const IMAGE_MAX_WIDTH = 2000;           // Max width for compressed images
const IMAGE_MAX_HEIGHT = 2000;          // Max height for compressed images
const IMAGE_QUALITY = 85;              // JPEG quality (1-100)

/**
 * Upload a file to MinIO
 * @param file - File buffer or stream
 * @param fileName - Name of the file (will be stored in project folder)
 * @param contentType - MIME type of the file
 * @returns Object containing the file path and public URL
 */
export async function uploadFile(
  file: Buffer | NodeJS.ReadableStream,
  fileName: string,
  contentType: string = 'application/octet-stream'
): Promise<{ path: string; url: string }> {
  try {
    // Sanitize filename and add folder prefix
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectName = `${FOLDER_PREFIX}/${sanitizedFileName}`;

    // Upload the file
    if (Buffer.isBuffer(file)) {
      await minioClient.putObject(BUCKET_NAME, objectName, file, file.length, {
        'Content-Type': contentType,
      });
    } else {
      await minioClient.putObject(BUCKET_NAME, objectName, file, {
        'Content-Type': contentType,
      });
    }

    // Generate public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_MINIO_URL}/${sanitizedFileName}`;

    return {
      path: objectName,
      url: publicUrl,
    };
  } catch (error) {
    console.error('Error uploading file to MinIO:', error);
    throw new Error('Failed to upload file to MinIO');
  }
}

/**
 * Validate file size
 * @param buffer - File buffer
 * @param maxSize - Maximum file size in bytes (default: 4MB)
 * @throws Error if file exceeds maximum size
 */
function validateFileSize(buffer: Buffer, maxSize: number = MAX_FILE_SIZE): void {
  if (buffer.length > maxSize) {
    throw new Error(
      `File size exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`
    );
  }
}

/**
 * Compress an image buffer
 * @param buffer - Original image buffer
 * @param options - Compression options
 * @returns Compressed image buffer
 */
async function compressImage(
  buffer: Buffer,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }
): Promise<Buffer> {
  try {
    const maxWidth = options?.maxWidth || IMAGE_MAX_WIDTH;
    const maxHeight = options?.maxHeight || IMAGE_MAX_HEIGHT;
    const quality = options?.quality || IMAGE_QUALITY;

    // Get image metadata
    const metadata = await sharp(buffer).metadata();

    // Prepare sharp instance
    let sharpInstance = sharp(buffer);

    // Resize if image exceeds max dimensions
    if (metadata.width && metadata.height) {
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    // Convert to JPEG with compression
    const compressedBuffer = await sharpInstance
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    return compressedBuffer;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
}

/**
 * Upload an image file to MinIO with compression
 * @param file - Image file buffer
 * @param fileName - Name of the image file
 * @param options - Upload options
 * @returns Object containing the file path, public URL, and compression info
 */
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
  try {
    // Validate original file size
    validateFileSize(file);

    const originalSize = file.length;
    let processedBuffer = file;

    // Compress image by default
    const shouldCompress = options?.compress !== false;
    if (shouldCompress) {
      processedBuffer = await compressImage(file, {
        maxWidth: options?.maxWidth,
        maxHeight: options?.maxHeight,
        quality: options?.quality,
      });

      // Validate compressed size
      validateFileSize(processedBuffer);
    }

    // Add timestamp to filename to avoid conflicts
    const timestamp = Date.now();
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    const uniqueFileName = `${nameWithoutExt}-${timestamp}.jpg`; // Always save as JPG

    const result = await uploadFile(processedBuffer, uniqueFileName, 'image/jpeg');

    return {
      ...result,
      originalSize,
      compressedSize: processedBuffer.length,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete a file from MinIO
 * @param fileName - Name of the file in the project folder
 * @returns true if deletion was successful
 */
export async function deleteFile(fileName: string): Promise<boolean> {
  try {
    const objectName = `${FOLDER_PREFIX}/${fileName}`;
    await minioClient.removeObject(BUCKET_NAME, objectName);
    return true;
  } catch (error) {
    console.error('Error deleting file from MinIO:', error);
    throw new Error('Failed to delete file from MinIO');
  }
}

/**
 * Get a presigned URL for temporary access to a private file
 * @param fileName - Name of the file in the project folder
 * @param expirySeconds - URL expiry time in seconds (default: 24 hours)
 * @returns Presigned URL
 */
export async function getPresignedUrl(
  fileName: string,
  expirySeconds: number = 86400
): Promise<string> {
  try {
    const objectName = `${FOLDER_PREFIX}/${fileName}`;
    const url = await minioClient.presignedGetObject(
      BUCKET_NAME,
      objectName,
      expirySeconds
    );
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate presigned URL');
  }
}

/**
 * List all files in the project folder
 * @returns Array of file names
 */
export async function listFiles(): Promise<string[]> {
  try {
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
  } catch (error) {
    console.error('Error listing files from MinIO:', error);
    throw new Error('Failed to list files from MinIO');
  }
}

/**
 * Check if a file exists in MinIO
 * @param fileName - Name of the file in the project folder
 * @returns true if file exists, false otherwise
 */
export async function fileExists(fileName: string): Promise<boolean> {
  try {
    const objectName = `${FOLDER_PREFIX}/${fileName}`;
    await minioClient.statObject(BUCKET_NAME, objectName);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get public URL for a file
 * @param fileName - Name of the file in the project folder
 * @returns Public URL
 */
export function getPublicUrl(fileName: string): string {
  return `${process.env.NEXT_PUBLIC_MINIO_URL}/${fileName}`;
}

export default minioClient;
```

### Key Design Decisions

- **Singleton pattern**: The MinIO client is created once at module level and reused across requests.
- **Compression by default**: All images are compressed unless `compress: false` is passed.
- **JPEG output**: All images are converted to JPEG regardless of input format for consistent compression.
- **Timestamp filenames**: `Date.now()` is appended to prevent naming conflicts.
- **Filename sanitization**: Non-alphanumeric characters (except `.` and `-`) are replaced with `_`.

---

## 4. API Routes

### Upload Route

**File: `app/api/upload/route.ts`**

Handles multipart form data, validates file type/size, compresses images via Sharp, and uploads to MinIO.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/minio";

// Route segment config - extend timeout for image processing
export const maxDuration = 60; // 60 seconds max execution time
export const runtime = 'nodejs'; // Use Node.js runtime (not Edge - Sharp requires Node)
export const dynamic = 'force-dynamic'; // Disable caching for uploads

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
          allowedTypes: ALLOWED_IMAGE_TYPES,
        },
        { status: 400 }
      );
    }

    // Validate file size before processing
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds maximum allowed size of ${(MAX_IMAGE_SIZE / 1024 / 1024).toFixed(2)}MB`,
          maxSize: MAX_IMAGE_SIZE,
          fileSize: file.size,
        },
        { status: 400 }
      );
    }

    // Upload to MinIO with auto-compression
    const result = await uploadImage(buffer, file.name);

    // Calculate compression ratio
    const compressionRatio = (
      (1 - result.compressedSize / result.originalSize) * 100
    ).toFixed(2);

    return NextResponse.json({
      success: true,
      message: "File uploaded and compressed successfully",
      data: {
        path: result.path,
        url: result.url,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: `${compressionRatio}%`,
        savedBytes: result.originalSize - result.compressedSize,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
```

### Delete Route

**File: `app/api/delete/route.ts`**

Accepts a `fileName` query parameter and removes the file from MinIO.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { deleteFile } from '@/lib/minio';

export const maxDuration = 60;

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 }
      );
    }

    // Delete from MinIO
    const success = await deleteFile(fileName);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in delete API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

### API Response Formats

**Upload Success Response:**
```json
{
  "success": true,
  "message": "File uploaded and compressed successfully",
  "data": {
    "path": "my-project/bike_image-1710000000000.jpg",
    "url": "https://minio.example.com/my-bucket/my-project/bike_image-1710000000000.jpg",
    "originalSize": 2500000,
    "compressedSize": 850000,
    "compressionRatio": "66.00%",
    "savedBytes": 1650000
  }
}
```

**Delete Success Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## 5. Client-Side Axios Setup

**File: `lib/api/axios.ts`**

Configures an Axios instance with appropriate base URL handling for both client and server environments, along with timeout and automatic retry logic for failed requests.

```typescript
import axios from "axios";

// Set default base URL - use empty string for client-side to use relative paths
// This allows the browser to use the same origin (protocol + domain + port)
const baseURL = typeof window !== 'undefined'
  ? '' // Client-side: use relative URLs (same origin)
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Server-side

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds default timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify request config here (add auth tokens, etc.)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor with retry logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error details for debugging (client-side only)
    if (typeof window !== 'undefined') {
      console.error("Axios Error Details:", {
        message: error.message,
        code: error.code,
        url: originalRequest?.url,
        method: originalRequest?.method,
        baseURL: originalRequest?.baseURL,
        fullURL: `${originalRequest?.baseURL || ''}${originalRequest?.url || ''}`,
      });
    }

    // If it's a timeout error and we haven't retried yet, retry once
    if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
      originalRequest._retry = true;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      return axiosInstance(originalRequest);
    }

    // If it's a network error, provide more helpful message
    if (error.message === 'Network Error') {
      console.error("Network Error - Check if:", {
        serverRunning: "Development server is running (npm run dev)",
        url: `${originalRequest?.baseURL || window.location.origin}${originalRequest?.url || ''}`,
        cors: "CORS is properly configured",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### Why This Pattern?

- **Client vs server base URL**: On the client, relative URLs are used so requests go to the same origin. On the server (e.g., during SSR), an absolute URL is needed.
- **Timeout retry**: Timeout errors get one automatic retry after a 1-second delay, which handles transient network issues.
- **Detailed error logging**: On the client, error details are logged to aid debugging.

---

## 6. Client-Side Upload API

**File: `lib/api/minio.ts`**

Wraps the API calls with client-side file validation, making it easy to call from components.

```typescript
import axiosInstance from './axios';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

export interface UploadResult {
  path: string;
  url: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
  savedBytes: number;
}

/**
 * Validate file before upload
 * @param file - File object to validate
 * @throws Error if validation fails
 */
function validateFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`
    );
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Only JPEG, PNG, and WebP images are allowed.`
    );
  }
}

/**
 * Upload a file to MinIO via API with auto-compression
 * @param file - File object from input
 * @returns Upload result with path, URL, and compression info
 */
export async function uploadFileToMinio(file: File): Promise<UploadResult> {
  try {
    // Validate file before upload
    validateFile(file);

    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 seconds for image upload with compression
    });

    return response.data.data;
  } catch (error: any) {
    console.error('Error uploading file:', error);

    // Extract error message from response if available
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw error;
  }
}

/**
 * Delete a file from MinIO
 * @param fileUrl - Full URL or filename to delete
 * @returns True if deletion was successful
 */
export async function deleteFileFromMinio(fileUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    // URL format: https://minio.example.com/my-bucket/my-project/filename.jpg
    const fileName = fileUrl.split('/').pop();

    if (!fileName) {
      throw new Error('Invalid file URL');
    }

    const response = await axiosInstance.delete(
      `/api/delete?fileName=${encodeURIComponent(fileName)}`,
      { timeout: 30000 }
    );

    return response.data.success;
  } catch (error: any) {
    console.error('Error deleting file:', error);

    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw error;
  }
}
```

### Validation Layers

The system validates files at **three layers**:

1. **Client-side** (`lib/api/minio.ts`): Validates before sending the request (fast feedback)
2. **API route** (`app/api/upload/route.ts`): Validates again on the server (security)
3. **MinIO service** (`lib/minio.ts`): Validates buffer size after compression

---

## 7. EXIF Image Preview Utility

**File: `lib/utils/image-preview.ts`**

Photos taken on mobile devices often have EXIF orientation metadata that causes them to appear rotated in browser previews. This utility reads EXIF data and corrects the orientation using a canvas element.

```typescript
import EXIF from 'exif-js';

/**
 * Get EXIF orientation from file
 * @param file - Image file
 * @returns Promise<number> - EXIF orientation value (1-8)
 */
export function getEXIFOrientation(file: File): Promise<number> {
  return new Promise((resolve) => {
    EXIF.getData(file, function() {
      const orientation = EXIF.getTag(this, 'Orientation');
      resolve(orientation || 1);
    });
  });
}

/**
 * Create image preview with EXIF orientation handling
 * @param file - Image file
 * @returns Promise<string> - Data URL of corrected image
 */
export async function getImagePreviewWithEXIF(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      // Fallback to URL.createObjectURL if canvas not available
      resolve(URL.createObjectURL(file));
      return;
    }

    img.onload = async () => {
      try {
        const orientation = await getEXIFOrientation(file);

        // Set canvas size based on orientation
        if (orientation === 6 || orientation === 8) {
          // 90 or 270 degree rotation - swap width and height
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Apply rotation based on EXIF orientation
        switch (orientation) {
          case 2:
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          case 3:
            ctx.rotate(Math.PI);
            ctx.drawImage(img, -canvas.width, -canvas.height);
            break;
          case 4:
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, -canvas.height);
            break;
          case 5:
            ctx.rotate(90 * Math.PI / 180);
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.height, 0);
            break;
          case 6:
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -canvas.height);
            break;
          case 7:
            ctx.rotate(270 * Math.PI / 180);
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          case 8:
            ctx.rotate(270 * Math.PI / 180);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          default:
            ctx.drawImage(img, 0, 0);
        }

        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataURL);
      } catch (error) {
        console.error('Error processing EXIF orientation:', error);
        resolve(URL.createObjectURL(file));
      }
    };

    img.onerror = () => {
      resolve(URL.createObjectURL(file));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Check if file is an image
 * @param file - File to check
 * @returns boolean - True if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
```

### EXIF Orientation Values

| Value | Transformation |
|-------|---------------|
| 1 | No rotation (default) |
| 2 | Horizontal flip |
| 3 | 180 degree rotation |
| 4 | Vertical flip |
| 5 | 90 degree rotation + horizontal flip |
| 6 | 90 degree rotation |
| 7 | 270 degree rotation + horizontal flip |
| 8 | 270 degree rotation |

---

## 8. Image Uploader Component

**File: `components/admin/image-uploader.tsx`**

A drag-and-drop image uploader with upload progress, EXIF-corrected previews, and delete functionality.

```tsx
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import { uploadFileToMinio, deleteFileFromMinio } from "@/lib/api/minio";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getImagePreviewWithEXIF, isImageFile } from "@/lib/utils/image-preview";

interface ImageData {
  src: string;
  alt: string;
}

interface ImageUploaderProps {
  images: ImageData[];
  onChange: (images: ImageData[]) => void;
  bikeName?: string; // Used for generating alt text
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  preview?: string;
}

export function ImageUploader({ images, onChange, bikeName }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [deletingIndexes, setDeletingIndexes] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Filter to only image files
    const filesArray = Array.from(files).filter(file => isImageFile(file));

    // Create uploading items with EXIF-corrected previews
    const uploadingItems: UploadingFile[] = await Promise.all(
      filesArray.map(async (file) => ({
        file,
        progress: 0,
        status: 'uploading' as const,
        preview: await getImagePreviewWithEXIF(file)
      }))
    );

    setUploadingFiles(uploadingItems);

    // Upload files to MinIO
    const uploadPromises = filesArray.map(async (file, index) => {
      try {
        // Update progress to 50%
        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], progress: 50 };
          return updated;
        });

        // Upload to MinIO (with auto-compression)
        const result = await uploadFileToMinio(file);

        // Update progress to 100%
        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], progress: 100, status: 'success' };
          return updated;
        });

        return {
          src: result.url,
          alt: bikeName || file.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' ')
        };
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);

        setUploadingFiles(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: 'error',
            error: error instanceof Error ? error.message : 'Upload failed'
          };
          return updated;
        });

        return null;
      }
    });

    // Wait for all uploads
    const uploadedImages = await Promise.all(uploadPromises);

    // Filter out failed uploads and add to images
    const successfulImages = uploadedImages.filter(
      (img): img is ImageData => img !== null
    );
    onChange([...images, ...successfulImages]);

    // Clear uploading files after a delay
    setTimeout(() => {
      setUploadingFiles([]);
    }, 2000);
  }, [images, onChange, bikeName]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = async (index: number) => {
    const imageToDelete = images[index];

    // Mark as deleting
    setDeletingIndexes(prev => new Set(prev).add(index));

    try {
      // Delete from MinIO
      await deleteFileFromMinio(imageToDelete.src);

      // Remove from local state
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);

      toast({
        title: "Image deleted",
        description: "Image has been removed from storage",
      });
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setDeletingIndexes(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-black bg-gray-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-medium">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            JPEG, PNG, WebP up to 4MB - Auto-compressed
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploading Images...</h4>
          {uploadingFiles.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {item.preview && (
                    <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.preview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {item.status === 'uploading' && (
                      <Progress value={item.progress} className="mt-2 h-1" />
                    )}
                    {item.status === 'error' && (
                      <p className="text-xs text-red-600 mt-1">{item.error}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {item.status === 'uploading' && (
                      <Upload className="h-4 w-4 text-gray-400 animate-pulse" />
                    )}
                    {item.status === 'success' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {item.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="relative w-full h-32 overflow-hidden rounded-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                    disabled={deletingIndexes.has(index)}
                  >
                    {deletingIndexes.has(index) ? (
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {image.alt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add More Button */}
      <div className="flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
          }
          className="flex items-center gap-2"
        >
          <ImageIcon className="h-4 w-4" />
          Add More Images
        </Button>
      </div>
    </div>
  );
}
```

### Component Features

- **Drag & drop** with visual feedback (border color change)
- **Multiple file selection** via click or drag
- **EXIF-corrected previews** using canvas rotation
- **Upload progress indicators** with animated icons
- **Error display** per file with error messages
- **Image grid** showing all uploaded images
- **Delete with confirmation** (spinner on delete button)
- **Auto-generated alt text** from the `bikeName` prop or filename

---

## 9. Integration Example

Here's how to use the `ImageUploader` component in a form:

```tsx
"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/image-uploader";

interface ImageData {
  src: string;
  alt: string;
}

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // images array already contains MinIO URLs from the uploader
    const productData = {
      name: productName,
      images: images, // [{ src: "https://...", alt: "Product Name" }, ...]
    };

    // Save to your database
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log("Product saved with images!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product Images</label>
        <ImageUploader
          images={images}
          onChange={setImages}
          bikeName={productName}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Save Product
      </button>
    </form>
  );
}
```

### Database Storage

Images are stored in the database as a JSON array:

```json
[
  {
    "src": "https://minio.example.com/my-bucket/my-project/product_image-1710000000000.jpg",
    "alt": "Product Name"
  },
  {
    "src": "https://minio.example.com/my-bucket/my-project/product_image-1710000000001.jpg",
    "alt": "Product Name"
  }
]
```

If using Prisma, define the field as `Json`:

```prisma
model Product {
  id     String @id @default(cuid())
  name   String
  images Json   // Stores the ImageData[] array
}
```

---

## 10. Data Flow Diagram

```
User selects/drops image files
         |
         v
+---------------------+
| ImageUploader (UI)   |
| - Filter image files |
| - EXIF preview       |
| - Show progress      |
+---------------------+
         |
         v
+---------------------+
| lib/api/minio.ts     |
| - Validate type      |
| - Validate size (4MB)|
| - Create FormData    |
+---------------------+
         |
         | POST /api/upload (multipart/form-data)
         v
+---------------------+
| API Route            |
| - Validate type      |
| - Validate size      |
| - Convert to Buffer  |
+---------------------+
         |
         v
+---------------------+
| lib/minio.ts         |
| - Validate buffer    |
| - Sharp compression  |
|   - Resize (2000px)  |
|   - JPEG @ 85%       |
|   - mozjpeg          |
| - Timestamp filename |
| - Sanitize filename  |
+---------------------+
         |
         | putObject()
         v
+---------------------+
| MinIO Server         |
| bucket/folder/       |
|   image-123456.jpg   |
+---------------------+
         |
         | Returns public URL
         v
+---------------------+
| ImageUploader (UI)   |
| - Add to images[]    |
| - Show in grid       |
| - Parent onChange()   |
+---------------------+
         |
         v
+---------------------+
| Parent Form          |
| - Save images[] JSON |
|   to database        |
+---------------------+
```

---

## 11. Configuration Reference

### File Size Limits

| Setting | Value | Location |
|---------|-------|----------|
| Max upload size (client) | 4 MB | `lib/api/minio.ts` |
| Max upload size (API) | 4 MB | `app/api/upload/route.ts` |
| Max upload size (server) | 4 MB | `lib/minio.ts` |

### Image Compression Settings

| Setting | Value | Location |
|---------|-------|----------|
| Max width | 2000 px | `lib/minio.ts` |
| Max height | 2000 px | `lib/minio.ts` |
| JPEG quality | 85% | `lib/minio.ts` |
| MozJPEG optimization | Enabled | `lib/minio.ts` |
| Output format | JPEG (always) | `lib/minio.ts` |
| Resize fit mode | `inside` | `lib/minio.ts` |
| Enlarge small images | No (`withoutEnlargement: true`) | `lib/minio.ts` |

### Allowed File Types

| Type | MIME Types |
|------|-----------|
| Images | `image/jpeg`, `image/jpg`, `image/png`, `image/webp` |

### Timeout Settings

| Setting | Value | Location |
|---------|-------|----------|
| Default Axios timeout | 30 seconds | `lib/api/axios.ts` |
| Upload timeout | 60 seconds | `lib/api/minio.ts` |
| Delete timeout | 30 seconds | `lib/api/minio.ts` |
| API route max duration | 60 seconds | `app/api/upload/route.ts` |
| Retry delay | 1 second | `lib/api/axios.ts` |
| Max retries (timeout) | 1 | `lib/api/axios.ts` |

### EXIF Preview Settings

| Setting | Value | Location |
|---------|-------|----------|
| Preview output format | JPEG | `lib/utils/image-preview.ts` |
| Preview quality | 80% | `lib/utils/image-preview.ts` |
| Supported orientations | 1-8 | `lib/utils/image-preview.ts` |

### File Structure Summary

```
your-nextjs-project/
  lib/
    minio.ts                    # MinIO client + Sharp compression
    api/
      axios.ts                  # Axios instance with retry logic
      minio.ts                  # Client-side upload/delete functions
    utils/
      image-preview.ts          # EXIF orientation correction
  app/
    api/
      upload/
        route.ts                # POST /api/upload
      delete/
        route.ts                # DELETE /api/delete
  components/
    admin/
      image-uploader.tsx        # Drag & drop UI component
```

---

## Troubleshooting

### Common Issues

**"Failed to upload file to MinIO"**
- Check that `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, and `MINIO_SECRET_KEY` are correctly set
- Verify the bucket exists and the access key has write permissions
- If using SSL, ensure `MINIO_USE_SSL=true` and port is `443`

**"File size exceeds maximum allowed size"**
- The file is larger than 4MB before compression
- Ask users to resize images before uploading, or increase `MAX_FILE_SIZE`

**Sharp build errors**
- Sharp requires native binaries. If deploying to serverless (Vercel), ensure `runtime = 'nodejs'` is set in the route
- Run `npm rebuild sharp` if Sharp fails after OS/Node upgrades

**EXIF orientation not correcting**
- The `exif-js` library reads EXIF from the original file. If the browser already auto-rotates (modern browsers do for `<img>` tags), the canvas correction may double-rotate
- This utility is primarily useful for generating correct preview thumbnails before upload

**Images appear as broken links**
- Verify `NEXT_PUBLIC_MINIO_URL` is correct and accessible from the browser
- Check MinIO bucket policy allows public read access
- Ensure the bucket/folder path in the URL matches your configuration

**Timeout errors during upload**
- Large images take time to compress with Sharp. The 60-second timeout should be sufficient for most cases
- The Axios retry logic will automatically retry once on timeout
