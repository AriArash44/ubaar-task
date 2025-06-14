import Toastify from 'toastify-js';

export const showToast = (message) => {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#FFFFFF",
            border: `1px solid "#E61236"`,
            color: "#E61236",
            direction: "rtl",
            "border-radius": "5px"
        },
    }).showToast();
};