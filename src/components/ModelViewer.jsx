import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const ModelViewer = forwardRef(({ url }, ref) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} ref={ref} />;
});

export default ModelViewer;
