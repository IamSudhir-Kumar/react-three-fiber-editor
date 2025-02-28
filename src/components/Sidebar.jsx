import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useDropzone } from "react-dropzone";
import { QRCodeCanvas } from "qrcode.react";
import Modal from "./Modal"; // ✅ Import the Modal component

// Initialize Supabase client
const supabase = createClient(
  "https://faiazfxjttaneysewzlk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhaWF6ZnhqdHRhbmV5c2V3emxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjY4MzMsImV4cCI6MjA1NDk0MjgzM30.feyJVrbTEuDHIf8A6iSxhpbszeMtiC_DsUwV2XGJuHQ"
);

const Sidebar = ({
  onModelUpload,
  setModelScale,
  setModelRotation,
  setShowGrid,
  onPublish,
  onImageUpload, // ✅ New prop for handling image uploads
}) => {
  const [scale, setScale] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [showGridState, setShowGridState] = useState(true);
  const [publishedUrlState, setPublishedUrlState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // ✅ State for uploaded image URL
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // ✅ State for modal message

  // Handle model file upload
  const onDropModel = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploading(true);

    const sanitizedFileName = file.name.replace(/\s+/g, "_");
    const { data, error } = await supabase.storage
      .from("models")
      .upload(`models/${sanitizedFileName}`, file, { upsert: true });

    if (error) {
      console.error("Upload failed:", error.message);
      setUploading(false);
      return;
    }

    const fileUrl = `https://faiazfxjttaneysewzlk.supabase.co/storage/v1/object/public/models/models/${sanitizedFileName}`;
    onModelUpload(fileUrl);
    setUploading(false);

    // Show success modal
    setModalMessage("Model Uploaded Successfully");
    setIsModalOpen(true);
  }, [onModelUpload]);

  // Handle image file upload
 // Handle image file upload
const onDropImage = useCallback(async (acceptedFiles) => {
  const file = acceptedFiles[0];
  if (!file) return;
  setUploading(true);

  const sanitizedFileName = file.name.replace(/\s+/g, "_");
  const { data, error } = await supabase.storage
    .from("models")
    .upload(`images/${sanitizedFileName}`, file, { upsert: true });

  if (error) {
    console.error("Image upload failed:", error.message);
    setUploading(false);
    return;
  }

  const imageUrl = `https://faiazfxjttaneysewzlk.supabase.co/storage/v1/object/public/models/images/${sanitizedFileName}`;
  setImageUrl(imageUrl); // Set the uploaded image URL
  onImageUpload(imageUrl); // Pass the image URL to the parent component
  setUploading(false);

  // Show success modal
  setModalMessage("Image Uploaded Successfully");
  setIsModalOpen(true);
}, [onImageUpload]);

// Destructure correctly here
const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({ onDrop: onDropImage });

  const { getRootProps: getModelRootProps, getInputProps: getModelInputProps } = useDropzone({ onDrop: onDropModel });
 // const { getRootProps: getImageRootProps, getInputInputProps: getImageInputProps } = useDropzone({ onDrop: onDropImage });

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

  const handlePublishClick = async () => {
    try {
      const url = await onPublish();
      if (url) {
        setPublishedUrlState(url);
      }
    } catch (error) {
      console.error("Failed to publish model:", error.message);
    }
  };

  return (
    <div className="fixed right-0 w-1/4 h-screen bg-gray-800 text-white p-2 flex flex-col z-10">
      <h2 className="text-xl font-bold mb-4">Model Settings</h2>

      {/* Drag & Drop for Model Upload */}
      <div
        {...getModelRootProps()}
        className="border-dashed border-2 p-4 text-center cursor-pointer transition hover:bg-gray-700"
      >
        <input {...getModelInputProps()} />
        {uploading ? <p>Uploading...</p> : <p>Drag & Drop a model file here or click to select</p>}
      </div>

      {/* Conditional Rendering for Image Upload */}
      {!imageUrl ? (
        <div
          {...getImageRootProps()}
          className="border-dashed border-2 p-4 text-center cursor-pointer transition hover:bg-gray-700 mt-4"
        >
          <input {...getImageInputProps()} />
          {uploading ? <p>Uploading...</p> : <p>Drag & Drop an image file here or click to select</p>}
        </div>
      ) : (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded Thumbnail" className="w-30 h-30 object-cover rounded-md" /> {/* ✅ Larger preview */}
        </div>
      )}

      {/* Scale Control */}
      <label className="block mt-4">Scale:</label>
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={scale}
        onChange={handleScaleChange}
      />

      {/* Rotation Controls */}
      <label className="block mt-4">Rotation X (Left ↔ Right):</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(1, e.target.value)}
      />
      <label className="block mt-4">Rotation Y (Top ↕ Bottom):</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(0, e.target.value)}
      />
      <label className="block mt-4">Rotation Z:</label>
      <input
        type="range"
        min="-180"
        max="180"
        step="1"
        onChange={(e) => handleRotationChange(2, e.target.value)}
      />

      {/* Grid Toggle */}
      <button className="mt-4 bg-gray-700 px-3 py-1 rounded" onClick={handleGridToggle}>
        {showGridState ? "Hide Grid" : "Show Grid"}
      </button>

      {/* Publish Model Button */}
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        onClick={handlePublishClick}
      >
        Publish Model
      </button>

      {/* QR Code Section */}
      {publishedUrlState ? (
        <div className="mt-6 p-2 bg-gray-800 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
          <p className="text-base text-gray-300 mb-3 font-semibold">Scan to View in WebAR:</p>
          <QRCodeCanvas
            value={publishedUrlState}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
            className="inline-block rounded-md shadow-md"
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500 italic">Click "Publish Model" to generate a QR Code.</p>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Success!"
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;