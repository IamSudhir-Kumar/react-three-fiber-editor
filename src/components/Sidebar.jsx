import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useDropzone } from "react-dropzone";
import { QRCodeCanvas } from "qrcode.react";

const supabase = createClient(
  "https://faiazfxjttaneysewzlk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaWF6ZnhqdHRhbmV5c2V3emxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjY4MzMsImV4cCI6MjA1NDk0MjgzM30.feyJVrbTEuDHIf8A6iSxhpbszeMtiC_DsUwV2XGJuHQ"
);

const Sidebar = ({
  onModelUpload,
  setModelScale,
  setModelRotation,
  setShowGrid,
  publishedUrl,
  onPublish, // ✅ Function to publish model
}) => {
  const [scale, setScale] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [showGridState, setShowGridState] = useState(true);

  console.log("Published URL:", publishedUrl); // ✅ Debugging: Check if URL is received

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);

    // ✅ Sanitize the file name
    const sanitizedFileName = file.name.replace(/\s+/g, "_");

    const { data, error } = await supabase.storage
      .from("models")
      .upload(`models/${sanitizedFileName}`, file, { upsert: true });

    if (error) {
      console.error("Upload failed:", error.message);
      setUploading(false);
      return;
    }

    // ✅ Construct the correct URL
    const fileUrl = `https://faiazfxjttaneysewzlk.supabase.co/storage/v1/object/public/models/models/${sanitizedFileName}`;

    onModelUpload(fileUrl);
    setUploading(false);
  }, [onModelUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
    setModelScale(newScale);
  };

  const handleRotationChange = (axis, value) => {
    setModelRotation((prev) => {
      const newRotation = [...prev];
      newRotation[axis] = parseFloat(value);
      return newRotation;
    });
  };

  const handleGridToggle = () => {
    setShowGridState(!showGridState);
    setShowGrid(!showGridState);
  };

  return (
    <div className="fixed right-0 w-1/4 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Model Settings</h2>

      {/* ✅ Drag & Drop Upload */}
      <div
        {...getRootProps()}
        className="border-dashed border-2 p-4 text-center cursor-pointer transition hover:bg-gray-700"
      >
        <input {...getInputProps()} />
        {uploading ? <p>Uploading...</p> : <p>Drag & Drop a model file here or click to select</p>}
      </div>

      {/* ✅ Scale Control */}
      <label className="block mt-4">Scale:</label>
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={scale}
        onChange={handleScaleChange}
      />

      {/* ✅ Rotation Controls */}
      <label className="block mt-4">Rotation X (Left ↔ Right):</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(0, e.target.value)}
      />

      <label className="block mt-4">Rotation Y (Top ↕ Bottom):</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(1, e.target.value)}
      />

      <label className="block mt-4">Rotation Z:</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(2, e.target.value)}
      />

      {/* ✅ Grid Toggle */}
      <button className="mt-4 bg-gray-700 px-3 py-1 rounded" onClick={handleGridToggle}>
        {showGridState ? "Hide Grid" : "Show Grid"}
      </button>

      {/* ✅ Publish Model Button */}
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        onClick={onPublish} // ✅ Trigger publishing
      >
        Publish Model
      </button>

      {/* ✅ QR Code Section (Ensure publishedUrl is not empty) */}
      {publishedUrl ? (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
          <p className="text-base text-gray-300 mb-3 font-semibold">Scan to View in WebAR:</p>
          <QRCodeCanvas 
            value={publishedUrl} 
            size={150} 
            bgColor="#ffffff" 
            fgColor="#000000" 
            className="inline-block rounded-md shadow-md"
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500 italic">Click "Publish Model" to generate a QR Code.</p>
      )}
    </div>
  );
};

export default Sidebar;
