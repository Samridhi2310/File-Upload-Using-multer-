"use client"; // Required for Next.js App Router
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// ✅ Define Zod Schema for File Validation
const schema = z.object({
  uploadFile: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Please select a file",
    })
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
      {
        message: "Only JPG and PNG images are allowed",
      }
    ),
});

export default function Home() {
  const [uploadMessage, setUploadMessage] = useState([]);
  const [filename, setfilename] = useState([]);

  // ✅ Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Handle Upload
  const handleUpload = async (data) => {
    const formData = new FormData();
    const file = data.uploadFile[0]; // ✅ Extract the first file
    formData.append("uploadFile", file);

    console.log([...formData.entries()]); // Debugging

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      setUploadMessage(responseData.message);
      setfilename(responseData.filename);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("File upload failed.");

    }
  };

  return (
    <div className="bg-blue-300 p-4">
      <h1 className="text-xl font-bold">Upload a File</h1>

      {/* File Upload Form */}
      <form onSubmit={handleSubmit(handleUpload)} encType="multipart/form-data">
        <input type="file" {...register("uploadFile")} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Upload
        </button>
      </form>

      {/* Display Validation Errors */}
      {errors.uploadFile && (
        <p className="mt-2 text-red-500">{errors.uploadFile.message}</p>
      )}

      {/* Display Upload Status Message */}
      {uploadMessage && (
        <p className="mt-4 text-lg font-bold bg-gray-200 p-2 rounded">
          {uploadMessage}
        </p>
      )}
      {filename && (
  <Link href={{ pathname: `/api/uploadFiles/${filename}` }} target="_blank"> view uploaded Images</Link>

)}
<br/>
<Link href="/handleMultipleFile" target="_blank"> Handle Multiple File Uploads</Link>




    </div>
  );
}






// "use client"; // If using Next.js App Router

// import { useState, useEffect } from "react";

// export default function Home() {
//   const [fileContent, setFileContent] = useState("");
//   const [message, setMessage] = useState(""); // State for success message

//   useEffect(() => {
//     fetch("http://localhost:8000/upload") // Fetch file content from server
//       .then((response) => response.text())
//       .then((data) => setFileContent(data))
//       .catch((error) => console.error("Error fetching file:", error));
//   }, []);

//   const handleFileUpload = async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     const formData = new FormData();
//     const fileInput = event.target.uploadFile.files[0];
    
//     if (!fileInput) {
//       setMessage("Please select a file first.");
//       return;
//     }

//     formData.append("uploadFile", fileInput);

//     try {
//       const response = await fetch("http://localhost:8000/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json(); // Get JSON response
//       setMessage(result.message); // Set success message
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setMessage("Error uploading file.");
//     }
//   };

//   return (
//     <div className="bg-blue-300 p-4">
//       <h1 className="text-xl font-bold">Upload a File</h1>

//       {/* File Upload Form */}
//       <form onSubmit={handleFileUpload}>
//         <input type="file" name="uploadFile" />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 ml-2">Upload</button>
//       </form>

//       {/* Display the success message */}
//       {message && <p className="mt-2 text-green-600 font-semibold">{message}</p>}

//       {/* Display the file content */}
//       <h2 className="mt-4 text-lg font-bold">File Content:</h2>
//       <pre className="bg-gray-200 p-2 rounded">{fileContent}</pre>
//     </div>
//   );
// }
