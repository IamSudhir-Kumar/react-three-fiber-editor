import { useEffect } from "react";

const Modal = ({ isOpen, title, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Automatically close the modal after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;