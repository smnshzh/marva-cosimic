import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "کلید فایل الزامی است" }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);

    return NextResponse.json({ message: "فایل با موفقیت حذف شد" });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: "خطا در حذف فایل" },
      { status: 500 }
    );
  }
}
