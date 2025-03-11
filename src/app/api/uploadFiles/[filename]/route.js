export async function GET(request, { params }) {
  if (!params || !params.filename) {
    return new Response(JSON.stringify({ error: "Filename is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { filename } = params; // Extract filename
  const fileUrl = `http://localhost:8000/uploadFiles/${filename}`;

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Data not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const blob = await response.blob();
    return new Response(blob, {
      headers: { "Content-Type": response.headers.get("Content-Type") || "application/octet-stream" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
