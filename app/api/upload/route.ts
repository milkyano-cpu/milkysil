import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/minio";

export const maxDuration = 60;
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
          allowedTypes: ALLOWED_IMAGE_TYPES,
        },
        { status: 400 }
      );
    }

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

    const result = await uploadImage(buffer, file.name);

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
