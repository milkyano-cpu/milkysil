import axiosInstance from './axios';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export interface UploadResult {
  path: string;
  url: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
  savedBytes: number;
}

function validateFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`
    );
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Only JPEG, PNG, and WebP images are allowed.`
    );
  }
}

export async function uploadFileToMinio(file: File): Promise<UploadResult> {
  validateFile(file);

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000,
  });

  return response.data.data;
}

export async function deleteFileFromMinio(fileUrl: string): Promise<boolean> {
  const fileName = fileUrl.split('/').pop();

  if (!fileName) {
    throw new Error('Invalid file URL');
  }

  const response = await axiosInstance.delete(
    `/api/delete?fileName=${encodeURIComponent(fileName)}`,
    { timeout: 30000 }
  );

  return response.data.success;
}
