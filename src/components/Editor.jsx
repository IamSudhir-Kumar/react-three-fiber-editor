import { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  TransformControls,
  Grid,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import Sidebar from "./Sidebar";
import ModelViewer from "./ModelViewer";

const Editor = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // ✅ State for uploaded image
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  // Model transformation state
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState(1);
  const modelRef = useRef();

  // Handle model upload
  const handleModelUpload = (uploadedUrl) => {
    setModelUrl(uploadedUrl);
    console.log("Model uploaded:", uploadedUrl);
  };

  // Handle image upload
  const handleImageUpload = (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl);
    console.log("Image uploaded:", uploadedImageUrl);
  };

  // Handle model loaded
  const handleModelLoaded = () => {
    setLoading(false);
  };

  // Publish model
  const publishModel = () => {
    if (!modelUrl) {
      console.error("No model URL available to publish.");
      return;
    }
    const fakeUrl = `https://your-webar-host.com/view?model=${encodeURIComponent(modelUrl)}&image=${encodeURIComponent(imageUrl || "")}`;
    console.log("Published URL:", fakeUrl); // Debugging
    setPublishedUrl(fakeUrl);
    return fakeUrl; // Return the published URL
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex">
      {/* Sidebar - Model Controls */}
      <Sidebar
        onModelUpload={handleModelUpload}
        setModelScale={setScale}
        setModelRotation={setRotation}
        setShowGrid={setShowGrid}
        onPublish={publishModel}
        onImageUpload={handleImageUpload} // ✅ Pass the image upload handler
      />

      {/* 3D Scene */}
      <div className="w-3/4 h-screen relative">
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="studio" />
          {loading && (
            <Html center>
              <p className="text-white text-lg">Loading model...</p>
            </Html>
          )}
          {modelUrl && (
            <TransformControls object={modelRef.current}>
              <ModelViewer
                url={modelUrl}
                ref={modelRef}
                onLoaded={handleModelLoaded}
                rotation={rotation}
                scale={scale}
              />
            </TransformControls>
          )}
          <OrbitControls />
          {showGrid && <Grid args={[10, 10]} />}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
          </GizmoHelper>
        </Canvas>
      </div>
    </div>
  );
};

export default Editor;