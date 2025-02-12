import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, TransformControls, useGLTF } from '@react-three/drei';
//import { useDropzone } from 'react-dropzone';
//import {QRCode} from 'qrcode.react';

import Sidebar from './Sidebar';
import ModelViewer from './ModelViewer';

const Editor = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const modelRef = useRef();

  // Handle file drop for model importing
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setModelUrl(objectUrl);
    }
  };

  // Generate WebAR link & QR Code
  const publishModel = () => {
    const fakeUrl = `https://your-webar-host.com/view?model=${encodeURIComponent(modelUrl)}`;
    setPublishedUrl(fakeUrl);
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex">
      {/* 3D Scene */}
      <div className="w-3/4 h-screen">
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="studio" />
          {modelUrl && (
            <TransformControls object={modelRef.current}>
              <ModelViewer url={modelUrl} ref={modelRef} />
            </TransformControls>
          )}
          <OrbitControls />
        </Canvas>
      </div>

      {/* Sidebar with Import, Publish & QR Code */}
      <Sidebar onDrop={onDrop} publishModel={publishModel} publishedUrl={publishedUrl} />
    </div>
  );
};

export default Editor;
