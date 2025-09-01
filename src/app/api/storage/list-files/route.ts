import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Prefix: 'products/', // Only list product images
    });

    const data = await s3.send(command);
    return NextResponse.json({ files: data.Contents || [] });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: "خطا در دریافت لیست فایل‌ها" },
      { status: 500 }
    );
  }
}
