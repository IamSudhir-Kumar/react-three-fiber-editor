fetch("https://your-api-endpoint.com/latest-model")
    .then(response => response.json())
    .then(data => {
        document.getElementById("model").setAttribute("gltf-model", data.modelUrl);
    })
    .catch(error => console.error("Error loading model:", error));
