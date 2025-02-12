import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ModelViewer from '../components/ModelViewer';

const WebARView = () => {
  const [searchParams] = useSearchParams();
  const modelUrl = searchParams.get('model');

  return (
    <div className="h-screen w-full bg-gray-900">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="studio" />
        {modelUrl && <ModelViewer url={modelUrl} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default WebARView;
