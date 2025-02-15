import { useState } from "react";
import QRCode from "react-qr-code";
import gsap from "gsap";

const QRGenerator = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    // ✅ Animate button when copied
    gsap.to(".copy-btn", { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <QRCode value={url} size={150} bgColor="white" fgColor="black" />
      <button
        onClick={copyToClipboard}
        onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 })}
        className="copy-btn mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded transition-all duration-300"
      >
        {copied ? "Copied! ✅" : "Copy Link"}
      </button>
    </div>
  );
};

export default QRGenerator;
