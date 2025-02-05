import { toast } from 'react-toastify';

export const showToast = (
    message: string, 
    type: 'success' | 'info' | 'error', 
    timeClose: number,
    position: "top-center" | "bottom-center",
) => {
    toast[type](message, {
        position: position,
        autoClose: timeClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};
