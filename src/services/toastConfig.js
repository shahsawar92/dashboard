import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const configureToast = () => {
  // Configure the toast container
  toast.configure({
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Export the toast container for rendering in the root component
export const Toast = () => <ToastContainer position="bottom-right" />;
