import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const ModelViewer = forwardRef(({ url, onLoaded, rotation, scale }, ref) => {
  const { scene } = useGLTF(url, true); // Load model dynamically

  useEffect(() => {
    if (scene && onLoaded) {
      onLoaded(scene);
    }
  }, [scene, onLoaded]);

  return (
    <>
      {scene && (
        <mesh ref={ref} scale={scale} rotation={rotation.map((deg) => deg * (Math.PI / 180))}>
          <primitive object={scene} />
        </mesh>
      )}
    </>
  );
});

export default ModelViewer;
