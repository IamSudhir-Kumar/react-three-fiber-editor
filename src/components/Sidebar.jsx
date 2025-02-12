import { useDropzone } from "react-dropzone";
import { QRCodeCanvas } from "qrcode.react";

const Sidebar = ({ onDrop, publishModel, publishedUrl }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".glb,.gltf",
    onDrop,
  });

  return (
    <div className="w-1/4 bg-gray-800 p-4 text-white flex flex-col items-center">
      {/* Model Upload */}
      <div {...getRootProps()} className="p-6 border-2 border-dashed border-gray-500 text-center cursor-pointer w-full mb-4">
        <input {...getInputProps()} />
        <p>Drag & drop a 3D model (.glb, .gltf) or click to upload</p>
      </div>

      {/* Publish Button */}
      <button onClick={publishModel} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
        Publish to WebAR
      </button>

      {/* QR Code */}
      {publishedUrl && (
        <div className="mt-4">
          <QRCodeCanvas value={publishedUrl} size={150} />
          <p className="text-center mt-2">Scan to View in WebAR</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
