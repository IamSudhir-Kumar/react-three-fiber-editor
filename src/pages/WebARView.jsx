import { useEffect, useState } from "react";

const WebARView = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get("model");
    const image = urlParams.get("image");

    if (model) {
      setModelUrl(model);
    }
    if (image) {
      setImageUrl(image);
    }
  }, []);

  return (
    <div>
      {modelUrl ? (
        <a-scene embedded arjs>
          {/* Marker-based AR */}
          <a-marker preset="custom" type="pattern" url="/marker.patt">
            <a-entity position="0 0 0">
              <a-gltf-model src={modelUrl} scale="0.5 0.5 0.5"></a-gltf-model>
            </a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <p>Loading model...</p>
      )}
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded Texture" style={{ width: "100px", marginTop: "10px" }} />
      )}
    </div>
  );
};

export default WebARView;