import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-6">WebAR Model Editor</h1>
      <p className="text-lg text-gray-400 mb-8">
        Import 3D models, edit, and publish them to WebAR with QR code support.
      </p>

      <div className="flex space-x-6">
        <Link to="/editor">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg">
            Open Editor
          </button>
        </Link>
        
        <Link to="/webar">
          <button className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg">
            View in WebAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
