import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { filename } = params;
  
  const imageUrl = `http://localhost:8000/uploadFiles/${filename}`;

  return NextResponse.redirect(imageUrl); // Redirect request to backend
}


