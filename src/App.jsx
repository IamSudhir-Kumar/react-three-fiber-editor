import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./components/Editor";
import WebARView from "./pages/WebARView";

function App() {
  return (
    <Router>
      <div className="h-screen w-full bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/webar" element={<WebARView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;