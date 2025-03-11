"use client";
import React, { useState } from "react";
// import {Toaster, toast } from "sonner";
import { toast,ToastContainer } from "react-toastify";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast("Please select files to upload!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(data.files);
        toast.success("Files uploaded successfully!");
   
      } else {
        toast.error("File upload failed!");
      }
    }
 catch (error) {
      toast.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center"/>
       {/* <Toaster position="top-center" /> */}
      <h2>Upload Multiple Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
     

      {uploadedFiles.length > 0 && (
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <a href={`http://localhost:8000${file}`} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
