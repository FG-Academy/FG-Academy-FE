import { apiClient } from "./apiClient";

interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  key: string;
}

export async function getPresignedUrl(
  contentType: string
): Promise<PresignedUrlResponse> {
  return apiClient.post<PresignedUrlResponse>("/upload/presigned-url", {
    contentType,
  });
}

export async function uploadToS3(uploadUrl: string, file: File): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
  }
}

export async function uploadFileToS3(file: File): Promise<string> {
  const { uploadUrl, fileUrl } = await getPresignedUrl(file.type);
  await uploadToS3(uploadUrl, file);
  return fileUrl;
}
