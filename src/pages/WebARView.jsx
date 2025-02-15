import { useEffect, useState } from "react";

const WebARView = () => {
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    fetch("/latest-model.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.modelUrl) {
          setModelUrl(data.modelUrl);
        }
      })
      .catch((error) => console.error("Error fetching model:", error));
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
    </div>
  );
};

export default WebARView;
