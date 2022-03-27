import { useEffect } from "react";

const useOnOutsideClick = (ref: any, callback: any) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOnOutsideClick;
