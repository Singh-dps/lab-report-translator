import { put } from '@vercel/blob';

export async function uploadToBlob(filename: string, fileData: Blob | Buffer) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("No Blob token, skipping real upload");
    return "https://mock-url.com/fake.pdf";
  }

  const blob = await put(filename, fileData, {
    access: 'public',
  });
  
  return blob.url;
}
