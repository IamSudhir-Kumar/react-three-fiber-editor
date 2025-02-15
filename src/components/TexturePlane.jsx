import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

const TexturePlane = ({ url, type, scale, rotation, position }) => {
  const ref = useRef();
  
  // ✅ Load image texture
  const texture = type === "image" ? useTexture(url) : null;

  return (
    <mesh ref={ref} scale={scale} rotation={rotation} position={position}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={type === "image" ? texture : null} side={DoubleSide}>
        {type === "video" && <videoTexture attach="map" args={[url]} />}
      </meshStandardMaterial>
    </mesh>
  );
};

export default TexturePlane;
